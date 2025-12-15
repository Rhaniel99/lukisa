import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LatLng } from 'leaflet';
// import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  coords: LatLng | null;
  onSave: (data: { title: string; description: string }) => void;
  placeMeta?: {
    name: string | null;
    address: string | null;
  } | null;
}


export function MemoryModal({ isOpen, onClose, coords, placeMeta, onSave }: MemoryModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");


  const [image, setImage] = useState<string | null>(null);

  // Reset form when opening
useEffect(() => {
  if (isOpen) {
    setImage(null);

    // Preenche os dados do lugar (mas NÃO mexe no título/descrição da memória)
    setPlaceName(placeMeta?.name || "");
    setPlaceAddress(placeMeta?.address || "");

    // Reseta campos da memória
    setTitle("");
    setDescription("");
  }
}, [isOpen, placeMeta]);



  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSave = () => {
    onSave({ title, description });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#3D2817]/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#F5EFE6] rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative border-2 border-[#E8DCC4]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-[#6B4E3D] hover:text-[#3D2817] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Form Section */}
            <div className="flex-1 p-8 flex flex-col gap-6 bg-[#F5EFE6]">
              <h2 className="text-2xl font-bold text-[#3D2817]">Adicionar nova memória</h2>

              <div className="space-y-4">
                 <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#6B4E3D]">Local</label>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#E8DCC4]/30 border border-[#D4C5A9]">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#EFE6DA] border border-[#E8DCC4]">
                      <MapPin className="w-5 h-5 text-[#6B4E3D]" />
                    </div>

                    <input
                      type="text"
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      className="flex-1 bg-transparent text-[#3D2817] placeholder:text-[#A69580] focus:outline-none text-sm"
                      placeholder="Nome do local (ex: Teatro Municipal, Cafeteria X)"
                    />
                  </div>
                </div>

                {/* Endereço (somente leitura) */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#6B4E3D]">Endereço</label>

                  <div className="w-full px-4 py-3 rounded-lg bg-[#F7F3EE] border border-[#E8DCC4] text-[#6B4E3D] text-sm">
                    {placeAddress ? (
                      <div className="leading-tight whitespace-pre-wrap text-sm">{placeAddress}</div>
                    ) : (
                      <div className="text-xs text-[#A69580]">Endereço não disponível</div>
                    )}
                  </div>
                </div> */}

                <div>
                  <label className="block text-sm font-semibold text-[#6B4E3D] mb-2">Título</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: O melhor café da cidade"
                    className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] text-[#3D2817] placeholder:text-[#A69580]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6B4E3D] mb-2">Sua Memória</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva o que aconteceu..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] text-[#3D2817] placeholder:text-[#A69580] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6B4E3D] mb-2">Foto ou Áudio</label>
                  <div className="relative group">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#D4C5A9] rounded-xl cursor-pointer hover:bg-[#E8DCC4]/30 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-[#8B7355] mb-2" />
                        <p className="text-sm text-[#6B4E3D]">
                          <span className="font-semibold">Clique para enviar</span> ou arraste e solte
                        </p>
                      </div>
                      <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!title || !description}
                className="mt-auto w-full py-4 bg-[#6B4E3D] text-[#F5EFE6] rounded-xl hover:bg-[#3D2817] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Salvar Memória
              </button>
            </div>

            {/* Live Preview Section */}
            <div className="w-full md:w-80 bg-[#E8DCC4]/50 p-8 border-l border-[#D4C5A9] flex flex-col items-center justify-center">
              <p className="text-[#6B4E3D] text-sm font-bold mb-4 tracking-wide uppercase">Live Preview</p>

              {/* Card Preview */}
              <div className="w-full bg-white rounded-2xl overflow-hidden shadow-xl border border-[#E8DCC4] transform transition-all hover:-translate-y-1">
                <div className="h-40 bg-[#D4C5A9] relative">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#E8DCC4]">
                      <ImageIcon className="w-12 h-12 text-[#8B7355]/50" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-lg shadow-sm">
                    <MapPin className="w-4 h-4 text-[#6B4E3D]" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#6B4E3D] flex items-center justify-center">
                      <span className="text-[10px] text-white">P</span>
                    </div>
                    <span className="text-xs text-[#8B7355]">Polar</span>
                    <span className="text-xs text-[#D4C5A9]">• Agora</span>
                  </div>
                  <h3 className="font-bold text-[#3D2817] text-sm mb-1 line-clamp-1">
                    {title || "Título da Memória"}
                  </h3>
                  <p className="text-[#6B4E3D] text-xs line-clamp-2 leading-relaxed">
                    {description || "Sua descrição aparecerá aqui..."}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-[#8B7355]">
                É assim que sua memória aparecerá no mapa para seus amigos.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
