
import React from 'react';
import type { PageProps } from '../types';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { SignOutIcon, UserIcon as ProfileUserIcon } from '../components/icons/PhosphorIcons';

const ProfilePage: React.FC<PageProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (!user) {
    return null; // Or a loading/redirect state
  }

  return (
    <div className="p-4 space-y-8 max-w-2xl mx-auto">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">Profile & Settings</h2>
      
      <div className="bg-[#182634] p-6 rounded-lg space-y-4 text-center">
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-[#223649] rounded-full inline-flex">
                <ProfileUserIcon size={48} className="text-[#0a65c1]" />
            </div>
        </div>
        <p className="text-white text-lg">
          Email: <span className="font-semibold text-[#90adcb]">{user.email}</span>
        </p>
        <p className="text-sm text-[#90adcb]">
          User ID: {user.id}
        </p>
        <p className="text-sm text-[#90adcb]">
          Joined: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-[#182634] p-4 rounded-lg space-y-4">
        <h3 className="text-white text-lg font-semibold">Account</h3>
        <Button onClick={handleSignOut} variant="danger" fullWidth icon={<SignOutIcon />}>
          Sign Out
        </Button>
      </div>

      {/* Placeholder for future settings */}
      {/* 
      <div className="bg-[#182634] p-4 rounded-lg space-y-4">
        <h3 className="text-white text-lg font-semibold">App Settings</h3>
        <p className="text-[#90adcb]">Future settings will go here (e.g., theme, default units).</p>
      </div> 
      */}
    </div>
  );
};

export default ProfilePage;
