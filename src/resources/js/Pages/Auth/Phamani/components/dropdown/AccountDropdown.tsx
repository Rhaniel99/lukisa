import * as Icons from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "@/Components/ui/dropdown-menu"
import { Account } from "@/Types/Phamani"

interface AccountDropdownProps {
  value: Account | null
  accounts: Account[]
  onChange: (account: Account) => void
  onCreate: () => void
}

export function AccountDropdown({
  value,
  accounts,
  onChange,
  onCreate,
}: AccountDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl flex items-center justify-between hover:border-[#6B4E3D] transition-colors"
        >
          {value ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8DCC4] flex items-center justify-center">
                <Icons.Wallet className="w-4 h-4 text-[#6B4E3D]" />
              </div>
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

      {/* 🔑 PORTAL (igual categoria) */}
      <DropdownMenuPortal>
        <DropdownMenuContent
          side="bottom"
          align="start"
          sideOffset={8}
          className="z-[9999] w-[var(--radix-dropdown-menu-trigger-width)] bg-[#F5EFE6] border border-[#E8DCC4] rounded-xl shadow-xl"
        >
          {accounts.map((acc) => (
            <DropdownMenuItem
              key={acc.id}
              onSelect={() => onChange(acc)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E8DCC4] flex items-center justify-center">
                <Icons.Wallet className="w-4 h-4 text-[#6B4E3D]" />
              </div>

              <span>{acc.name}</span>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={onCreate}
            className="text-[#6B4E3D] font-medium cursor-pointer"
          >
            + Criar nova conta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
