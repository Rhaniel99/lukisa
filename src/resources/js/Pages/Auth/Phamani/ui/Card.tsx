import { HTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', style, ...props }, ref) => {
    const baseStyles = "rounded-3xl border border-[#E8DCC4] p-6 transition-colors";
    
    // Move background color to variants so it can be overridden more easily if needed, 
    // though Tailwind classes in className usually take precedence if they are generated later.
    // To be safe, we check if className includes 'bg-' and if so, we might rely on specificity or order.
    // But simpler: just put the default bg in the variant string.
    
    const variants = {
      default: "bg-[#FBF7F1] shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
      interactive: "bg-[#FBF7F1] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] cursor-pointer",
    };

    const isInteractive = variant === 'interactive';

    // Basic handling: if className has a bg color, it *should* override if it's an arbitrary value or utility generated later.
    // If strict override is needed, we could conditionally apply the default bg.
    // For now, we assume standard behavior is sufficient or the user will provide style={{ backgroundColor: ... }} for complex cases.

    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className || ''}`}
        whileHover={isInteractive ? { y: -6 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={style}
        {...(props as HTMLMotionProps<"div">)}
      />
    );
  }
);

Card.displayName = "Card";
