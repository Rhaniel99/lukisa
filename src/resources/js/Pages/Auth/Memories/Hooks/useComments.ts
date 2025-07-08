import { useState, useEffect, useCallback } from "react";
import { router } from "@inertiajs/react";
import { Memory, Comment } from "@/Types/models";

type Props = {
    memory: Memory | null;
    initialComments?: Comment[];
    initialPage?: number;
    lastPage?: number;
};

export function useComments({
    memory,
    initialComments = [],
    initialPage = 1,
    lastPage = 1,
}: Props) {
    // Estados unificados
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(initialPage < lastPage);
    const [loading, setLoading] = useState(false);

    // Efeito para inicializar e sincronizar o estado quando a 'memory' prop muda
    useEffect(() => {
        if (memory) {
            setComments(memory.comments || initialComments);
            setCount(
                memory.comments_count ??
                    memory.comments?.length ??
                    initialComments.length
            );
        } else {
            setComments([]);
            setCount(0);
        }
    }, [memory, initialComments]);

    // Efeito para WebSocket real-time
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

    // Função para carregar mais comentários (paginação)
    const loadMore = useCallback(() => {
        if (!hasMore || loading || !memory) return;

        setLoading(true);

        router.reload({
            only: ["selectedMemoryDetails"],
            data: { memory_id: memory.id, comments_page: page + 1 },
            onSuccess: (pageProps) => {
                console.log("Resposta do Inertia:", pageProps);
                const props = pageProps.props as any;
                const detail = props.selectedMemoryDetails as any;

                // Mesclar novos comentários no fim
                setComments((old) => [...old, ...detail.comments]);
                setPage(detail.commentsCurrentPage);
                setHasMore(
                    detail.commentsCurrentPage < detail.commentsLastPage
                );
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            },
        });
    }, [hasMore, loading, page, memory]);

    // Função para adicionar comentário localmente (útil para otimistic updates)
    const addComment = useCallback((comment: Comment) => {
        setComments((current) => [...current, comment]);
        setCount((current) => current + 1);
    }, []);

    // Função para remover comentário localmente
    const removeComment = useCallback((commentId: number) => {
        setComments((current) => current.filter((c) => c.id !== commentId));
        setCount((current) => Math.max(0, current - 1));
    }, []);

    return {
        comments,
        count,
        loadMore,
        hasMore,
        loading,
        addComment,
        removeComment,
    };
}
