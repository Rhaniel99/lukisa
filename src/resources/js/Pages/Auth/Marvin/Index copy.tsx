import React, { useState, useEffect, useRef } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps as BasePageProps } from '@/Types/models';
import { Form } from '@/Components/UI/Form';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { ScrollArea } from '@/Components/ui/scroll-area';

interface MarvinPageProps extends BasePageProps {
    marvin: {
        flash: {
            response?: string;
            error?: string;
        }
    }
}
interface ChatItem {
    id: number;
    user: string;
    marvin: string;
}

const Index: React.FC = () => {
    const { props } = usePage<MarvinPageProps>();

    const { data, setData, post, processing, errors, reset } = useForm({
        prompt: '',
    });

    const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const submit = () => {
        if (!data.prompt.trim()) return;

        const userPrompt: ChatItem = {
            id: Date.now(),
            user: data.prompt,
            marvin: 'Pensando...'
        };
        setChatHistory(currentHistory => [...currentHistory, userPrompt]);

        post(route('marvin.ask'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const newProps = page.props as unknown as MarvinPageProps;
                const response = newProps.marvin.flash.response;
                const error = newProps.marvin.flash.error;

                if (response || error) {
                    setChatHistory(currentHistory =>
                        currentHistory.map(chat =>
                            chat.id === userPrompt.id
                                ? { ...chat, marvin: response || (error as string) }
                                : chat
                        )
                    );
                }
                reset('prompt');
            },
            onError: () => {
                setChatHistory(currentHistory =>
                    currentHistory.map(chat =>
                        chat.id === userPrompt.id
                            ? { ...chat, marvin: "Desculpe, não consegui pensar agora." }
                            : chat
                    )
                );
            }
        });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white p-4">
            <Head title="Marvin Chat" />

            <h1 className="text-2xl font-bold mb-4 text-center">Converse com Marvin</h1>

            <ScrollArea className="flex-grow mb-4 p-4 bg-gray-900 rounded-lg">
                {chatHistory.map((chat) => (
                    <div key={chat.id} className="mb-4">
                        <p className="font-bold text-blue-400">Você:</p>
                        <p className="mb-2 whitespace-pre-wrap">{chat.user}</p>
                        <p className="font-bold text-green-400">Marvin:</p>
                        <p className="whitespace-pre-wrap">
                            {chat.marvin === 'Pensando...' ? (
                                <span className="animate-pulse">{chat.marvin}</span>
                            ) : (
                                chat.marvin
                            )}
                        </p>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </ScrollArea>

            <Form onSubmit={submit} className="flex">
                <Input
                    type="text"
                    value={data.prompt}
                    onChange={(e) => setData('prompt', e.target.value)}
                    placeholder="Faça uma pergunta trivial..."
                    className="flex-grow rounded-l-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={processing}
                />
                <Button
                    type="submit"
                    className="rounded-r-lg bg-blue-600 hover:bg-blue-700"
                    disabled={processing || !data.prompt.trim()}
                >
                    {processing ? 'Pensando...' : 'Enviar'}
                </Button>
            </Form>

            {errors.prompt && <p className="text-red-500 mt-2">{errors.prompt}</p>}
        </div>
    );
};

export default Index;
