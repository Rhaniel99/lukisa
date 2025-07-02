import React from "react";
import { useForm } from "@inertiajs/react";
import { Memory, PageProps } from "@/Types/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";

interface AddCommentFormProps {
    memory: Memory;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ memory }) => {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.content.trim()) return;

        // post(route("memories.comments.store", memory.id), {
        //     preserveScroll: true,
        //     onSuccess: () => reset("content"),
        // });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full items-start space-x-3"
        >
            <Avatar className="h-9 w-9">
                <AvatarImage src={auth.user.avatar || ""} />
                <AvatarFallback>{auth.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <Textarea
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="resize-none"
                    rows={1}
                />
                <div className="mt-2 flex justify-end">
                    <Button
                        type="submit"
                        disabled={processing || !data.content.trim()}
                        size="sm"
                    >
                        Comentar
                    </Button>
                </div>
                {errors.content && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.content}
                    </p>
                )}
            </div>
        </form>
    );
};
