import { createContext, useContext, useState } from "react";
import { Place } from "@/Types/Memories";

interface MemoriesUIState {
  isModalOpen: boolean;
  isDrawerOpen: boolean;
  selectedPlace: Place | null;

  openModal: () => void;
  closeModal: () => void;

  openDrawer: (place?: Place) => void;
  closeDrawer: () => void;

  clearSelection: () => void;
}

const MemoriesUIContext = createContext<MemoriesUIState | null>(null);

export function MemoriesUIProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <MemoriesUIContext.Provider
      value={{
        isModalOpen,
        isDrawerOpen,
        selectedPlace,

        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),

        openDrawer: (place) => {
          if (place) setSelectedPlace(place);
          setIsDrawerOpen(true);
        },
        closeDrawer: () => setIsDrawerOpen(false),

        clearSelection: () => {
          setSelectedPlace(null);
          setIsDrawerOpen(false);
        },
      }}
    >
      {children}
    </MemoriesUIContext.Provider>
  );
}

export function useMemoriesUI() {
  const ctx = useContext(MemoriesUIContext);
  if (!ctx) {
    throw new Error("useMemoriesUI must be used within MemoriesUIProvider");
  }
  return ctx;
}
