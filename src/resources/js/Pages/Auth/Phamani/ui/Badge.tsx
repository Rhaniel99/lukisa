import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "bg-[#3D2817] text-[#F5EFE6]",
    success: "bg-[#E3F9E5] text-[#1F5428]",
    warning: "bg-[#FFF4E5] text-[#663C00]",
    danger: "bg-[#FCE7E7] text-[#D4183D]",
    outline: "border-2 border-[#6B4F3A] text-[#6B4F3A]",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className || ''}`} {...props} />
  );
}
