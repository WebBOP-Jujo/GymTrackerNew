
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { supabase } from './config/supabaseClient';
import type { User, Exercise, WorkoutEntry, WorkoutSet, E1RMDataPoint } from './types';
import { defaultExercises } from './constants';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ExercisesPage from './pages/ExercisesPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/layout/BottomNav';
import Header from './components/layout/Header';
import { Session } from '@supabase/supabase-js';


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [masterExerciseList, setMasterExerciseList] = useState<Exercise[]>([]);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutEntry[]>([]);
  const [e1rmData, setE1rmData] = useState<{[exerciseName: string]: E1RMDataPoint[]}>({});
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserExercises = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('Ejercicios')
      .select('id, nombre, created_at, user_id')
      .eq('user_id', userId)
      .order('nombre', { ascending: true });

    if (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }
    if (data && data.length === 0) {
      // Add default exercises if user has none
      const exercisesToInsert = defaultExercises.map(ex => ({ nombre: ex.name, user_id: userId }));
      const { data: insertedExercises, error: insertError } = await supabase
        .from('Ejercicios')
        .insert(exercisesToInsert)
        .select('id, nombre, created_at, user_id');
      if (insertError) {
        console.error('Error inserting default exercises:', insertError);
        return [];
      }
      setMasterExerciseList(insertedExercises || []);
      return insertedExercises || [];
    }
    setMasterExerciseList(data || []);
    return data || [];
  }, []);

  const fetchWorkoutHistory = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('Entrenamientos')
      .select('*')
      .eq('user_id', userId)
      .order('Timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching workout history:', error);
      return [];
    }
    
    // Group sets by WorkoutID
    const groupedByWorkoutID: { [key: string]: WorkoutEntry } = {};
    if (data) {
      for (const set of data) {
        const workoutID = set.WorkoutID as string;
        if (!groupedByWorkoutID[workoutID]) {
          groupedByWorkoutID[workoutID] = {
            WorkoutID: workoutID,
            Date: set.Date as string,
            Exercise: set.Exercise as string,
            user_id: set.user_id as string,
            Timestamp: set.Timestamp as string,
            sets: []
          };
        }
        groupedByWorkoutID[workoutID].sets.push({
          id: set.id as number,
          SetNumber: set.SetNumber as number,
          Reps: set.Reps as number,
          Weight: set.Weight as number
        });
      }
    }
    const historyArray = Object.values(groupedByWorkoutID);
    // Sort sets within each entry
    historyArray.forEach(entry => entry.sets.sort((a, b) => a.SetNumber - b.SetNumber));
    
    setWorkoutHistory(historyArray);
    return historyArray;
  }, []);
  
  const calculateE1RM = (weight: number, reps: number): number => {
    if (reps === 0) return 0;
    if (reps === 1) return weight;
    return Math.round(weight * (1 + reps / 30)); // Epley formula
  };

  const generateE1RMData = useCallback((history: WorkoutEntry[], exercises: Exercise[]) => {
    const newE1rmData: {[exerciseName: string]: E1RMDataPoint[]} = {};
    exercises.forEach(exercise => {
      const exerciseHistory = history.filter(entry => entry.Exercise === exercise.nombre);
      const dataPoints: E1RMDataPoint[] = [];
      exerciseHistory.forEach(entry => {
        const dailyMaxE1RM = Math.max(...entry.sets.map(set => calculateE1RM(set.Weight, set.Reps)));
        if (dailyMaxE1RM > 0) {
          dataPoints.push({
            date: entry.Date, // Assuming Date is "YYYY-MM-DD" or similar for sorting
            e1RM: dailyMaxE1RM,
            timestamp: new Date(entry.Timestamp).getTime()
          });
        }
      });
      // Sort by date and keep unique dates (latest e1RM for a given date if multiple entries)
      const sortedUniquePoints = Array.from(new Map(dataPoints.sort((a,b) => a.timestamp - b.timestamp).map(item => [item.date, item])).values());
      newE1rmData[exercise.nombre] = sortedUniquePoints;
    });
    setE1rmData(newE1rmData);
  }, []);


  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const exercises = await fetchUserExercises(session.user.id);
        const history = await fetchWorkoutHistory(session.user.id);
        generateE1RMData(history, exercises);
        if (!['/', '/auth'].includes(location.pathname)) {
         // stay or navigate to home
        } else {
          navigate('/home');
        }
      } else {
        setMasterExerciseList([]);
        setWorkoutHistory([]);
        setE1rmData({});
        navigate('/auth');
      }
      setLoading(false);
    });
    
    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserExercises(session.user.id).then(exercises => {
          fetchWorkoutHistory(session.user.id).then(history => {
            generateE1RMData(history, exercises);
          });
        });
      }
      setLoading(false)
    })


    return () => {
      authListener.subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUserExercises, fetchWorkoutHistory, generateE1RMData, navigate]);

  const refreshData = async () => {
    if (user) {
      const exercises = await fetchUserExercises(user.id);
      const history = await fetchWorkoutHistory(user.id);
      generateE1RMData(history, exercises);
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-[#101a23] text-white">Loading...</div>;
  }

  const commonProps = { user, masterExerciseList, workoutHistory, e1rmData, refreshData, setMasterExerciseList, setWorkoutHistory, setE1rmData };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#101a23] dark justify-between group/design-root overflow-x-hidden">
      {user && <Header />}
      <main className={`flex-grow ${user ? 'pb-20 pt-16' : ''}  overflow-y-auto`}>
        <Routes>
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/home" />} />
          <Route path="/home" element={user ? <HomePage {...commonProps} /> : <Navigate to="/auth" />} />
          <Route path="/exercises" element={user ? <ExercisesPage {...commonProps} /> : <Navigate to="/auth" />} />
          <Route path="/progress" element={user ? <ProgressPage {...commonProps} /> : <Navigate to="/auth" />} />
          <Route path="/profile" element={user ? <ProfilePage {...commonProps} /> : <Navigate to="/auth" />} />
          <Route path="*" element={<Navigate to={user ? "/home" : "/auth"} />} />
        </Routes>
      </main>
      {user && <BottomNav />}
    </div>
  );
};

export default App;
