import { CategoryColorName } from '@/Lib/category/colors'
import { CategoryIconName } from '@/Lib/category/icons'
import { usePage } from '@inertiajs/react'

export type EnumOption<T extends string = string> = {
  value: T
  label: string
}

export type ColorOption<T extends string = string> = EnumOption<T> & {
  hex: string
}

type Enums = {
  recurringFrequencies: EnumOption[]
  categoryIcons: EnumOption<CategoryIconName>[]
  categoryColors: ColorOption<CategoryColorName>[]
}

export function useEnums(): Enums {
  const page = usePage()

  return (page.props.enums ?? {}) as Enums
}
