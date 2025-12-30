import * as Icons from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "@/Components/ui/dropdown-menu"
import { Category } from "@/Types/Phamani"

interface CategoryDropdownProps {
  value: Category | null
  categories: Category[]
  onChange: (category: Category) => void
  onCreate: () => void
}

export function CategoryDropdown({
  value,
  categories,
  onChange,
  onCreate,
}: CategoryDropdownProps) {
  const SelectedIcon =
    value ? (Icons as any)[value.icon] ?? Icons.Tag : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl flex items-center justify-between hover:border-[#6B4E3D] transition-colors"
        >
          {value ? (
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: value.color }}
              >
                {SelectedIcon && (
                  <SelectedIcon className="w-4 h-4 text-white" />
                )}
              </span>
              <span className="text-[#3D2817]">{value.name}</span>
            </div>
          ) : (
            <span className="text-[#8B7355]">
              Selecione:
            </span>
          )}

          <Icons.ChevronDown className="w-4 h-4 text-[#8B7355]" />
        </button>
      </DropdownMenuTrigger>

      {/* 🔑 ISSO AQUI É O QUE RESOLVE */}
      <DropdownMenuPortal>
        <DropdownMenuContent
          side="bottom"
          align="start"
          sideOffset={8}
          className="z-[9999] w-[var(--radix-dropdown-menu-trigger-width)] bg-[#F5EFE6] border border-[#E8DCC4] rounded-xl shadow-xl"
        >
          {categories.map((cat) => {
            const CatIcon =
              (Icons as any)[cat.icon] ?? Icons.Tag

            return (
              <DropdownMenuItem
                key={cat.id}
                onSelect={() => onChange(cat)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: cat.color }}
                >
                  <CatIcon className="w-4 h-4 text-white" />
                </span>

                <span>{cat.name}</span>
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={onCreate}
            className="text-[#6B4E3D] font-medium cursor-pointer"
          >
            + Criar nova categoria
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
