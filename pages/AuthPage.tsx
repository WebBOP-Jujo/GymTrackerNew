
import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import type { AuthMode } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { APP_NAME } from '../constants';
import { UserPlusIcon, SignInIcon } from '../components/icons/PhosphorIcons';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('signin' as AuthMode.SignIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'signup' as AuthMode.SignUp) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        // Navigation will be handled by App.tsx's onAuthStateChange
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#101a23] dark justify-center items-center group/design-root overflow-y-auto p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-white tracking-light text-[28px] font-bold leading-tight">
            Welcome to {APP_NAME}
          </h2>
          <p className="text-[#90adcb] text-base font-normal leading-normal mt-2">
            {mode === 'signup' as AuthMode.SignUp
              ? 'Create an account to track your gym progress.'
              : 'Log in to continue your fitness journey.'}
          </p>
        </div>

        {error && <p className="text-red-500 bg-red-900/30 p-3 rounded-md text-center">{error}</p>}
        {message && <p className="text-green-400 bg-green-900/30 p-3 rounded-md text-center">{message}</p>}

        <form onSubmit={handleAuth} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" variant="primary" fullWidth disabled={loading} icon={mode === 'signup' as AuthMode.SignUp ? <UserPlusIcon /> : <SignInIcon />}>
            {loading ? 'Processing...' : (mode === 'signup' as AuthMode.SignUp ? 'Sign Up' : 'Log In')}
          </Button>
        </form>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => {
            setMode(mode === 'signin' as AuthMode.SignIn ? 'signup' as AuthMode.SignUp : 'signin' as AuthMode.SignIn);
            setError(null);
            setMessage(null);
          }}
          disabled={loading}
        >
          {mode === 'signin' as AuthMode.SignIn ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
