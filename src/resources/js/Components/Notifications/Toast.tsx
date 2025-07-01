import { useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { usePage, router } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";

interface FlashProps {
  success?: string;
  error?: string;
}

type Errors = Record<string, string>;

interface PageProps {
  flash: FlashProps;
  errors: Errors;
  [key: string]: any;
}

export default function Toast() {
  const { props } = usePage<PageProps>();
  const { flash, errors } = props;

  useEffect(() => {
    // 1. Exibir mensagem de sucesso
    if (flash?.success) {
      toast.success(flash.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });

      // Limpar a flash message após exibir
      router.reload({
        only: [], // Não recarregar nenhum dado específico
        // preserveState: true, // Manter o estado atual
        // preserveScroll: true, // Manter posição do scroll
        replace: true // Substituir entrada do histórico
      });
    }

    // 2. Exibir mensagens de erro
    if (errors && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errMsg) => {
        toast.error(errMsg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Flip,
        });
      });
    }

  }, [flash?.success, flash?.error, errors]);

  return <ToastContainer />;
}
