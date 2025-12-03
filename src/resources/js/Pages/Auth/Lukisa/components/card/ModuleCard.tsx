import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  delay?: number;
}

export function ModuleCard({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="
        bg-white rounded-[2rem] p-8 lg:p-10
        shadow-[0_4px_20px_rgba(61,40,23,0.05)]
        hover:shadow-[0_20px_40px_rgba(61,40,23,0.1)]
        transition-all border border-[#E8DCC4]/50
        flex flex-col
      "
    >
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 bg-[#F5EFE6] rounded-[1.5rem] flex items-center justify-center shadow-inner text-[#3D2817]">
          <Icon className="w-12 h-12 opacity-90" />
        </div>
      </div>

      <h2 className="text-[#3D2817] text-2xl font-bold text-center mb-3">
        {title}
      </h2>

      <p className="text-[#6B4E3D] text-center mb-8 opacity-70 flex-grow">
        {description}
      </p>

      <button
        onClick={onClick}
        className="
          w-full bg-[#6B4E3D] text-[#F5EFE6]
          py-4 rounded-2xl font-bold
          flex items-center justify-center gap-2
          hover:bg-[#3D2817] hover:shadow-lg
        "
      >
        {buttonText}
      </button>
    </motion.div>
  );
}
