import { useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { usePage } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";

interface FlashProps {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

type Errors = Record<string, string[]>;

export default function Toast() {
  const { props } = usePage<{ flash?: FlashProps; errors?: Errors }>();
  // valores padrão vazios caso não existam
  const flash  = props.flash  ?? {};
  const errors = props.errors ?? {};

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }

    // transforma Record<string,string[]> em lista de strings
    Object.values(errors).flat().forEach((errMsg) => {
      toast.error(errMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    });
  }, [flash.success, flash.error, flash.warning, flash.info, errors]);

  return <ToastContainer />;
}
