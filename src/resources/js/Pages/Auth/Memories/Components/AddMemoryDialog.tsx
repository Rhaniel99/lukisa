import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from '@/Components/ui/dialog';
import CreateMemoryForm from './CreateMemoryForm';
import { LatLng } from 'leaflet';

interface AddMemoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    coordinates: LatLng;
}

const AddMemoryDialog: React.FC<AddMemoryDialogProps> = ({ isOpen, onClose, coordinates }) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogPortal>
                <DialogOverlay className="fixed inset-0 bg-black/50 z-[9999]" />
                <DialogContent className='fixed z-[9999] bg-white rounded-lg p-6 shadow-lg
                             top-1/2 left-1/2
                             transform -translate-x-1/2 -translate-y-1/2
                             max-w-lg w-full'>
                    <DialogHeader>
                        <DialogTitle>Adicionar uma nova memória</DialogTitle>
                    </DialogHeader>
                    <CreateMemoryForm
                        coordinates={coordinates}
                        onSuccess={onClose}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddMemoryDialog;
