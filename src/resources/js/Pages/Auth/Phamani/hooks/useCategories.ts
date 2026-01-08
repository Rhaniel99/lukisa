import { Category } from '@/Types/Phamani'
import { useForm, router } from '@inertiajs/react'

export type CreateCategory = Omit<Category, 'id'>

function categoryDefaults(): CreateCategory {
  return {
    name: '',
    color: '#000000',
    icon: 'Tag',
    type: 'expense',
  }
}

export function useCategories() {
  const create = useCreateCategoryForm()

  return {
    create,
  }
}

function useCreateCategoryForm() {
  const form = useForm<CreateCategory>(categoryDefaults())

  function submit(payload: CreateCategory) {
    form.setData(payload)

    form.post(route('category.store'), {
      preserveScroll: true,
      onSuccess: () => {
        router.reload({
          only: ['categories'],
        })

        form.reset()
      },
    })
  }

  return {
    submit,

    processing: form.processing,
    errors: form.errors,
    recentlySuccessful: form.recentlySuccessful,

    reset: form.reset,
    clearErrors: form.clearErrors,
  }
}
