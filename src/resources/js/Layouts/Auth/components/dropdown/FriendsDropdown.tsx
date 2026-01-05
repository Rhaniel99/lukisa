import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserPlus, MoreVertical, Check, X, Search, Lock } from "lucide-react";
import { BlockUserDialog } from "@/Layouts/Auth/components/dialog/BlockUserDialog";
import { useFriends } from "@/Layouts/Auth/hooks/useFriends";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { useFriendsUI } from "@/Layouts/Auth/context/FriendsContext";
import { dropdownMotion } from "@/Components/Shared/Ui/motionPresets";

interface FriendsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FriendsDropdown({ isOpen, onClose }: FriendsDropdownProps) {

  // dados do backend / hooks
  const {
    accepted,
    pending,
    counts,
    load,
    sendRequest,
    acceptFriend,
    rejectFriend,
    removeFriend,
    blockFriend,
  } = useFriends();

  // estado e controle de UI vindo do FriendsContext
  const {
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
  } = useFriendsUI();

  // lazy load quando abre / trocando aba
  useEffect(() => {
    if (!isOpen) return;
    load(activeTab === "pending" ? "pending" : "accepted");
  }, [isOpen, activeTab]);

  const changeTab = (tab: "all" | "pending") => {
    setActiveTab(tab);
    load(tab === "pending" ? "pending" : "accepted");
  };

  const isValidTag = /^.+#\d{4}$/.test(addInput);

  const handleSendRequest = () => {
    if (!isValidTag) return;

    if (typeof sendRequest === "function") {
      sendRequest(addInput);
    } else {
      console.warn("sendRequest not implemented in useFriends()");
    }

    setAddInput("");
    toggleAdding(); // fecha modo adicionar
  };

