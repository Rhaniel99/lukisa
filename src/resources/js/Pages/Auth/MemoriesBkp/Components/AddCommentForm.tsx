import React from "react";
import { useForm } from "@inertiajs/react";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/Shared/Form/Form";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

interface AddCommentFormProps {
    memoryId: number;
    avatarUrl: string | null;
    userName: string;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = React.memo(
    ({ memoryId, avatarUrl, userName }) => {
        const { data, setData, post, processing, errors, reset } = useForm({
            content: "",
        });

        const submit = () => {
            if (processing || !data.content.trim()) return;

            post(route("memo.comments.store", memoryId), {
                preserveScroll: true,
                onSuccess: () => {
                    reset("content");
                },
            });
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
            }
        };

        return (
            <Form onSubmit={submit} className="flex w-full items-start space-x-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={avatarUrl || ""} />
                    <AvatarFallback>{userName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <Textarea
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Adicione um comentário..."
                        className="resize-none"
                        rows={1}
                        disabled={processing}
                    />
                    <div className="mt-2 flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing || !data.content.trim()}
                            size="sm"
                        >
                            {processing ? "Enviando..." : "Comentar"}
                        </Button>
                    </div>
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.content}
                        </p>
                    )}
                </div>
            </Form>
        );
    }
);
