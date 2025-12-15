// hooks/useCommentForm.ts
import { useForm } from '@inertiajs/react';
import { FormEvent, KeyboardEvent } from 'react';

export function useCommentForm(memoryId: number) {
    const { data, setData, post, processing, reset } = useForm({
        content: '',
    });

    const submit = (e?: FormEvent) => {
        e?.preventDefault();

        if (processing || !data.content.trim()) return;

        // Ao postar, o Inertia vai recarregar a página.
        // Como a URL atual já tem ?memory_id=X (por causa do handleMemoryClick),
        // o ViewModel vai rodar de novo, pegar os comentários atualizados e devolver em 'selectedMemoryDetails'.
        post(route('memo.comments.store', memoryId), {
            preserveScroll: true,
            preserveState: true, // Importante manter o estado do mapa
            onSuccess: () => {
                reset(); // Limpa o campo
            },
        });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    return {
        data,
        setData,
        submit,
        handleKeyDown,
        processing
    };
}