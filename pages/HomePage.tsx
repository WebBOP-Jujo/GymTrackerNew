
import React, { useState, useEffect, useCallback } from 'react';
import type { PageProps, WorkoutSet, WorkoutEntry, Exercise } from '../types';
import { supabase } from '../config/supabaseClient';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import EditSetModal from '../components/workout/EditSetModal';
import { PlusIcon, TrashIcon, FloppyDiskIcon, CalendarBlankIcon, DumbbellIcon, PencilSimpleIcon, ClockCounterClockwiseIcon } from '../components/icons/PhosphorIcons';

const HomePage: React.FC<PageProps> = ({ user, masterExerciseList, workoutHistory, refreshData }) => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [numSets, setNumSets] = useState(3);
  const [sets, setSets] = useState<WorkoutSet[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [editingSet, setEditingSet] = useState<{ workoutEntryId: string, setIndex: number, set: WorkoutSet } | null>(null);
  const [historyFilterDate, setHistoryFilterDate] = useState('');
  const [filteredHistory, setFilteredHistory] = useState<WorkoutEntry[]>(workoutHistory);

  useEffect(() => {
    setFilteredHistory(workoutHistory);
  }, [workoutHistory]);

  const handleFilterByDate = (date: string) => {
    setHistoryFilterDate(date);
    if (!date) {
      setFilteredHistory(workoutHistory);
    } else {
      const formattedDate = new Date(date).toLocaleDateString('en-GB'); // DD/MM/YYYY
      setFilteredHistory(workoutHistory.filter(entry => entry.Date === formattedDate));
    }
  };

  const resetToRecentHistory = () => {
    setHistoryFilterDate('');
    setFilteredHistory(workoutHistory);
  };
  
  const generateSets = useCallback((count: number) => {
    const newSets: WorkoutSet[] = [];
    for (let i = 1; i <= count; i++) {
      newSets.push({ SetNumber: i, Reps: 0, Weight: 0 });
    }
    setSets(newSets);
  }, []);

  useEffect(() => {
    generateSets(numSets);
  }, [numSets, generateSets]);

  useEffect(() => {
    if (masterExerciseList.length > 0 && !selectedExercise) {
      setSelectedExercise(masterExerciseList[0].nombre);
    }
  }, [masterExerciseList, selectedExercise]);

  const handleSetChange = (index: number, field: keyof WorkoutSet, value: string | number) => {
    const updatedSets = [...sets];
    // Ensure value is a number if it's Reps or Weight
    const numericValue = (field === 'Reps' || field === 'Weight') ? Number(value) : value;
    (updatedSets[index] as any)[field] = numericValue;
    setSets(updatedSets);
  };

  const addSetRow = () => {
    setNumSets(prev => prev + 1);
  };
  
  const removeSetRow = (index: number) => {
     if (numSets > 1) {
      setNumSets(prev => prev - 1);
      const updatedSets = sets.filter((_, i) => i !== index);
      // Re-number sets
      setSets(updatedSets.map((s, i) => ({ ...s, SetNumber: i + 1 })));
    }
  };

  const handleSaveWorkout = async () => {
    if (!user || !selectedExercise || sets.length === 0) {
      setError("Please select an exercise and fill in set details.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const workoutID = crypto.randomUUID();
    const setsToSave = sets.map(set => ({
      user_id: user.id,
      WorkoutID: workoutID,
      Date: new Date(currentDate).toLocaleDateString('en-GB'), // DD/MM/YYYY to match original app
      Exercise: selectedExercise,
      SetNumber: set.SetNumber,
      Reps: set.Reps,
      Weight: set.Weight,
      Timestamp: new Date().toISOString(),
    }));

    const { error: insertError } = await supabase.from('Entrenamientos').insert(setsToSave);

    if (insertError) {
      setError(`Failed to save workout: ${insertError.message}`);
    } else {
      setSuccessMessage('Workout saved successfully!');
      await refreshData(); // Refresh history and potentially E1RM data
      // Reset form (optional)
      // setSelectedExercise(masterExerciseList.length > 0 ? masterExerciseList[0].nombre : '');
      // setNumSets(3); generateSets(3);
    }
    setIsLoading(false);
    setTimeout(() => { setError(null); setSuccessMessage(null); }, 3000);
  };

  const handleDeleteWorkoutEntry = async (workoutID: string) => {
    if (!user || !window.confirm("Are you sure you want to delete this entire workout entry?")) return;
    
    setIsLoading(true);
    const { error } = await supabase.from('Entrenamientos').delete().eq('WorkoutID', workoutID).eq('user_id', user.id);
    if (error) {
      setError(`Failed to delete workout: ${error.message}`);
    } else {
      setSuccessMessage('Workout entry deleted.');
      await refreshData();
    }
    setIsLoading(false);
    setTimeout(() => { setError(null); setSuccessMessage(null); }, 3000);
  };

  const handleSaveEditedSet = async (workoutEntryId: string, setIndex: number, updatedSet: WorkoutSet) => {
    if (!user) return;
    setIsLoading(true);
    // Find the original set ID from workoutHistory
    const entryToUpdate = workoutHistory.find(wh => wh.WorkoutID === workoutEntryId);
    if (!entryToUpdate || !entryToUpdate.sets[setIndex] || typeof entryToUpdate.sets[setIndex].id === 'undefined') {
        setError("Original set not found or ID missing.");
        setIsLoading(false);
        return;
    }
    const originalSetId = entryToUpdate.sets[setIndex].id as number;

    const { error } = await supabase
      .from('Entrenamientos')
      .update({ Reps: updatedSet.Reps, Weight: updatedSet.Weight })
      .eq('id', originalSetId)
      .eq('user_id', user.id);
    
    if (error) {
      setError(`Failed to update set: ${error.message}`);
    } else {
      setSuccessMessage('Set updated successfully.');
      await refreshData();
    }
    setIsLoading(false);
    setEditingSet(null);
    setTimeout(() => { setError(null); setSuccessMessage(null); }, 3000);
  };


  const exerciseOptions = masterExerciseList.map(ex => ({ value: ex.nombre, label: ex.nombre }));
  
  const groupedHistory = filteredHistory.reduce((acc, entry) => {
    const dateKey = entry.Date; // DD/MM/YYYY
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(entry);
    return acc;
  }, {} as Record<string, WorkoutEntry[]>);

  // Sort dates: newest first
  const sortedDates = Object.keys(groupedHistory).sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('-')); // DD/MM/YYYY to YYYY-MM-DD for Date object
    const dateB = new Date(b.split('/').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });


  return (
    <div className="p-4 space-y-8 max-w-2xl mx-auto">
      {error && <p className="text-red-500 bg-red-900/30 p-3 rounded-md text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-400 bg-green-900/30 p-3 rounded-md text-center mb-4">{successMessage}</p>}

      {/* Today's Workout Section */}
      <section>
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">Today's Workout</h2>
        <div className="space-y-4 bg-[#182634] p-4 rounded-lg">
          <Input
            label="Date"
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="bg-[#223649]"
          />
          <Select
            label="Exercise"
            options={[{ value: "", label: "Select Exercise" }, ...exerciseOptions]}
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="bg-[#223649]"
          />
          <Input
            label="Number of Sets"
            type="number"
            value={numSets}
            min="1"
            onChange={(e) => setNumSets(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="bg-[#223649]"
          />

          {sets.map((set, index) => (
            <div key={index} className="p-3 bg-[#223649] rounded-md space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-white font-medium">Set {set.SetNumber}</p>
                {sets.length > 1 && (
                  <Button variant="danger" size="sm" onClick={() => removeSetRow(index)} icon={<TrashIcon size={16}/>}>
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Reps"
                  type="number"
                  placeholder="Reps"
                  value={set.Reps}
                  onChange={(e) => handleSetChange(index, 'Reps', e.target.value)}
                  className="bg-[#182634]"
                />
                <Input
                  label="Weight (kg)"
                  type="number"
                  placeholder="Weight (kg)"
                  value={set.Weight}
                  onChange={(e) => handleSetChange(index, 'Weight', e.target.value)}
                  className="bg-[#182634]"
                />
              </div>
            </div>
          ))}
          <div className="flex space-x-3">
            <Button onClick={addSetRow} variant="secondary" icon={<PlusIcon />}>Add Set</Button>
            <Button onClick={handleSaveWorkout} disabled={isLoading} icon={<FloppyDiskIcon />}>
              {isLoading ? 'Saving...' : 'Save Workout'}
            </Button>
          </div>
        </div>
      </section>

      {/* Workout History Section */}
      <section>
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 text-center">Workout History</h2>
        
        {/* History Filter */}
        <div className="bg-[#182634] p-4 rounded-lg mb-6 space-y-3">
            <p className="text-white text-base font-medium">View specific date:</p>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
                <Input 
                    type="date" 
                    value={historyFilterDate} 
                    onChange={(e) => handleFilterByDate(e.target.value)} 
                    className="flex-grow bg-[#223649]"
                />
                <Button onClick={resetToRecentHistory} variant="secondary" icon={<ClockCounterClockwiseIcon />}>
                    Show Recent
                </Button>
            </div>
        </div>

        {sortedDates.length === 0 && <p className="text-[#90adcb] text-center">No workouts recorded yet.</p>}
        {sortedDates.map(date => (
          <div key={date} className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <CalendarBlankIcon className="text-[#90adcb]" size={20}/>
              <h3 className="text-white text-lg font-semibold">{date}</h3>
            </div>
            <hr className="border-blue-500 mb-3" />
            {groupedHistory[date].map((entry, entryIndex) => (
              <div key={entry.WorkoutID} className="bg-[#182634] p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DumbbellIcon className="text-[#0a65c1]" size={20} />
                    <h4 className="text-white text-md font-medium">{entry.Exercise}</h4>
                  </div>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDeleteWorkoutEntry(entry.WorkoutID)}
                    icon={<TrashIcon size={16}/>}
                  >
                    Delete
                  </Button>
                </div>
                <ul className="space-y-1 pl-2">
                  {entry.sets.map((set, setIndex) => (
                    <li key={setIndex} className="text-[#90adcb] text-sm flex justify-between items-center">
                      <span>
                        <span className="text-white mr-1">&bull;</span>
                        Set {set.SetNumber}: {set.Reps} Reps &rarr; {set.Weight} kg
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingSet({ workoutEntryId: entry.WorkoutID, setIndex, set })}
                        icon={<PencilSimpleIcon size={16}/>}
                        className="text-xs !px-2 !min-w-0"
                      >
                        Edit
                      </Button>
                    </li>
                  ))}
                </ul>
                {entryIndex < groupedHistory[date].length - 1 && <hr className="border-[#314d68] my-3" />}
              </div>
            ))}
          </div>
        ))}
      </section>

      {editingSet && (
        <EditSetModal
          isOpen={!!editingSet}
          onClose={() => setEditingSet(null)}
          set={editingSet.set}
          onSave={(updatedSet) => handleSaveEditedSet(editingSet.workoutEntryId, editingSet.setIndex, updatedSet)}
          exerciseName={workoutHistory.find(wh => wh.WorkoutID === editingSet.workoutEntryId)?.Exercise || ''}
        />
      )}
    </div>
  );
};

export default HomePage;

