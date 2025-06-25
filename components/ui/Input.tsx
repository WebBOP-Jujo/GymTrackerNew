
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, className, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label htmlFor={id} className="text-white text-base font-medium leading-normal pb-2">{label}</label>}
      <input
        id={id}
        className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
