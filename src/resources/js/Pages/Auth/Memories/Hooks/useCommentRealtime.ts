import { useState, useEffect } from "react";
import { Memory, Comment } from "@/Types/models";

export const useCommentRealtime = (memory: Memory | null) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [count, setCount] = useState<number>(0);

    // Efeito para inicializar e sincronizar o estado quando a 'memory' prop muda
    useEffect(() => {
        setComments(memory?.comments || []);
        setCount(memory?.comments_count ?? memory?.comments?.length ?? 0);
    }, [memory]);

    useEffect(() => {
        if (!memory) {
            return;
        }

        const channelName = `memories.${memory.id}`;

        window.Echo.private(channelName).listen(
            ".comment.posted",
            (event: { comment: Comment }) => {
                // Atualiza a lista E a contagem ao receber um novo comentário
                setComments((currentComments) => [
                    ...currentComments,
                    event.comment,
                ]);
                setCount((currentCount) => currentCount + 1);
            }
        );

        return () => {
            window.Echo.leave(channelName);
        };
    }, [memory?.id]);

    // Retorna um objeto com a lista e a contagem
    return { comments, count };
};
