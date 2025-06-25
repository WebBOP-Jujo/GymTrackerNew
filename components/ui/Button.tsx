
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "flex items-center justify-center rounded-full font-bold leading-normal tracking-[0.015em] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#101a23]";
  
  const variantStyles = {
    primary: 'bg-[#0a65c1] text-white hover:bg-[#0d7ddb] focus:ring-[#0a65c1]',
    secondary: 'bg-[#223649] text-white hover:bg-[#314d68] focus:ring-[#223649]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    ghost: 'bg-transparent text-white hover:bg-[#223649]/50 focus:ring-white/50'
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };

  const widthStyle = fullWidth ? 'w-full' : 'min-w-[84px]';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
};

export default Button;
