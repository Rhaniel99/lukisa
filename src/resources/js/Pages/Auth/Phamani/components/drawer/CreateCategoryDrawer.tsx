import { Category } from '@/Types/Phamani';
import { X, Tag, Home, Car, Heart, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const icons = [
    { id: 'Tag', icon: Tag },
    { id: 'Home', icon: Home },
    { id: 'Car', icon: Car },
    { id: 'Heart', icon: Heart },
    { id: 'Briefcase', icon: Briefcase },
];

const colors = ['#6B4E3D', '#D4183D', '#1F5428', '#8B7355'];

export function CreateCategoryDrawer({
    isOpen,
    onClose,
    onCreate,
}: {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (category: {
        name: string;
        type: 'expense' | 'income' | 'both';
        color: string;
        icon: string;
    }) => void;
}) {
    const [name, setName] = useState('');
    const [type, setType] = useState<'expense' | 'income' | 'both'>('expense');
    const [color, setColor] = useState(colors[0]);
    const [icon, setIcon] = useState('tag');

    const handleCreate = () => {
        onCreate({ name, type, color, icon });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                    className="fixed top-0 left-0 z-[70] h-full w-full max-w-md bg-[#F5EFE6] border-r-2 border-[#E8DCC4] shadow-2xl p-8"
                >
                    <div className="flex justify-between mb-6">
                        <h2 className="text-xl font-bold text-[#3D2817]">Nova Categoria</h2>
                        <button onClick={onClose}>
                            <X />
                        </button>
                    </div>

                    <div className="space-y-5">
                        <input
                            placeholder="Nome da categoria"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-[#E8DCC4]"
                        />

                        {/* Tipo */}
                        <div className="flex gap-2">
                            {['expense', 'income', 'both'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t as any)}
                                    className={`flex-1 py-2 rounded-xl ${type === t ? 'bg-[#E8DCC4]' : 'bg-white'
                                        }`}
                                >
                                    {{
                                        expense: 'Despesa',
                                        income: 'Receita',
                                        both: 'Ambos'
                                    }[t]}

                                </button>
                            ))}
                        </div>

                        {/* Ícones */}
                        <div className="flex gap-3">
                            {icons.map(({ id, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setIcon(id)}
                                    className={`p-3 rounded-xl ${icon === id ? 'bg-[#E8DCC4]' : 'bg-white'
                                        }`}
                                >
                                    <Icon />
                                </button>
                            ))}
                        </div>

                        {/* Cores */}
                        <div className="flex gap-3">
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    style={{ backgroundColor: c }}
                                    className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-black' : 'border-transparent'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            disabled={!name}
                            onClick={handleCreate}
                            className="w-full py-4 bg-[#3D2817] text-[#F5EFE6] rounded-xl"
                        >
                            Criar categoria
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
