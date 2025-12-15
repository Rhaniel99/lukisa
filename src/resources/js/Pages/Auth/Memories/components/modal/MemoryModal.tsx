import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LatLng } from 'leaflet';
import { MemoryForm } from '@/Pages/Auth/Memories/components/form/MemoryForm';
import { MemoryPreview } from './MemoryPreview';
import { useCreateMemoryForm } from '@/Pages/Auth/Memories/hooks/useCreateMemoryForm';
import { useAuth } from '@/Hooks/useAuth';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  coords: LatLng | null;
  placeMeta?: {
    name: string | null;
    address: string | null;
  } | null;
}

export function MemoryModal({
  isOpen,
  onClose,
  coords,
  placeMeta,
}: MemoryModalProps) {
  const { user } = useAuth();
  const authorName = user?.name || user?.username || 'Você';
  const authorAvatar = user?.avatar_url;

  const {
    form,
    imagePreview,
    handleImageUpload,
    submit,
  } = useCreateMemoryForm({
    isOpen,
    coords,
    placeMeta,
    onSuccess: onClose,
  });

  if (!coords) return null;


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <motion.div className="bg-[#F5EFE6] rounded-3xl flex max-w-4xl w-full relative">

            {/* ❌ Fechar */}
            <button onClick={onClose} className="absolute top-4 right-4">
              <X />
            </button>

            {/* 📝 Form */}
            <div className="flex-1 p-8 flex flex-col gap-6">
              <MemoryForm
                title={form.data.title}
                description={form.data.content} // <--- Ajuste aqui
                placeName={form.data.place_name}
                onTitleChange={(v) => form.setData('title', v)}
                onDescriptionChange={(v) => form.setData('content', v)} // <--- Ajuste aqui
                onPlaceNameChange={(v) => form.setData('place_name', v)}
                onImageChange={handleImageUpload}
              />

              <button
                onClick={submit}
                disabled={
                  form.processing ||
                  !form.data.title ||
                  !form.data.content
                }
                className="
                    mt-auto w-full py-4
                    bg-[#6B4E3D] text-[#F5EFE6]
                    rounded-xl shadow-lg
                    hover:bg-[#3D2817]
                    transition-colors font-medium
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
              >
                {form.processing ? 'Salvando...' : 'Salvar Memória'}
              </button>

            </div>

            {/* 👁️ Preview */}
            <MemoryPreview
              title={form.data.title}
              description={form.data.content}
              image={imagePreview}
              authorName={authorName}
              authorAvatar={authorAvatar}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
