"use client";

import { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, MessageCircle, Plus, X, Send } from "lucide-react";
import type { LatLngExpression } from "leaflet";

// Dynamically import map components to avoid SSR issues
const MapContainer = lazy(
    () => import("react-leaflet").then((mod) => ({ default: mod.MapContainer }))
);
const TileLayer = lazy(
    () => import("react-leaflet").then((mod) => ({ default: mod.TileLayer }))
);
const Marker = lazy(
    () => import("react-leaflet").then((mod) => ({ default: mod.Marker }))
);
const Popup = lazy(
    () => import("react-leaflet").then((mod) => ({ default: mod.Popup }))
);

interface Memory {
    id: string;
    lat: number;
    lng: number;
    title: string;
    story: string;
    author: string;
    authorAvatar?: string;
    category: "memory" | "story" | "tip";
    likes: number;
    comments: Comment[];
    createdAt: string;
    isLiked: boolean;
}

interface Comment {
    id: string;
    author: string;
    authorAvatar?: string;
    text: string;
    createdAt: string;
}

const sampleMemories: Memory[] = [
    {
        id: "1",
        lat: 40.7128,
        lng: -74.006,
        title: "First Date Spot",
        story: "This is where I had my first date with my now-husband. The little café used to have the most amazing chocolate croissants!",
        author: "Sarah M.",
        authorAvatar: "/placeholder.svg?height=32&width=32",
        category: "memory",
        likes: 12,
        comments: [
            {
                id: "c1",
                author: "Mike R.",
                text: "Such a sweet story! 💕",
                createdAt: "2024-01-15",
            },
        ],
        createdAt: "2024-01-10",
        isLiked: false,
    },
    {
        id: "2",
        lat: 40.7589,
        lng: -73.9851,
        title: "Hidden Gem Restaurant",
        story: "Best kept secret in the city! Try their weekend brunch - the pancakes are incredible and there's never a wait.",
        author: "Alex K.",
        category: "tip",
        likes: 8,
        comments: [],
        createdAt: "2024-01-12",
        isLiked: true,
    },
];

