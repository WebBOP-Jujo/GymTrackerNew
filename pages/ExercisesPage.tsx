
import React, { useState, useEffect } from 'react';
import type { PageProps, Exercise } from '../types';
import { supabase } from '../config/supabaseClient';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { PlusIcon, TrashIcon, ListChecksIcon, EyeSlashIcon } from '../components/icons/PhosphorIcons';

const ExercisesPage: React.FC<PageProps> = ({ user, masterExerciseList, refreshData, setMasterExerciseList }) => {
  const [newExerciseName, setNewExerciseName] = useState('');
  const [exerciseToDelete, setExerciseToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isManagementSectionVisible, setIsManagementSectionVisible] = useState(false);

  useEffect(() => {
    // Reset selected exercise for deletion if list changes
    if (masterExerciseList.length > 0 && !masterExerciseList.find(ex => ex.nombre === exerciseToDelete)) {
      setExerciseToDelete('');
    } else if (masterExerciseList.length === 0) {
      setExerciseToDelete('');
    }
  }, [masterExerciseList, exerciseToDelete]);

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newExerciseName.trim()) {
      setError("Exercise name cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const trimmedName = newExerciseName.trim();
    if (masterExerciseList.some(ex => ex.nombre.toLowerCase() === trimmedName.toLowerCase())) {
      setError("This exercise already exists.");
      setIsLoading(false);
      return;
    }

    const { data: newExercise, error: insertError } = await supabase
      .from('Ejercicios')
      .insert({ nombre: trimmedName, user_id: user.id })
      .select()
      .single();

    if (insertError) {
      setError(`Failed to add exercise: ${insertError.message}`);
    } else if (newExercise) {
      setSuccessMessage(`Exercise "${trimmedName}" added successfully!`);
      setNewExerciseName('');
      // Optimistically update or call refreshData
      // setMasterExerciseList(prev => [...prev, newExercise as Exercise].sort((a,b) => a.nombre.localeCompare(b.nombre)));
      await refreshData(); // This will re-fetch and re-sort
    }
    setIsLoading(false);
    setTimeout(() => { setError(null); setSuccessMessage(null); }, 3000);
  };

  const handleDeleteExercise = async () => {
    if (!user || !exerciseToDelete) {
      setError("Please select an exercise to delete.");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete "${exerciseToDelete}"? This cannot be undone.`)) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    // Find the ID of the exercise to delete
    const exerciseData = masterExerciseList.find(ex => ex.nombre === exerciseToDelete);
    if (!exerciseData) {
        setError("Exercise not found.");
        setIsLoading(false);
        return;
    }

    const { error: deleteError } = await supabase
      .from('Ejercicios')
      .delete()
      .eq('id', exerciseData.id)
      .eq('user_id', user.id);

    if (deleteError) {
      setError(`Failed to delete exercise: ${deleteError.message}`);
    } else {
      setSuccessMessage(`Exercise "${exerciseToDelete}" deleted successfully!`);
      setExerciseToDelete('');
      // Optimistically update or call refreshData
      // setMasterExerciseList(prev => prev.filter(ex => ex.id !== exerciseData.id));
       await refreshData();
    }
    setIsLoading(false);
    setTimeout(() => { setError(null); setSuccessMessage(null); }, 3000);
  };
  
  const exerciseOptions = masterExerciseList.map(ex => ({ value: ex.nombre, label: ex.nombre }));

  return (
    <div className="p-4 space-y-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Manage Exercises</h2>
        <Button 
            variant="ghost"
            onClick={() => setIsManagementSectionVisible(!isManagementSectionVisible)}
            icon={isManagementSectionVisible ? <EyeSlashIcon/> : <ListChecksIcon />}
            className="text-sm !px-3"
        >
            {isManagementSectionVisible ? 'Hide Tools' : 'Show Tools'}
        </Button>
      </div>

      {error && <p className="text-red-500 bg-red-900/30 p-3 rounded-md text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-400 bg-green-900/30 p-3 rounded-md text-center mb-4">{successMessage}</p>}

      {isManagementSectionVisible && (
          <div className="space-y-6 bg-[#182634] p-4 rounded-lg">
            {/* Add Exercise Section */}
            <form onSubmit={handleAddExercise} className="space-y-3">
              <h3 className="text-white text-lg font-semibold">Add New Exercise</h3>
              <Input
                label="Exercise Name"
                type="text"
                placeholder="e.g., Bench Press"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                disabled={isLoading}
                className="bg-[#223649]"
              />
              <Button type="submit" variant="primary" disabled={isLoading} icon={<PlusIcon />} fullWidth>
                {isLoading ? 'Adding...' : 'Add Exercise'}
              </Button>
            </form>

            {/* Delete Exercise Section */}
            {masterExerciseList.length > 0 && (
                <div className="space-y-3">
                <h3 className="text-white text-lg font-semibold">Delete Exercise</h3>
                <Select
                    label="Select Exercise to Delete"
                    options={[{value: '', label: 'Select an exercise'}, ...exerciseOptions]}
                    value={exerciseToDelete}
                    onChange={(e) => setExerciseToDelete(e.target.value)}
                    disabled={isLoading}
                    className="bg-[#223649]"
                />
                <Button 
                    variant="danger" 
                    onClick={handleDeleteExercise} 
                    disabled={isLoading || !exerciseToDelete}
                    icon={<TrashIcon />}
                    fullWidth
                >
                    {isLoading ? 'Deleting...' : 'Delete Selected Exercise'}
                </Button>
                </div>
            )}
          </div>
      )}

      {/* Exercise List Display */}
      <section>
        <h3 className="text-white text-lg font-semibold mb-3">Your Exercises</h3>
        {masterExerciseList.length === 0 ? (
          <p className="text-[#90adcb] text-center">You haven't added any exercises yet.</p>
        ) : (
          <ul className="space-y-2">
            {masterExerciseList.map(exercise => (
              <li key={exercise.id} className="bg-[#223649] p-3 rounded-md text-white text-base">
                {exercise.nombre}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ExercisesPage;
