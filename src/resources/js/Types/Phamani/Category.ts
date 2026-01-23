import { CategoryIconName } from "@/Lib/category/icons"

export type Category = {
  id: string
  name: string
  color: string
  icon: CategoryIconName
  type: 'expense' | 'income' | 'both'
}