
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, id, error, options, className, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label htmlFor={id} className="text-white text-base font-medium leading-normal pb-2">{label}</label>}
      <select
        id={id}
        className={`form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 pr-10 text-base font-normal leading-normal appearance-none ${error ? 'border-red-500' : ''} ${className}`}
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2390adcb' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} className="bg-[#101a23] text-white">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;
