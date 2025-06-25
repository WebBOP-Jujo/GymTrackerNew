
import React from 'react';

interface IconProps {
  className?: string;
  size?: number | string;
  color?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

export const GearIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
  </svg>
);

export const PencilSimpleIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
  </svg>
);

export const HouseIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', weight = 'regular' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    {weight === 'fill' ? (
      <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
    ) : (
      <path d="M128,24,35.17,106.83A16,16,0,0,0,32,118.62V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V118.62a16,16,0,0,0-3.17-9.79ZM208,208H160V160a32,32,0,0,0-32-32H128a32,32,0,0,0-32,32v48H48V118.62L128,45.38l80,73.24Z"></path>
    )}
  </svg>
);

export const BarbellIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.82c0,.06,0,.12,0,.18s0,.12,0,.18V192Zm32-24H208V88h16Z"></path>
  </svg>
);

export const ChartLineUpIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V155.12L81.54,95.55a16,16,0,0,1,22.63-.19L136,124.8,186.36,80.48a8,8,0,0,1,10.73-2l32,24a8,8,0,0,1-8.18,13.06L192,94.67l-51.64,44.32a16,16,0,0,1-21.46.38L87.33,109.92,40,161.43V200H224A8,8,0,0,1,232,208Z"></path>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
  </svg>
);

export const FloppyDiskIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M208,24H48A24,24,0,0,0,24,48V208a24,24,0,0,0,24,24H184a23.89,23.89,0,0,0,17-7L223,209a23.89,23.89,0,0,0,7-17V72Zm0,24V88H48V48ZM80,120h96a8,8,0,0,1,0,16H80a8,8,0,0,1,0-16Zm96,88H80V152h96Zm31.31-7.06L185,223.25A8,8,0,0,1,180.69,224H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8V196.69A8,8,0,0,1,207.31,200.94Z"></path>
  </svg>
);

export const SignOutIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm117.66-90.34L184,161.66a8,8,0,0,1-11.32-11.32L196.69,128,172.68,103.66a8,8,0,0,1,11.32-11.32l45.66,36A8,8,0,0,1,229.66,125.66ZM224,120H104a8,8,0,0,0,0,16h120a8,8,0,0,0,0-16Z"></path>
  </svg>
);

export const CalendarBlankIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
     <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path>
  </svg>
);

export const DumbbellIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', weight = 'regular' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    {weight === 'fill' ? (
       <path d="M72,128a8,8,0,0,0,8,8h24v24a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V104A24,24,0,0,1,48,80H80a24,24,0,0,1,24,24v16H80A8,8,0,0,0,72,128Zm152,40a24,24,0,0,0-24-24h-8v16a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V136H152a8,8,0,0,1,0-16h16V96a8,8,0,0,1,8-8h8a8,8,0,0,1,8,8v16h8a24,24,0,0,0,24-24V72a24,24,0,0,0-24-24H176a24,24,0,0,0-24,24v7.35A40,40,0,0,0,120,64H112a40,40,0,0,0-32,15.35V72a24,24,0,0,0-24-24H24A24,24,0,0,0,0,72v80a24,24,0,0,0,24,24H56a24,24,0,0,0,24-24v-7.35A40,40,0,0,0,112,192h8a40,40,0,0,0,32-15.35V184a24,24,0,0,0,24,24h32a24,24,0,0,0,24-24Z"></path>
    ) : (
      <path d="M224,104v48a16,16,0,0,1-16,16h-8V96h8A16,16,0,0,1,224,104ZM88,144H56V112H88ZM80,96H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H80Zm128-16h-8v72h8a16,16,0,0,0,16-16V104A16,16,0,0,0,208,80Zm-64,64V112h32v32Zm0-80V64a16,16,0,0,0-16-16H104A16,16,0,0,0,88,64v16H40a8,8,0,0,0-8,8v80a8,8,0,0,0,8,8H88v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V176h48a8,8,0,0,0,8-8V88a8,8,0,0,0-8-8Z"></path>
    )}
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
  </svg>
);

export const ListChecksIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
        <path d="M224,64a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h112A8,8,0,0,1,224,64Zm-8,56H104a8,8,0,0,0,0,16h112a8,8,0,0,0,0-16Zm0,64H104a8,8,0,0,0,0,16h112a8,8,0,0,0,0-16ZM77.74,53.84,56,75.58,42.26,61.84a8,8,0,1,0-12.52,10.08l20,25a8,8,0,0,0,6.26,3.08,8,8,0,0,0,6.26-3.08l28-35A8,8,0,1,0,77.74,53.84Zm0,64L56,139.58,42.26,125.84a8,8,0,1,0-12.52,10.08l20,25a8,8,0,0,0,6.26,3.08,8,8,0,0,0,6.26-3.08l28-35A8,8,0,1,0,77.74,117.84Zm0,64L56,203.58,42.26,189.84a8,8,0,1,0-12.52,10.08l20,25a8,8,0,0,0,6.26,3.08,8,8,0,0,0,6.26-3.08l28-35A8,8,0,1,0,77.74,181.84Z"></path>
    </svg>
);

export const EyeSlashIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
        <path d="M234.33,142.11A164.44,164.44,0,0,1,136.6,202.73a8,8,0,0,1-13.2,0A164.41,164.41,0,0,1,21.67,142.11a8,8,0,0,1,0-8.22A164.41,164.41,0,0,1,118.33,45.27a8,8,0,0,1,13.2,0A164.44,164.44,0,0,1,234.33,133.89a8,8,0,0,1,0,8.22ZM128,184c-31,0-58-15.54-78.52-40.12C59,129.47,69.75,120,80,111.41l88,88C159.41,200.74,144.92,197.12,128,184Zm0-112c31,0,58,15.54,78.52,40.12C197,126.53,186.25,136,176,144.59l-88-88C96.59,55.26,111.08,58.88,128,72Zm91.13,91.13L44.87,44.87a8,8,0,0,0-11.32,11.32L219.81,211.45a8,8,0,0,0,11.32-11.32Z"></path>
    </svg>
);

export const ClockCounterClockwiseIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h40A8,8,0,0,1,176,128Zm-28.62-5.54L128,131.84V160a8,8,0,0,0,16,0v-33.8l23.1-13.34a8,8,0,1,0-8-13.86Z"></path>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
    </svg>
);

export const UserPlusIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Zm160,88a8,8,0,0,1-8,8h-16a8,8,0,0,1,0-16h16A8,8,0,0,1,232,184Zm-24-32a8,8,0,0,1-8,8h-16a8,8,0,0,1,0-16h16A8,8,0,0,1,208,152Zm8-32h-16a8,8,0,0,0,0,16h16a8,8,0,0,0,0-16Z"></path>
    </svg>
);

export const SignInIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 256 256" className={className}>
        <path d="M128,24a104,104,0,1,0,104,104A104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm72-88a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h88A8,8,0,0,1,200,128Zm-24-40L135.31,128.69a8,8,0,0,1-11.31,0L108,112.69a8,8,0,0,1,10.69-12L128,109.31l19.31-19.31a8,8,0,0,1,11.38,11.31Z"></path>
    </svg>
);
// Add more icons as needed...