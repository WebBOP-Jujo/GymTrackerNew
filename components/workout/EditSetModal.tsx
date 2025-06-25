
import React, { useState, useEffect } from 'react';
import type { WorkoutSet } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { FloppyDiskIcon, XIcon } from '../icons/PhosphorIcons';

interface EditSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  set: WorkoutSet;
  onSave: (updatedSet: WorkoutSet) => void;
  exerciseName: string;
}

const EditSetModal: React.FC<EditSetModalProps> = ({ isOpen, onClose, set, onSave, exerciseName }) => {
  const [reps, setReps] = useState(set.Reps);
  const [weight, setWeight] = useState(set.Weight);

  useEffect(() => {
    setReps(set.Reps);
    setWeight(set.Weight);
  }, [set]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...set, Reps: Number(reps), Weight: Number(weight) });
  };

  return (
    <div className="fixed inset-0 bg-[#141414]/80 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-[#101a23] rounded-t-xl sm:rounded-xl shadow-xl w-full max-w-md transform transition-all">
        {/* Handle for bottom sheet appearance on mobile */}
        <div className="flex sm:hidden h-8 w-full items-center justify-center cursor-grab" onTouchEnd={onClose}>
            <div className="h-1 w-9 rounded-full bg-[#314d68]"></div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Edit Set {set.SetNumber}</h2>
            <button onClick={onClose} className="text-[#90adcb] hover:text-white">
              <XIcon size={24} />
            </button>
          </div>
          <p className="text-[#90adcb]">Exercise: {exerciseName}</p>
          
          <Input
            label="Repetitions"
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className="bg-[#223649]"
          />
          <Input
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="bg-[#223649]"
          />
          <div className="flex gap-3 pt-2">
            <Button onClick={onClose} variant="secondary" fullWidth>
              Cancel
            </Button>
            <Button onClick={handleSave} variant="primary" fullWidth icon={<FloppyDiskIcon />}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSetModal;
