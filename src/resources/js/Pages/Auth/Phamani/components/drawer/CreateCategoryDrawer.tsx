import { useState } from 'react'
import { Briefcase, Car, GraduationCap, Heart, Home, Plane, ShoppingBag, Tag, X, Zap } from 'lucide-react'
import { useCategories } from '@/Pages/Auth/Phamani/hooks/useCategories'
import { Label } from '@/Components/ui/label'
import { cn } from '@/Lib/Utils'
import { motion, AnimatePresence } from 'motion/react'

const ICONS = [
  { name: 'tag', icon: Tag },
  { name: 'home', icon: Home },
  { name: 'car', icon: Car },
  { name: 'heart', icon: Heart },
  { name: 'shopping-bag', icon: ShoppingBag },
  { name: 'zap', icon: Zap },
  { name: 'briefcase', icon: Briefcase },
  { name: 'graduation-cap', icon: GraduationCap },
  { name: 'plane', icon: Plane },
]

const COLORS = [
  '#3D2817',
  '#D4183D',
  '#1F5428',
  '#8B7355',
  '#1F2937',
  '#2563EB',
  '#D97706',
  '#7C3AED',
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function CreateCategoryDrawer({ isOpen, onClose }: Props) {
  const { create } = useCategories()

  const [name, setName] = useState('')
  const [type, setType] = useState<'expense' | 'income' | 'both'>('expense')
  const [color, setColor] = useState(COLORS[0])
  const [icon, setIcon] = useState('tag')

  function handleCreate() {
    create.submit({ name, type, color, icon })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay customizado que não interfere no Modal de baixo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-[#3D2817]/40 backdrop-blur-[2px] cursor-default"
          />

          {/* Painel Lateral (Drawer) */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-[90] h-full w-full max-w-[400px] border-r border-[#E8DCC4] bg-[#F5EFE6] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8DCC4] p-6">
              <h2 className="text-xl font-bold text-[#3D2817]">
                Nova Categoria
              </h2>
              <button
                onClick={onClose}
                className="text-[#6B4E3D] hover:text-[#3D2817] p-2 hover:bg-[#E8DCC4] rounded-xl transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <Label className="ml-1">Nome</Label>
                <input
                  placeholder="Ex: Supermercado"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#E8DCC4] bg-white focus:border-[#3D2817] outline-none transition-colors"
                />
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label className="ml-1">Tipo</Label>
                <div className="flex gap-2 p-1 bg-[#E8DCC4]/50 rounded-xl">
                  {(['expense', 'income', 'both'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={cn(
                        'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                        type === t
                          ? 'bg-white text-[#3D2817] shadow-sm'
                          : 'text-[#6B4E3D] hover:bg-white/50'
                      )}
                    >
                      {t === 'expense' ? 'Despesa' : t === 'income' ? 'Receita' : 'Ambos'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ícones */}
              <div className="space-y-2">
                <Label className="ml-1">Ícone</Label>
                <div className="grid grid-cols-5 gap-3">
                  {ICONS.map(({ name: iconName, icon: Icon }) => (
                    <button
                      key={iconName}
                      onClick={() => setIcon(iconName)}
                      className={cn(
                        'p-3 rounded-xl border-2 flex items-center justify-center transition-all',
                        icon === iconName
                          ? 'border-[#3D2817] bg-white text-[#3D2817]'
                          : 'border-transparent bg-white/50 text-[#8B7355] hover:border-[#E8DCC4]'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Cores */}
              <div className="space-y-2">
                <Label className="ml-1">Cor</Label>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      style={{ backgroundColor: c }}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all',
                        color === c ? 'border-[#3D2817] scale-110 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#E8DCC4] p-6 bg-[#FBF7F1]">
              <button
                disabled={!name}
                onClick={handleCreate}
                className="w-full py-4 bg-[#3D2817] text-[#F5EFE6] rounded-xl font-bold text-lg hover:bg-[#2A1B0F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Criar categoria
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
