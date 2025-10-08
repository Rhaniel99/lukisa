import { DropdownMenuItem } from "@/Components/ui/dropdown-menu"
import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Users, Search, UserPlus, Ban, Check, X, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import { Badge } from "@/Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"

interface Friend {
  id: string
  username: string
  discriminator: string
  avatar_url: string
  status: "online" | "offline" | "pending"
}

interface FriendsSubmenuProps {
  pendingCount: number
  onPendingCountChange?: (count: number) => void
}

export function FriendsSubmenu({ pendingCount, onPendingCountChange }: FriendsSubmenuProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      username: "Alice",
      discriminator: "1234",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      status: "online",
    },
    {
      id: "2",
      username: "Bob",
      discriminator: "5678",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      status: "offline",
    },
    {
      id: "3",
      username: "Charlie",
      discriminator: "9012",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      status: "pending",
    },
    {
      id: "4",
      username: "Diana",
      discriminator: "3456",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
      status: "pending",
    },
    {
      id: "5",
      username: "Eve",
      discriminator: "7890",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
      status: "pending",
    },
  ])

  const filteredFriends = friends.filter(
    (friend) =>
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()) || friend.discriminator.includes(searchQuery),
  )

  const activeFriends = filteredFriends.filter((f) => f.status !== "pending")
  const pendingFriends = filteredFriends.filter((f) => f.status === "pending")

  const handleAcceptFriend = (friendId: string) => {
    setFriends((prev) => prev.map((f) => (f.id === friendId ? { ...f, status: "online" as const } : f)))
    if (onPendingCountChange) {
      onPendingCountChange(Math.max(0, pendingCount - 1))
    }
  }

  const handleRejectFriend = (friendId: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendId))
    if (onPendingCountChange) {
      onPendingCountChange(Math.max(0, pendingCount - 1))
    }
  }

  const handleBlockFriend = (friendId: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendId))
    if (friends.find((f) => f.id === friendId)?.status === "pending" && onPendingCountChange) {
      onPendingCountChange(Math.max(0, pendingCount - 1))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#5C4A3A] hover:bg-[#E8E6D4]/70 relative">
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
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#3A3A3A]">Amigos</h3>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-[#5C4A3A] hover:bg-[#E8E6D4]/70">
              <UserPlus className="h-4 w-4" />
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
              <TabsTrigger value="all" className="data-[state=active]:bg-white">
                Todos
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-white relative">
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
                  {activeFriends.length === 0 ? (
                    <p className="text-center text-sm text-[#5C4A3A]/50 py-8">Nenhum amigo encontrado</p>
                  ) : (
                    activeFriends.map((friend) => (
                      <FriendItem key={friend.id} friend={friend} onBlock={() => handleBlockFriend(friend.id)} />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {pendingFriends.length === 0 ? (
                    <p className="text-center text-sm text-[#5C4A3A]/50 py-8">Nenhuma solicitação pendente</p>
                  ) : (
                    pendingFriends.map((friend) => (
                      <PendingFriendItem
                        key={friend.id}
                        friend={friend}
                        onAccept={() => handleAcceptFriend(friend.id)}
                        onReject={() => handleRejectFriend(friend.id)}
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
  )
}

function FriendItem({ friend, onBlock }: { friend: Friend; onBlock: () => void }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F4ED] transition-colors">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={friend.avatar_url || "/placeholder.svg"} alt={friend.username} />
          <AvatarFallback className="bg-[#8B9A7E] text-white">{friend.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
            friend.status === "online" ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#3A3A3A] truncate">{friend.username}</p>
        <p className="text-xs text-[#5C4A3A]/50">#{friend.discriminator}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-[#5C4A3A] hover:bg-[#E8E6D4]">
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
  )
}

function PendingFriendItem({
  friend,
  onAccept,
  onReject,
}: {
  friend: Friend
  onAccept: () => void
  onReject: () => void
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-[#F5F4ED]">
      <Avatar className="h-10 w-10">
        <AvatarImage src={friend.avatar_url || "/placeholder.svg"} alt={friend.username} />
        <AvatarFallback className="bg-[#8B9A7E] text-white">{friend.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#3A3A3A] truncate">{friend.username}</p>
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
  )
}
