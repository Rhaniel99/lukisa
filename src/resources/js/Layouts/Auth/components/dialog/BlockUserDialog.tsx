import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

interface BlockUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export function BlockUserDialog({ isOpen, onClose, onConfirm, userName }: BlockUserDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#F5EFE6] border-2 border-[#E8DCC4] rounded-3xl max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#3D2817] text-xl font-bold">
            Bloquear {userName}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#6B4E3D]">
            Tem certeza que deseja bloquear este utilizador? Eles não poderão mais ver as suas memórias ou enviar mensagens.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 sm:gap-0">
          <AlertDialogCancel 
            onClick={onClose}
            className="bg-transparent border-2 border-[#6B4E3D] text-[#6B4E3D] hover:bg-[#E8DCC4] hover:text-[#3D2817] rounded-xl font-bold"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-[#3D2817] text-[#F5EFE6] hover:bg-[#2A1B0F] rounded-xl font-bold border-2 border-[#3D2817]"
          >
            Sim, Bloquear
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
