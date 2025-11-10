import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Users, Search, UserPlus, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";
import { FriendItem } from "./FriendItem";
import { PendingFriendItem } from "./PendingFriendItem";
import { useFriends } from "@/Hooks/useFriends";

interface FriendsSubmenuProps {
    pendingCount: number;
}

export function FriendsSubmenu({ pendingCount: initialPendingCount }: FriendsSubmenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "pending">("all");
    const [isAddFriendMode, setIsAddFriendMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({ tag: "" });

    const { pending, accepted, counts, load, acceptFriend, rejectFriend, removeFriend, blockFriend } = useFriends();

    const handleAddFriendSubmit = () => {
        post(route("friends.store"), {
            onSuccess: () => {
                reset();
                setIsAddFriendMode(false);
            },
            preserveScroll: true,
        });
    };

    // 🔁 Lazy load quando abre
    useEffect(() => {
        if (isOpen) load(activeTab === "pending" ? "pending" : "accepted");
    }, [isOpen]);

    // 🔁 Carrega conteúdo ao trocar aba
    const handleTabChange = (value: string) => {
        setActiveTab(value as "all" | "pending");
        load(value === "pending" ? "pending" : "accepted");
    };

    const filteredActiveFriends = accepted.filter((friend) =>
        [friend.username, friend.discriminator]
            .some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filteredPendingFriends = pending.filter((friend) =>
        [friend.username, friend.discriminator]
            .some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#5C4A3A] hover:bg-[#E8E6D4]/70 relative"
                >
                    <Users className="w-5 h-5" />
                    {(counts || initialPendingCount) > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white">
                            {counts || initialPendingCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-80 bg-white border-[#E8E6D4] shadow-lg p-0 data-[state=open]:animate-in data-[state=closed]:animate-out"
            >
                <div className="p-4 space-y-4">
                    {/* Cabeçalho */}
                    <div className="flex items-center justify-between gap-2">
                        <AnimatePresence mode="wait">
                            {isAddFriendMode ? (
                                <motion.div
                                    key="add-friend-input"
                                    className="flex-grow"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Form onSubmit={handleAddFriendSubmit}>
                                        <Input
                                            placeholder="Digite a tag do usuário..."
                                            value={data.tag}
                                            onChange={(e) => setData("tag", e.target.value)}
                                            className="bg-[#F5F4ED] border-[#E8E6D4] focus-visible:ring-[#8B9A7E] h-8"
                                            disabled={processing}
                                        />
                                        {errors.tag && <p className="text-xs text-red-500 mt-1">{errors.tag}</p>}
                                        <button type="submit" className="hidden" />
                                    </Form>
                                </motion.div>
                            ) : (
                                <motion.h3
                                    key="amigos-title"
                                    className="font-semibold text-[#3A3A3A]"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Amigos
                                </motion.h3>
                            )}
                        </AnimatePresence>

                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-[#5C4A3A] hover:bg-[#E8E6D4]/70 flex-shrink-0"
                            onClick={() => setIsAddFriendMode(!isAddFriendMode)}
                        >
                            <AnimatePresence mode="wait">
                                {isAddFriendMode ? (
                                    <motion.div
                                        key="close-icon"
                                        initial={{ rotate: -90, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        exit={{ rotate: -90, scale: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="h-4 w-4" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="add-icon"
                                        initial={{ rotate: 90, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        exit={{ rotate: 90, scale: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <UserPlus className="h-4 w-4" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>

                    {/* Busca */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C4A3A]/50" />
                        <Input
                            placeholder="Buscar amigos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-[#F5F4ED] border-[#E8E6D4] focus-visible:ring-[#8B9A7E]"
                        />
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
                        <TabsList className="grid w-full grid-cols-2 bg-[#F5F4ED]">
                            <TabsTrigger value="all" className="data-[state=active]:bg-white">
                                Todos
                            </TabsTrigger>
                            <TabsTrigger value="pending" className="data-[state=active]:bg-white relative">
                                Pendentes
                                {counts > 0 && (
                                    <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                                        {counts}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>

                        {/* Amigos */}
                        <TabsContent value="all" className="mt-4">
                            <ScrollArea className="h-[300px] pr-4">
                                {filteredActiveFriends.length === 0 ? (
                                    <p className="text-center text-sm text-[#5C4A3A]/50 py-8">
                                        Nenhum amigo encontrado
                                    </p>
                                ) : (
                                    filteredActiveFriends.map((friend) => (
                                        <FriendItem
                                            key={friend.id}
                                            friend={friend}
                                            onRemove={() => removeFriend(friend.id)}
                                            onBlock={() => blockFriend(friend.id)}
                                        />
                                    ))
                                )}
                            </ScrollArea>
                        </TabsContent>

                        {/* Pendentes */}
                        <TabsContent value="pending" className="mt-4">
                            <ScrollArea className="h-[300px] pr-4">
                                {filteredPendingFriends.length === 0 ? (
                                    <p className="text-center text-sm text-[#5C4A3A]/50 py-8">
                                        Nenhuma solicitação pendente
                                    </p>
                                ) : (
                                    filteredPendingFriends.map((friend) => (
                                        <PendingFriendItem
                                            key={friend.friendship_id}
                                            friend={friend}
                                            onAccept={() => acceptFriend(friend.friendship_id)}
                                            onReject={() => rejectFriend(friend.friendship_id)}
                                        />
                                    ))
                                )}
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
