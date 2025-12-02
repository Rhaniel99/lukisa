import { toast } from "sonner";

export function useNotify() {
  return {
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
  };
}