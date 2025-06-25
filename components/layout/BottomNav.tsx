
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HouseIcon, BarbellIcon, ChartLineUpIcon, UserIcon } from '../icons/PhosphorIcons';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-1 flex-col items-center justify-end gap-1 rounded-full p-1 transition-colors ${
        isActive ? 'text-white' : 'text-[#90adcb] hover:text-white'
      }`
    }
    aria-label={label}
  >
    <div className="flex h-8 w-8 items-center justify-center">{icon}</div>
    {/* Optional: Add text label if design requires it */}
    {/* <span className="text-xs">{label}</span> */}
  </NavLink>
);

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex gap-2 border-t border-[#223649] bg-[#182634] px-2 pb-safe-bottom pt-2 h-16 items-center">
      <NavItem to="/home" icon={<HouseIcon size={28} weight="fill" />} label="Home" />
      <NavItem to="/exercises" icon={<BarbellIcon size={28} />} label="Exercises" />
      <NavItem to="/progress" icon={<ChartLineUpIcon size={28} />} label="Progress" />
      <NavItem to="/profile" icon={<UserIcon size={28} />} label="Profile" />
    </nav>
  );
};

export default BottomNav;
