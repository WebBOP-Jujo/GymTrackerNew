
import React from 'react';
import { supabase } from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { SignOutIcon, GearIcon } from '../icons/PhosphorIcons'; // Assuming GearIcon is for settings
import { APP_NAME } from '../../constants';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center bg-[#101a23] p-4 pb-2 justify-between border-b border-[#223649]/50 h-16">
      <div className="flex w-12 items-center justify-start">
        {/* Placeholder for potential left icon/button */}
      </div>
      <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
        {APP_NAME}
      </h1>
      <div className="flex w-12 items-center justify-end space-x-2">
         {/* <button 
          onClick={() => navigate('/profile')} // Or a settings modal
          className="p-2 text-white hover:text-[#90adcb] transition-colors"
          aria-label="Settings"
        >
          <GearIcon size={24} />
        </button> */}
        <button 
          onClick={handleSignOut}
          className="p-2 text-white hover:text-red-400 transition-colors"
          aria-label="Sign Out"
        >
          <SignOutIcon size={24} />
        </button>
      </div>
      {/* Decorative line, if needed for styling similar to mockups */}
      {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-blue-500"></div> */}
    </header>
  );
};

export default Header;
