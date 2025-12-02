// /src/resources/js/Components/Shared/Avatar/AvatarHistoryList.tsx
import { memo, useCallback } from "react";
import { Label } from "@/Components/ui/label";
import { motion } from "framer-motion";
import type { MediaItem } from "@/Types/Avatar";

interface AvatarHistoryListProps {
  history: MediaItem[];
  selectedId: number | null;
  onSelect: (item: MediaItem) => void;
}

function AvatarHistoryListBase({ history, selectedId, onSelect }: AvatarHistoryListProps) {
  if (!history || history.length === 0) return null;

  const makeHandler = useCallback((item: MediaItem) => () => onSelect(item), [onSelect]);

  return (
    <div className="space-y-2 select-none">
      <Label className="text-xs uppercase text-lukisa-brown font-bold tracking-wider">
        Anteriores
      </Label>

      <motion.div
        className="flex gap-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.06 },
          },
        }}
      >
        {history.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={makeHandler(item)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all
                ${isSelected ? "border-[#403E34] ring-2 ring-[#8B9A7E]" : "border-transparent hover:border-[#737065]"}
              `}
            >
              <img src={item.url} alt="Avatar antigo" className="w-full h-full object-cover" draggable={false} />
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

export const AvatarHistoryList = memo(AvatarHistoryListBase);
