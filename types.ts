
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {}

export interface Exercise {
  id: number;
  user_id: string;
  nombre: string;
  created_at: string;
}

export interface WorkoutSet {
  id?: number; // Optional for new sets not yet saved
  SetNumber: number;
  Reps: number;
  Weight: number;
}

export interface WorkoutEntry {
  WorkoutID: string;
  user_id: string;
  Date: string; // Format "YYYY-MM-DD" or "DD/MM/YYYY" as per original
  Exercise: string;
  sets: WorkoutSet[];
  Timestamp: string; 
}

// For Supabase 'Entrenamientos' table structure (raw row from DB)
export interface WorkoutSetRow {
  id: number;
  user_id: string;
  WorkoutID: string;
  Date: string;
  Exercise: string;
  SetNumber: number;
  Reps: number | null;
  Weight: number | null;
  Timestamp: string;
}

export interface E1RMDataPoint {
  date: string; // "YYYY-MM-DD" or "DD/MM/YYYY"
  e1RM: number;
  timestamp: number; // for sorting
}

export enum AuthMode {
  SignIn = 'signin',
  SignUp = 'signup',
}

export interface PageProps {
  user: User | null;
  masterExerciseList: Exercise[];
  workoutHistory: WorkoutEntry[];
  e1rmData: {[exerciseName: string]: E1RMDataPoint[]};
  refreshData: () => Promise<void>;
  setMasterExerciseList: React.Dispatch<React.SetStateAction<Exercise[]>>;
  setWorkoutHistory: React.Dispatch<React.SetStateAction<WorkoutEntry[]>>;
  setE1rmData: React.Dispatch<React.SetStateAction<{[exerciseName: string]: E1RMDataPoint[]}>>;
}
