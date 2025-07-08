import React, { useEffect } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/Types/models";

const Index: React.FC = () => {
    const { auth } = usePage<PageProps>().props;

    // useEffect(() => {
    //     // Escuta no canal 'canal-de-teste' pelo evento '.evento.teste'
    //     const channel = window.Echo.channel("canal-de-teste");

    //     channel.listen(".evento.teste", (data: { message: string }) => {
    //         console.log("Evento recebido do Reverb:", data);
    //         alert(data.message);
    //     });

    //     // Função de limpeza: para de escutar quando o componente é desmontado
    //     return () => {
    //         channel.stopListening(".evento.teste");
    //         window.Echo.leave("canal-de-teste");
    //     };
    // }, []); // O array vazio garante que o efeito rode apenas uma vez

    return (
        <>
            <Head title="Bem-vindo" />

            {/* Container principal para centralizar o conteúdo na tela */}
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    {/* Mensagem de boas-vindas */}
                    <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Bem-vindo usuário autenticado ao Lukisa:{" "}
                        {auth.user.name}
                    </h1>

                    <Button>
                        <Link href={route("memo.maps.index")}>
                            Ir para Maps
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Index;
