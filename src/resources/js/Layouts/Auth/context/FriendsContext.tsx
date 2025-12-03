import { createContext, useContext, useState, PropsWithChildren } from "react";

type Tab = "all" | "pending";

interface FriendsUIContextType {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;

  search: string;
  setSearch: (v: string) => void;

  isAdding: boolean;
  toggleAdding: () => void;
  addInput: string;
  setAddInput: (v: string) => void;

  blockModalOpen: boolean;
  setBlockModalOpen: (v: boolean) => void;

  userToBlock: { id: string; name: string } | null;
  setUserToBlock: (u: { id: string; name: string } | null) => void;
}

const FriendsUIContext = createContext<FriendsUIContextType | null>(null);

export function FriendsProvider({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [addInput, setAddInput] = useState("");

  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<{ id: string; name: string } | null>(null);

  const toggleAdding = () => setIsAdding(a => !a);

  return (
    <FriendsUIContext.Provider
      value={{
        activeTab,
        setActiveTab,

        search,
        setSearch,

        isAdding,
        toggleAdding,

        addInput,
        setAddInput,

        blockModalOpen,
        setBlockModalOpen,

        userToBlock,
        setUserToBlock,
      }}
    >
      {children}
    </FriendsUIContext.Provider>
  );
}

export function useFriendsUI() {
  const ctx = useContext(FriendsUIContext);
  if (!ctx) throw new Error("useFriendsUI must be used inside <FriendsProvider>");
  return ctx;
}
