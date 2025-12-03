import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useLayoutEffect,
} from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { Head, router, usePage, useForm } from "@inertiajs/react";
import { Message, MarvinPageProps, ConversationTurn } from "@/Types/marvin";
import { Form } from "@/Components/Shared/Form/Form";

export default function MarvinPage() {
    const { props } = usePage<MarvinPageProps>();

    // Todos os hooks sempre na mesma ordem
    const [turns, setTurns] = useState<ConversationTurn[]>(props.history.data);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(
        props.history.meta.next_page_url ?? null
    );
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

    // useForm sempre chamado na mesma posição
    const { data, setData, post, processing, errors, reset } = useForm({
        prompt: "",
    });

    // Todas as refs sempre na mesma ordem
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const topLoaderRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const previousScrollHeightRef = useRef(0);
    const isInitialMount = useRef(true);
    const lastTurnIdRef = useRef<string | number | null>(null);

    useEffect(() => {
        // Se a nova lista de props for diferente da que temos, atualiza.
        // Isto acontece após o POST, quando o Inertia recarrega as props da página 1.
        if (props.history.meta.current_page === 1) {
            setTurns(props.history.data);
        }
        setNextPageUrl(props.history.meta.next_page_url ?? null);
    }, [props.history]);

    const scrollToBottom = useCallback(
        (behavior: "smooth" | "auto" = "smooth") => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({
                    behavior,
                    block: "end",
                    inline: "nearest",
                });
            }
        },
        []
    );

    // Melhor detecção de novas mensagens
    const latestTurnId = turns.length > 0 ? turns[turns.length - 1].id : null;

    // Scroll para baixo quando há novas mensagens (não durante carregamento)
    useEffect(() => {
        if (
            !isLoadingMore &&
            latestTurnId &&
            lastTurnIdRef.current !== latestTurnId
        ) {
            lastTurnIdRef.current = latestTurnId;
            // Use um pequeno delay para garantir que o DOM foi atualizado
            requestAnimationFrame(() => {
                scrollToBottom("smooth");
            });
        }
    }, [latestTurnId, isLoadingMore, scrollToBottom]);

    // Scroll inicial - apenas uma vez
    useEffect(() => {
        if (!hasScrolledToBottom) {
            const timer = setTimeout(() => {
                scrollToBottom("auto");
                setHasScrolledToBottom(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [scrollToBottom, hasScrolledToBottom]);

    // Ajuste do scroll para conteúdo adicionado no topo
    useLayoutEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || !isLoadingMore) {
            return;
        }

        // Mantém a posição relativa após adicionar conteúdo no topo
        const newScrollHeight = scrollContainer.scrollHeight;
        const scrollDiff = newScrollHeight - previousScrollHeightRef.current;

        if (scrollDiff > 0) {
            scrollContainer.scrollTop += scrollDiff;
        }
    }, [turns, isLoadingMore]);

    const loadMoreTurns = useCallback(() => {
        if (!nextPageUrl || isLoadingMore) {
            return;
        }

        setIsLoadingMore(true);
        const scrollContainer = scrollContainerRef.current;

        // Armazena a altura atual do scroll antes de carregar novos dados
        if (scrollContainer) {
            previousScrollHeightRef.current = scrollContainer.scrollHeight;
        }

        router.get(
            nextPageUrl,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                only: ["history"],
                onSuccess: (page) => {
                    const newPageProps = page.props as unknown as Pick<
                        MarvinPageProps,
                        "history"
                    >;
                    const newTurns = newPageProps.history.data;

                    setTurns((prevTurns) => [...newTurns, ...prevTurns]);
                    setNextPageUrl(
                        newPageProps.history.meta.next_page_url ?? null
                    );
                    setIsLoadingMore(false);
                },
                onError: () => {
                    setIsLoadingMore(false);
                },
            }
        );
    }, [nextPageUrl, isLoadingMore]);

    // Intersection Observer para detectar scroll no topo
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (
                    entry.isIntersecting &&
                    !isInitialMount.current &&
                    !isLoadingMore
                ) {
                    loadMoreTurns();
                }
                isInitialMount.current = false;
            },
            {
                threshold: 0.1,
                rootMargin: "20px",
            }
        );

        const currentTopLoader = topLoaderRef.current;
        if (currentTopLoader) {
            observer.observe(currentTopLoader);
        }

        return () => {
            if (currentTopLoader) {
                observer.unobserve(currentTopLoader);
            }
        };
    }, [loadMoreTurns, isLoadingMore]);

    const submit = () => {
        if (!data.prompt.trim()) return;

        post(route("marvin.ask"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("prompt");
                // Força a limpeza manual do campo
                setData("prompt", "");
            },
        });
    };

    return (
        <div
            className="h-full flex flex-col"
            style={{ backgroundColor: "#D9D7C5" }}
        >
            <Head title="Marvin Chat" />
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth"
                    style={{
                        scrollBehavior: "smooth",
                        WebkitOverflowScrolling: "touch", // Para iOS
                    }}
                >
                    {/* Loader no topo */}
                    <div
                        ref={topLoaderRef}
                        className="flex justify-center py-4 min-h-[4rem]"
                    >
                        {isLoadingMore && (
                            <Loader2 className="w-6 h-6 animate-spin text-lukisa-sage" />
                        )}
                        {!nextPageUrl && turns.length > 0 && (
                            <p className="text-sm text-gray-500">
                                Início da conversa
                            </p>
                        )}
                    </div>

                    {/* Mensagens */}
                    {turns.map((turn) => (
                        <div key={`turn-${turn.id}`} className="space-y-4">
                            {/* Pergunta do usuário */}
                            <div className="flex justify-end">
                                <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                                    <Card
                                        className="border-0 shadow-md transition-all duration-200 hover:shadow-lg"
                                        style={{ backgroundColor: "#403E34" }}
                                    >
                                        <CardContent className="p-3">
                                            <p
                                                className="text-sm leading-relaxed"
                                                style={{ color: "#D9D7C5" }}
                                            >
                                                {turn.question.content}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Avatar className="w-8 h-8 mt-1 transition-transform duration-200 hover:scale-105">
                                        <AvatarImage
                                            src={
                                                props.auth.user.avatar_url || ""
                                            }
                                        />
                                        <AvatarFallback
                                            style={{
                                                backgroundColor: "#737065",
                                                color: "#D9D7C5",
                                            }}
                                        >
                                            <User className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>

                            {/* Resposta do Marvin */}
                            <div className="flex justify-start">
                                <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                                    <Avatar className="w-8 h-8 mt-1 transition-transform duration-200 hover:scale-105">
                                        <AvatarFallback
                                            style={{
                                                backgroundColor: "#403E34",
                                                color: "#D9D7C5",
                                            }}
                                        >
                                            <Bot className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <Card
                                        className="border-0 shadow-md transition-all duration-200 hover:shadow-lg"
                                        style={{ backgroundColor: "#BFBAA8" }}
                                    >
                                        <CardContent className="p-3">
                                            <p
                                                className="text-sm leading-relaxed"
                                                style={{ color: "#0D0000" }}
                                            >
                                                {turn.answer.content}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Indicador de digitação */}
                    {processing && (
                        <div className="flex justify-start animate-fadeIn">
                            <div className="flex items-start space-x-2">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarFallback
                                        style={{
                                            backgroundColor: "#403E34",
                                            color: "#D9D7C5",
                                        }}
                                    >
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <Card
                                    className="border-0 shadow-md"
                                    style={{ backgroundColor: "#BFBAA8" }}
                                >
                                    <CardContent className="p-3">
                                        <div className="flex space-x-1">
                                            <div
                                                className="w-2 h-2 rounded-full animate-bounce bg-gray-500"
                                                style={{
                                                    animationDelay: "-0.3s",
                                                }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 rounded-full animate-bounce bg-gray-500"
                                                style={{
                                                    animationDelay: "-0.15s",
                                                }}
                                            ></div>
                                            <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Área de input */}
                <div
                    className="p-6 border-t backdrop-blur-sm"
                    style={{
                        borderColor: "#737065",
                        backgroundColor: "#BFBAA8",
                    }}
                >
                    <Form onSubmit={submit} className="flex space-x-2">
                        <Input
                            value={data.prompt}
                            onChange={(e) => setData("prompt", e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 border-2 transition-all duration-200 focus:shadow-md"
                            style={{ borderColor: "#737065" }}
                            disabled={processing}
                            autoComplete="off"
                        />
                        <Button
                            type="submit"
                            disabled={!data.prompt.trim() || processing}
                            style={{
                                backgroundColor: "#403E34",
                                color: "#D9D7C5",
                            }}
                            className="hover:opacity-90 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                        >
                            {processing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
