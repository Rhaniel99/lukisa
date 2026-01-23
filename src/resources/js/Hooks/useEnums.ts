import { usePage } from '@inertiajs/react'

type EnumOption = {
  value: string
  label: string
}

type Enums = {
  recurringFrequencies: EnumOption[]
}

export function useEnums(): Enums {
  const page = usePage()

  return (page.props.enums ?? {}) as Enums
}
