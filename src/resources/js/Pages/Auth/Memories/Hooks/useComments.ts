import { useState, useEffect, useCallback, useRef } from "react";
import { router } from "@inertiajs/react";
import { Memory, Comment } from "@/Types/models";

type Props = {
    memory: Memory | null;
};

export function useComments({ memory }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    // Ref para rastrear o ID da memória atualmente visível.
    // Isso é crucial para evitar race conditions.
    const currentMemoryIdRef = useRef<number | null>(null);

    // Efeito para inicializar ou limpar o estado quando a memória muda.
    useEffect(() => {
        if (memory) {
            const props = memory as any;
            const currentPage = props.comments_current_page || 1;
            const finalLastPage = props.comments_last_page || 1;

            setComments(props.comments || []);
            setCount(props.comments_count ?? props.comments?.length ?? 0);
            setPage(currentPage);
            setHasMore(currentPage < finalLastPage);

            // Atualiza a ref com o ID da memória atual
            currentMemoryIdRef.current = memory.id;
        } else {
            // Limpa o estado e a ref se o modal for fechado
            setComments([]);
            setCount(0);
            setPage(1);
            setHasMore(false);
            currentMemoryIdRef.current = null;
        }
    }, [memory]);

    // Efeito para WebSocket real-time
    useEffect(() => {
        if (!memory) {
            return;
        }

        const channelName = `memories.${memory.id}`;

        const handler = (event: { comment: Comment }) => {
            // Só atualiza se o comentário pertencer à memória atual
            if (currentMemoryIdRef.current === memory.id) {
                setComments((currentComments) => [
                    event.comment,
                    ...currentComments,
                ]);
                setCount((currentCount) => currentCount + 1);
            }
        };

        window.Echo.private(channelName).listen(".comment.posted", handler);

        return () => {
            window.Echo.leave(channelName);
        };
    }, [memory?.id]);

    // Função para carregar mais comentários (paginação)
    const loadMore = useCallback(() => {
        if (!hasMore || loading || !memory) return;

        setLoading(true);
        const memoryIdAtRequestTime = memory.id; // Captura o ID no momento da chamada

        router.reload({
            only: ["selectedMemoryDetails"],
            data: { memory_id: memoryIdAtRequestTime, comments_page: page + 1 },
            onSuccess: (pageProps) => {
                const props = pageProps.props as any;
                const detail = props.selectedMemoryDetails as any;

                // **A VERIFICAÇÃO CRÍTICA**
                // Só atualiza o estado se a resposta for da memória que ainda está aberta.
                if (detail && currentMemoryIdRef.current === detail.id) {
                    setComments((old) => [...old, ...detail.comments]);
                    setPage(detail.comments_current_page);
                    setHasMore(
                        detail.comments_current_page < detail.comments_last_page
                    );
                }
            },
            onFinish: () => {
                // Garante que o loading seja desativado independentemente do sucesso
                setLoading(false);
            },
        });
    }, [hasMore, loading, page, memory]);

    return {
        comments,
        count,
        loadMore,
        hasMore,
        loading,
    };
}