  const filteredAccepted = accepted.filter((f) =>
    `${f.username}#${f.discriminator}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPending = pending.filter((f) =>
    `${f.username}#${f.discriminator}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="
              absolute right-0 top-16 w-80 z-50
              bg-[#FDFBF7]/90 backdrop-blur-xl
              rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)]
              border border-[#E8DCC4] overflow-hidden
              flex flex-col
            "

            {...dropdownMotion}
          >
            {/* HEADER */}
            <div className="p-4 border-b border-[#E8DCC4] bg-[#FDFBF7]">
              <div className="flex justify-between items-center">
                <h3 className="text-[#3D2817] font-bold text-lg">Amigos</h3>

                <div className="flex gap-2">
                  <button
                    onClick={toggleAdding}
                    className={`p-2 rounded-xl transition ${isAdding ? "bg-[#3D2817] text-[#FDFBF7]" : "text-[#6B4E3D] hover:bg-[#E8DCC4]"
                      }`}
                    aria-label={isAdding ? "Fechar adicionar" : "Adicionar amigo"}
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>

                  <button onClick={onClose} className="p-2 rounded-xl text-[#8B7355] hover:text-[#3D2817]" aria-label="Fechar menu">
                    ✕
                  </button>
                </div>
              </div>

              {/* INPUT DE ADICIONAR */}
              <AnimatePresence>
                {isAdding && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <div className="flex gap-2">
                      <Input
                        value={addInput}
                        onChange={(e) => setAddInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSendRequest();
                          }
                        }}
                        placeholder="Nome#0000"
                        className="bg-white border-[#E8DCC4] text-[#3D2817]"
                      />
                      <Button
                        disabled={!isValidTag}
                        className="bg-[#6B4E3D] text-[#FDFBF7] hover:bg-[#3D2817]"
                        onClick={handleSendRequest}
                        aria-label="Enviar solicitação"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SEARCH */}
              {!isAdding && (
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-3 w-4 text-[#A69580]" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    className="pl-9 bg-white border-[#E8DCC4] text-[#3D2817]"
                  />
                </div>
              )}
            </div>

            {/* TABS */}
            <div className="flex border-b border-[#E8DCC4] bg-[#FDFBF7]">
              <button
                onClick={() => changeTab("all")}
                className={`flex-1 py-3 font-medium text-sm relative transition-colors ${activeTab === "all" ? "text-[#3D2817]" : "text-[#A69580] hover:text-[#6B4E3D]"
                  }`}
              >
                Todos
                {activeTab === "all" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3D2817]" />}
              </button>

              <button
                onClick={() => changeTab("pending")}
                className={`flex-1 py-3 font-medium text-sm relative transition-colors ${activeTab === "pending" ? "text-[#3D2817]" : "text-[#A69580] hover:text-[#6B4E3D]"
                  }`}
              >
                Pendentes
                {counts > 0 && <span className="ml-2 px-2 py-0.5 text-white bg-[#D4183D] rounded-full text-[10px]">{counts}</span>}
                {activeTab === "pending" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3D2817]" />}
              </button>
            </div>

            {/* LISTA */}
            <div className="max-h-80 overflow-y-auto bg-[#F5EFE6] p-2">
              {activeTab === "all" ? (
                filteredAccepted.length === 0 ? (
                  <p className="text-center text-sm text-[#8B7355] py-6">Nenhum amigo encontrado.</p>
                ) : (
                  filteredAccepted.map((friend) => (
                    <div key={friend.id} className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#E8DCC4]/60 transition">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10 rounded-xl border border-[#E8DCC4] overflow-hidden">
                            <AvatarImage src={friend.avatar_url || ""} />
                            <AvatarFallback className="bg-[#6B4E3D] text-[#F5EFE6] font-semibold flex items-center justify-center">
                              {friend.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <div>
                          <p className="text-[#3D2817] font-semibold">{friend.username}</p>
                          <p className="text-[#8B7355] text-xs">#{friend.discriminator}</p>
                        </div>
                      </div>

                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-lg text-[#8B7355] hover:bg-[#E8DCC4] hover:text-[#3D2817] opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Mais opções">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent className="w-40 bg-[#FDFBF7] border-[#E8DCC4] rounded-xl">
                            <DropdownMenuItem onClick={() => removeFriend(friend.id)} className="cursor-pointer text-[#3D2817]">
                              Remover Amigo
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setUserToBlock({ id: friend.id, name: friend.username });
                                setBlockModalOpen(true);
                              }}
                              className="cursor-pointer text-[#D4183D]"
                            >
                              Bloquear
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )
              ) : filteredPending.length === 0 ? (
                <p className="text-center text-sm text-[#8B7355] py-6">Nenhuma solicitação pendente.</p>
              ) : (
                filteredPending.map((f) => (
                  <div key={f.friendship_id} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#E8DCC4]/60 transition">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 rounded-xl border border-[#E8DCC4] overflow-hidden">
                        <AvatarImage src={f.avatar_url || ""} />
                        <AvatarFallback className="bg-[#8B7355] text-white font-semibold">{f.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-[#3D2817] font-semibold">{f.username}</p>
                        <p className="text-[#8B7355] text-xs">#{f.discriminator}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => acceptFriend(f.friendship_id)} className="p-1.5 bg-[#D3F6D3] text-[#145C2A] rounded-lg hover:bg-[#bef2c0]" aria-label="Aceitar">
                        <Check className="w-4 h-4" />
                      </button>

                      <button onClick={() => rejectFriend(f.friendship_id)} className="p-1.5 bg-[#FCE7E7] text-[#D4183D] rounded-lg hover:bg-[#f8d2d2]" aria-label="Rejeitar">
                        <X className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setUserToBlock({ id: f.id, name: f.username });
                          setBlockModalOpen(true);
                        }}
                        className="p-1.5 text-[#8B7355] hover:bg-[#E8DCC4] rounded-lg"
                        aria-label="Bloquear"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BlockUserDialog
        isOpen={blockModalOpen}
        userName={userToBlock?.name ?? "Usuário"}
        onClose={() => setBlockModalOpen(false)}
        onConfirm={() => {
          if (userToBlock) blockFriend(userToBlock.id);
          setBlockModalOpen(false);
        }}
      />
    </>
  );
}
