import { Category } from '@/Types/Phamani'
import { router, useForm } from '@inertiajs/react'

export type CreateCategory = Omit<Category, 'id'>

export function useCreateCategoryForm(onSuccess?: () => void) {
  const form = useForm<CreateCategory>({
    name: '',
    type: 'expense',
    color: '#3D2817',
    icon: 'tag',
  })

  function submit() {
    form.post(route('category.store'), {
      preserveScroll: true,
      onSuccess: () => {
        router.reload({ only: ['categories', 'accounts'] })
        form.reset()
        onSuccess?.()
      },
    })
  }

  return {
    form,
    submit,
  }
}