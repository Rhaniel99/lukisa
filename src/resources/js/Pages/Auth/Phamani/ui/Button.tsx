import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4F3A] disabled:opacity-50 disabled:pointer-events-none rounded-xl select-none";
    
    const variants = {
      primary: "bg-[#3D2817] text-[#F5EFE6] hover:bg-[#2A1B0F] active:bg-[#1F0F06] shadow-[0_4px_14px_rgba(61,40,23,0.2)]",
      secondary: "border-2 border-[#6B4F3A] text-[#6B4F3A] hover:bg-[#6B4F3A] hover:text-[#F5EFE6] active:bg-[#543924]",
      ghost: "hover:bg-[#F5EFE6] text-[#6B4F3A] active:bg-[#E8DCC4]",
      danger: "bg-[#D4183D] text-white hover:bg-[#A3122E] active:bg-[#850E23]",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-12 px-6 text-sm", // Increased from h-11 (44px) to h-12 (48px)
      lg: "h-[52px] px-8 text-base", // Adjusted to 52px
      icon: "h-12 w-12",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`;

    return (
      <motion.button
        ref={ref}
        className={combinedClassName}
        disabled={isLoading || props.disabled}
        whileTap={{ scale: 0.98 }}
        {...(props as HTMLMotionProps<"button">)}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
