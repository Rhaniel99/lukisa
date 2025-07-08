import React from "react";
import { useForm } from "@inertiajs/react";
import { Memory, PageProps } from "@/Types/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { usePage } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";

interface AddCommentFormProps {
    memory: Memory;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ memory }) => {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
    });

    const submit = () => {
        post(route("memo.comments.store", memory.id), {
            preserveScroll: true, // Mantém a posição do scroll na página
            onSuccess: () => {
                reset("content"); // Limpa o campo de texto após o sucesso
            },
        });
    };

    return (
        <Form onSubmit={submit} className="flex w-full items-start space-x-3">
            <Avatar className="h-9 w-9">
                <AvatarImage src={auth.user.avatar_url || ""} />
                <AvatarFallback>{auth.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <Textarea
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="resize-none"
                    rows={1}
                    disabled={processing} // Desabilita o textarea durante o envio
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
};
