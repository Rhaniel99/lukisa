import { X } from 'lucide-react'
import { useCreateCategoryForm } from '@/Pages/Auth/Phamani/hooks/useCategories'
import { Label } from '@/Components/ui/label'
import { cn } from '@/Lib/Utils'
import { motion, AnimatePresence } from 'motion/react'
import { Form } from '@/Components/Shared/Form/Form'
import { useEnums } from '@/Hooks/useEnums'
import { CATEGORY_ICON_MAP } from '@/Lib/category/icons'

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
  const { form, submit } = useCreateCategoryForm(onClose)
  const { categoryIcons, categoryColors } = useEnums()


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
            <Form onSubmit={submit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <Label className="ml-1">Nome</Label>
                <input
                  placeholder="Ex: Supermercado"
                  value={form.data.name}
                  onChange={(e) => form.setData('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#E8DCC4] bg-white focus:border-[#3D2817] outline-none transition-colors"
                />
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label className="ml-1">Tipo</Label>
                <div className="flex gap-2 p-1 bg-[#E8DCC4]/50 rounded-xl">
                  {(['expense', 'income', 'both'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => form.setData('type', t)}
                      className={cn(
                        'flex-1 py-2 rounded-lg text-sm font-medium',
                        form.data.type === t
                          ? 'bg-white text-[#3D2817] shadow-sm'
                          : 'text-[#6B4E3D]'
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
                  {categoryIcons.map(icon => {
                    const IconComponent = CATEGORY_ICON_MAP[icon.value]
                    { IconComponent && <IconComponent className="w-5 h-5" /> }

                    return (
                      <button
                        type="button"
                        key={icon.value}
                        onClick={() => form.setData('icon', icon.value)}
                        className={cn(
                          'p-3 rounded-xl border-2 flex items-center justify-center transition-all',
                          form.data.icon === icon.value
                            ? 'border-[#3D2817] bg-white text-[#3D2817]'
                            : 'border-transparent bg-white/50 text-[#8B7355] hover:border-[#E8DCC4]'
                        )}
                      >
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Cores */}
              <div className="space-y-2">
                <Label className="ml-1">Cor</Label>
                <div className="flex flex-wrap gap-3">
                  {categoryColors.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => form.setData('color', color.value)}
                      style={{ backgroundColor: color.hex }}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all',
                        form.data.color === color.value
                          ? 'border-[#3D2817] scale-110 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      )}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>


              {/* Footer */}
              <div className="border-t border-[#E8DCC4] p-6 bg-[#FBF7F1]">
                <button
                  disabled={form.processing || !form.data.name}
                  type="submit"
                  className="w-full py-4 bg-[#3D2817] text-[#F5EFE6] rounded-xl font-bold text-lg hover:bg-[#2A1B0F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Criar categoria
                </button>
              </div>
            </Form>


          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