export function Maps() {
    const [memories, setMemories] = useState<Memory[]>(sampleMemories);
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
    const [isAddingMemory, setIsAddingMemory] = useState(false);
    const [newMemory, setNewMemory] = useState({
        title: "",
        story: "",
        category: "memory" as const,
        lat: 40.7128,
        lng: -74.006,
    });
    const [newComment, setNewComment] = useState("");
    const [mapCenter] = useState<LatLngExpression>([40.7128, -74.006]);

    const handleAddMemory = () => {
        if (newMemory.title && newMemory.story) {
            const memory: Memory = {
                id: Date.now().toString(),
                ...newMemory,
                author: "You",
                likes: 0,
                comments: [],
                createdAt: new Date().toISOString().split("T")[0],
                isLiked: false,
            };
            setMemories([...memories, memory]);
            setNewMemory({
                title: "",
                story: "",
                category: "memory",
                lat: 40.7128,
                lng: -74.006,
            });
            setIsAddingMemory(false);
        }
    };

    const handleLike = (memoryId: string) => {
        setMemories(
            memories.map((memory) =>
                memory.id === memoryId
                    ? {
                          ...memory,
                          likes: memory.isLiked
                              ? memory.likes - 1
                              : memory.likes + 1,
                          isLiked: !memory.isLiked,
                      }
                    : memory
            )
        );
    };

    const handleAddComment = (memoryId: string) => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: Date.now().toString(),
                author: "You",
                text: newComment,
                createdAt: new Date().toISOString().split("T")[0],
            };

            setMemories(
                memories.map((memory) =>
                    memory.id === memoryId
                        ? { ...memory, comments: [...memory.comments, comment] }
                        : memory
                )
            );
            setNewComment("");
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "memory":
                return "bg-lukisa-sage";
            case "story":
                return "bg-lukisa-brown";
            case "tip":
                return "bg-lukisa-cream text-lukisa-dark";
            default:
                return "bg-lukisa-sage";
        }
    };

    return (
        <div className="h-screen flex">
            {/* Map Section */}
            <div className="flex-1 relative">
                <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {memories.map((memory) => (
                        <Marker
                            key={memory.id}
                            position={[memory.lat, memory.lng]}
                            eventHandlers={{
                                click: () => setSelectedMemory(memory),
                            }}
                        >
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-semibold text-lukisa-dark">
                                        {memory.title}
                                    </h3>
                                    <p className="text-sm text-lukisa-brown mt-1">
                                        {memory.story.substring(0, 100)}...
                                    </p>
                                    <Badge
                                        className={`mt-2 ${getCategoryColor(
                                            memory.category
                                        )}`}
                                    >
                                        {memory.category}
                                    </Badge>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Add Memory Button */}
                <Button
                    onClick={() => setIsAddingMemory(true)}
                    className="absolute bottom-6 right-6 z-10 bg-lukisa-sage hover:bg-lukisa-brown text-white rounded-full w-14 h-14 shadow-lg"
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </div>

            {/* Sidebar */}
            <div className="w-96 bg-white/90 backdrop-blur-sm border-l border-lukisa-cream overflow-y-auto">
                {selectedMemory ? (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-lukisa-dark">
                                Memory Details
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedMemory(null)}
                                className="text-lukisa-brown hover:text-lukisa-dark"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <Card className="bg-white/60 border-lukisa-cream">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage
                                            src={
                                                selectedMemory.authorAvatar ||
                                                "/placeholder.svg"
                                            }
                                        />
                                        <AvatarFallback className="bg-lukisa-light text-lukisa-dark text-xs">
                                            {selectedMemory.author.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-lukisa-dark">
                                            {selectedMemory.author}
                                        </p>
                                        <p className="text-xs text-lukisa-brown">
                                            {selectedMemory.createdAt}
                                        </p>
                                    </div>
                                </div>
                                <CardTitle className="text-lg text-lukisa-dark">
                                    {selectedMemory.title}
                                </CardTitle>
                                <Badge
                                    className={`w-fit ${getCategoryColor(
                                        selectedMemory.category
                                    )}`}
                                >
                                    {selectedMemory.category}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-lukisa-brown">
                                    {selectedMemory.story}
                                </p>

                                <div className="flex items-center space-x-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            handleLike(selectedMemory.id)
                                        }
                                        className={`text-lukisa-brown hover:text-lukisa-dark ${
                                            selectedMemory.isLiked
                                                ? "text-red-500"
                                                : ""
                                        }`}
                                    >
                                        <Heart
                                            className={`w-4 h-4 mr-1 ${
                                                selectedMemory.isLiked
                                                    ? "fill-current"
                                                    : ""
                                            }`}
                                        />
                                        {selectedMemory.likes}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-lukisa-brown hover:text-lukisa-dark"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        {selectedMemory.comments.length}
                                    </Button>
                                </div>

                                {/* Comments */}
                                <div className="space-y-3">
                                    {selectedMemory.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="bg-lukisa-light/50 rounded-lg p-3"
                                        >
                                            <div className="flex items-center space-x-2 mb-1">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage
                                                        src={
                                                            comment.authorAvatar ||
                                                            "/placeholder.svg"
                                                        }
                                                    />
                                                    <AvatarFallback className="bg-lukisa-cream text-lukisa-dark text-xs">
                                                        {comment.author.charAt(
                                                            0
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium text-lukisa-dark">
                                                    {comment.author}
                                                </span>
                                                <span className="text-xs text-lukisa-brown">
                                                    {comment.createdAt}
                                                </span>
                                            </div>
                                            <p className="text-sm text-lukisa-brown">
                                                {comment.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Comment */}
                                <div className="flex space-x-2">
                                    <Input
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={(e) =>
                                            setNewComment(e.target.value)
                                        }
                                        className="border-lukisa-cream focus:border-lukisa-sage"
                                        onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            handleAddComment(selectedMemory.id)
                                        }
                                    />
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            handleAddComment(selectedMemory.id)
                                        }
                                        className="bg-lukisa-sage hover:bg-lukisa-brown text-white"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-lukisa-dark mb-4">
                            City Memories
                        </h2>
                        <p className="text-lukisa-brown mb-6">
                            Click on map pins to explore memories, stories, and
                            tips shared by the community.
                        </p>

                        <div className="space-y-4">
                            {memories.map((memory) => (
                                <Card
                                    key={memory.id}
                                    className="bg-white/60 border-lukisa-cream cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => setSelectedMemory(memory)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-lukisa-sage mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-lukisa-dark">
                                                    {memory.title}
                                                </h3>
                                                <p className="text-sm text-lukisa-brown mt-1">
                                                    {memory.story.substring(
                                                        0,
                                                        80
                                                    )}
                                                    ...
                                                </p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <Badge
                                                        className={`${getCategoryColor(
                                                            memory.category
                                                        )} text-xs`}
                                                    >
                                                        {memory.category}
                                                    </Badge>
                                                    <div className="flex items-center space-x-2 text-xs text-lukisa-brown">
                                                        <span className="flex items-center">
                                                            <Heart className="w-3 h-3 mr-1" />
                                                            {memory.likes}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <MessageCircle className="w-3 h-3 mr-1" />
                                                            {
                                                                memory.comments
                                                                    .length
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Add Memory Modal */}
            {isAddingMemory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4 bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lukisa-dark">
                                    Add New Memory
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsAddingMemory(false)}
                                    className="text-lukisa-brown hover:text-lukisa-dark"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-lukisa-dark">
                                    Title
                                </label>
                                <Input
                                    placeholder="Give your memory a title..."
                                    value={newMemory.title}
                                    onChange={(e) =>
                                        setNewMemory({
                                            ...newMemory,
                                            title: e.target.value,
                                        })
                                    }
                                    className="border-lukisa-cream focus:border-lukisa-sage"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-lukisa-dark">
                                    Category
                                </label>
                                <select
                                    value={newMemory.category}
                                    onChange={(e) =>
                                        setNewMemory({
                                            ...newMemory,
                                            category: e.target.value as any,
                                        })
                                    }
                                    className="w-full mt-1 p-2 border border-lukisa-cream rounded-md focus:border-lukisa-sage focus:outline-none"
                                >
                                    <option value="memory">Memory</option>
                                    <option value="story">Story</option>
                                    <option value="tip">Tip</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-lukisa-dark">
                                    Your Story
                                </label>
                                <Textarea
                                    placeholder="Share your memory, story, or tip..."
                                    value={newMemory.story}
                                    onChange={(e) =>
                                        setNewMemory({
                                            ...newMemory,
                                            story: e.target.value,
                                        })
                                    }
                                    className="border-lukisa-cream focus:border-lukisa-sage min-h-[100px]"
                                />
                            </div>

                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddingMemory(false)}
                                    className="flex-1 border-lukisa-cream text-lukisa-brown hover:bg-lukisa-light"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAddMemory}
                                    className="flex-1 bg-lukisa-sage hover:bg-lukisa-brown text-white"
                                >
                                    Add Memory
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
