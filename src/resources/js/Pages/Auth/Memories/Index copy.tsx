import { useState, useRef } from 'react';
import { Search, Plus, Minus, Locate, ArrowLeft, Map as MapIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { MapPin } from './components/MapPin';
import { MemoryModal } from './components/modal/MemoryModal';
import { MemoryDrawer } from './components/MemoryDrawer';
import { MemoryDetailsModal } from './components/modal/MemoryDetailsModal';
import { Head } from '@inertiajs/react';


export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  const [selectedMemory, setSelectedMemory] = useState<any>(null);

  // Mock Pins
  const pins = [
    { id: 1, x: 400, y: 300, label: "Centro Histórico" },
    { id: 2, x: 800, y: 500, label: "Café da Praça" },
    { id: 3, x: 600, y: 700, label: "Parque Central" },
  ];

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  const handleMapClick = (e: React.MouseEvent) => {
    // Only open modal if clicking directly on the map (not pins)
    // In a real app, we'd calculate the coordinates relative to the map
    setIsModalOpen(true);
  };

  const handlePinClick = (label: string) => {
    setSelectedLocation(label);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Head title="Memories Maps" />

      <div className="relative w-full h-screen bg-[#E8DCC4] overflow-hidden font-sans">

        {/* UI Overlay - Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 p-6 pointer-events-none flex justify-between items-start">
          {/* Search Bar (Centered) */}
          <div className="pointer-events-auto flex-1 max-w-xl mx-auto shadow-xl">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar endereço, bairro ou memória..."
                className="w-full pl-12 pr-4 py-4 bg-[#F5EFE6]/95 backdrop-blur-md border-2 border-[#D4C5A9] rounded-2xl focus:outline-none focus:border-[#6B4E3D] shadow-sm text-[#3D2817] placeholder:text-[#A69580] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355] group-hover:text-[#6B4E3D] transition-colors" />
            </div>
          </div>

          {/* Back Button */}
          <button
            // onClick={onBack}
            className="pointer-events-auto ml-4 p-4 bg-[#F5EFE6]/95 backdrop-blur-md border-2 border-[#D4C5A9] rounded-2xl text-[#6B4E3D] hover:bg-[#3D2817] hover:text-[#F5EFE6] transition-colors shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* UI Overlay - Zoom Controls */}
        <div className="absolute bottom-8 left-8 z-30 flex flex-col gap-3 pointer-events-auto">
          <div className="bg-[#F5EFE6]/95 backdrop-blur-md border-2 border-[#D4C5A9] rounded-2xl shadow-xl overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="p-4 hover:bg-[#E8DCC4] text-[#6B4E3D] transition-colors border-b border-[#D4C5A9] flex items-center justify-center w-full"
            >
              <Plus className="w-6 h-6" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-4 hover:bg-[#E8DCC4] text-[#6B4E3D] transition-colors flex items-center justify-center w-full"
            >
              <Minus className="w-6 h-6" />
            </button>
          </div>

          <button className="p-4 bg-[#6B4E3D] text-[#F5EFE6] rounded-2xl shadow-xl hover:bg-[#3D2817] transition-colors">
            <Locate className="w-6 h-6" />
          </button>
        </div>

        {/* Draggable Map Container */}
        <motion.div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing bg-[#C9B59A]"
        >
          <motion.div
            drag
            dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
            style={{ scale }}
            className="relative w-[2000px] h-[2000px] origin-top-left"
            onClick={handleMapClick}
          >
            {/* Map Background Image */}
            <img
              src="https://images.unsplash.com/photo-1511526088318-f1a6d7646a05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGx1c3RyYXRlZCUyMG1hcCUyMHRleHR1cmUlMjB2aW50YWdlfGVufDF8fHx8MTc2NDM0MTg5OHww&ixlib=rb-4.1.0&q=80&w=2000"
              alt="Map"
              className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale-[0.2] sepia-[0.3]"
            />

            {/* Grid Overlay for better "Map" feel */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'linear-gradient(#3D2817 1px, transparent 1px), linear-gradient(90deg, #3D2817 1px, transparent 1px)',
                backgroundSize: '100px 100px'
              }}
            ></div>

            {/* Pins */}
            {pins.map(pin => (
              <MapPin
                key={pin.id}
                x={pin.x}
                y={pin.y}
                label={pin.label}
                onClick={() => handlePinClick(pin.label)}
              />
            ))}

            {/* Instruction Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
              <div className="flex flex-col items-center gap-2">
                <MapIcon className="w-24 h-24 text-[#3D2817]" />
                <p className="text-[#3D2817] font-bold text-2xl tracking-widest uppercase">Explorar</p>
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* Modal */}
        <MemoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(memory) => console.log('Memory saved:', memory)}
        />

        {/* Drawer */}
        <MemoryDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          locationName={selectedLocation}
          onAddMemory={() => {
            setIsDrawerOpen(false);
            setIsModalOpen(true);
          }}
          onMemoryClick={(memory) => {
            setSelectedMemory(memory);
          }}
        />

        {/* Memory Details Modal */}
        <MemoryDetailsModal
          isOpen={!!selectedMemory}
          onClose={() => setSelectedMemory(null)}
          memory={selectedMemory}
        />
      </div>

    </>

  );
}
