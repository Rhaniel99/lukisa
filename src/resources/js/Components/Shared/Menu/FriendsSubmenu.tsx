import { DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import {
    Users,
    Search,
    UserPlus,
    Ban,
    Check,
    X,
    MoreVertical,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, usePage } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";
import { PageProps, PendingFriend } from "@/Types/models";

interface Friend {
    id: string;
    username: string;
    discriminator: string;
    avatar_url: string;
    status: "online" | "offline" | "pending";
}

interface FriendsSubmenuProps {
    pendingCount: number;
}

export function FriendsSubmenu({ pendingCount: initialPendingCount }: FriendsSubmenuProps) {
    // Pega as props que chegam via reload parcial
    const { props } = usePage<PageProps & { pending_friends: any, accepted_friends: any }>();

    // States para controlar o que já foi carregado
    const [pendingLoaded, setPendingLoaded] = useState(false);
    const [acceptedLoaded, setAcceptedLoaded] = useState(false);

    // States para armazenar os dados das listas
    const [activeFriends, setActiveFriends] = useState<Friend[]>([]);
    const [pendingFriends, setPendingFriends] = useState<PendingFriend[]>([]);
    const [pendingCount, setPendingCount] = useState(initialPendingCount);

    const [searchQuery, setSearchQuery] = useState("");
    const [isAddFriendMode, setIsAddFriendMode] = useState(false);
    useEffect(() => {
        if (props.pending_friends) {
            setPendingFriends(props.pending_friends);
            setPendingCount(props.pending_friends.length);
            setPendingLoaded(true);
        }
    }, [props.pending_friends]);

    useEffect(() => {
        if (props.accepted_friends) {
            setActiveFriends(props.accepted_friends);
            setAcceptedLoaded(true);
        }
    }, [props.accepted_friends]);


    // const [friends, setFriends] = useState<Friend[]>([
    //     {
    //         id: "1",
    //         username: "Alice",
    //         discriminator: "1234",
    //         avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    //         status: "online",
    //     },
    //     {
    //         id: "2",
    //         username: "Bob",
    //         discriminator: "5678",
    //         avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    //         status: "offline",
    //     },
    // ]);

    const filteredActiveFriends = activeFriends.filter(
        (friend) =>
            (friend.username
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                friend.discriminator.includes(searchQuery)) && friend.status !== 'pending'
    );

    const filteredPendingFriends = pendingFriends.filter(
        (friend) =>
            friend.username
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            friend.discriminator.includes(searchQuery)
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        tag: "",
    });

    const friendshipForm = useForm({});

    const handleAddFriendSubmit = () => {
        post(route("friends.store"), {
            onSuccess: () => {
                reset();
                setIsAddFriendMode(false);
            },
            preserveScroll: true,
        });
    };

    const handleAcceptFriend = (friendshipId: string) => {
        friendshipForm.patch(route("friends.accept", friendshipId), {
            preserveScroll: true,
        });
    };

    const handleRejectFriend = (friendshipId: string) => {
        friendshipForm.delete(route("friends.destroy", friendshipId), {
            preserveScroll: true,
        });
    };

    const handleBlockFriend = (friendId: string) => {
        setActiveFriends((prev) => prev.filter((f) => f.id !== friendId));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#5C4A3A] hover:bg-[#E8E6D4]/70 relative"
                >
                    <Users className="w-5 h-5" />
                    {pendingCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white">
                            {pendingCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-80 bg-white border-[#E8E6D4] shadow-lg p-0 data-[state=open]:animate-in data-[state=closed]:animate-out"
            >
                <div className="p-4 space-y-4">
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

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C4A3A]/50" />
                        <Input
                            placeholder="Buscar amigos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-[#F5F4ED] border-[#E8E6D4] focus-visible:ring-[#8B9A7E]"
                        />
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-[#F5F4ED]">
                            <TabsTrigger
                                value="all"
                                className="data-[state=active]:bg-white"
                            >
                                Todos
                            </TabsTrigger>
                            <TabsTrigger
                                value="pending"
                                className="data-[state=active]:bg-white relative"
                            >
                                Pendentes
                                {pendingCount > 0 && (
                                    <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                                        {pendingCount}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-4">
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-2">
                                    {filteredActiveFriends.length === 0 ? (
                                        <p className="text-center text-sm text-[#5C4A3A]/50 py-8">
                                            Nenhum amigo encontrado
                                        </p>
                                    ) : (
                                        filteredActiveFriends.map((friend) => (
                                            <FriendItem
                                                key={friend.id}
                                                friend={friend}
                                                onBlock={() =>
                                                    handleBlockFriend(friend.id)
                                                }
                                            />
                                        ))
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="pending" className="mt-4">
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-2">
                                    {filteredPendingFriends.length === 0 ? (
                                        <p className="text-center text-sm text-[#5C4A3A]/50 py-8">
                                            Nenhuma solicitação pendente
                                        </p>
                                    ) : (
                                        filteredPendingFriends.map((friend) => (
                                            <PendingFriendItem
                                                key={friend.friendship_id}
                                                friend={friend}
                                                onAccept={() =>
                                                    handleAcceptFriend(friend.friendship_id)
                                                }
                                                onReject={() =>
                                                    handleRejectFriend(friend.friendship_id)
                                                }
                                            />
                                        ))
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function FriendItem({ friend, onBlock }: { friend: Friend; onBlock: () => void }) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F4ED] transition-colors">
            <div className="relative">
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={friend.avatar_url || "/placeholder.svg"}
                        alt={friend.username}
                    />
                    <AvatarFallback className="bg-[#8B9A7E] text-white">
                        {friend.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${friend.status === "online"
                        ? "bg-green-500"
                        : "bg-gray-400"
                        }`}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#3A3A3A] truncate">
                    {friend.username}
                </p>
                <p className="text-xs text-[#5C4A3A]/50">#{friend.discriminator}</p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-[#5C4A3A] hover:bg-[#E8E6D4]"
                    >
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        onClick={onBlock}
                    >
                        <Ban className="mr-2 h-4 w-4" />
                        Bloquear
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function PendingFriendItem({
    friend,
    onAccept,
    onReject,
}: {
    friend: PendingFriend;
    onAccept: () => void;
    onReject: () => void;
}) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#F5F4ED]">
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={friend.avatar_url || "/placeholder.svg"}
                    alt={friend.username}
                />
                <AvatarFallback className="bg-[#8B9A7E] text-white">
                    {friend.username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#3A3A3A] truncate">
                    {friend.username}
                </p>
                <p className="text-xs text-[#5C4A3A]/50">#{friend.discriminator}</p>
            </div>
            <div className="flex gap-1">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                    onClick={onAccept}
                >
                    <Check className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={onReject}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
