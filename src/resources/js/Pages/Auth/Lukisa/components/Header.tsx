import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-12 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D2817] mb-4">
          {title}
        </h1>

        <p className="text-[#6B4E3D] text-lg md:text-xl opacity-80 font-medium">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}
