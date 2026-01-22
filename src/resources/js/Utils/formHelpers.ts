import { icons } from 'lucide-react'
import { LucideProps } from 'lucide-react'
import { ComponentType } from 'react'


export function submitOnEnter(
  e: React.KeyboardEvent<HTMLInputElement>,
  formRef: React.RefObject<HTMLInputElement>,
) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    formRef.current?.form?.requestSubmit();
  }
}

export function getLucideIcon(
  name?: string
): ComponentType<LucideProps> | null {
  if (!name) return null

  const icon = icons[name as keyof typeof icons]

  return icon ?? null
}
