import { router, useForm } from '@inertiajs/react'
import { TransactionFormData } from '@/Types/Phamani/Transaction'

export function useTransactionsForm(onSuccess?: () => void) {
  const form = useForm<TransactionFormData>({
    description: '',
    amount: 0,
    type: 'expense',
    category_id: '',
    account_id: '',
    date: new Date().toISOString().split('T')[0],

    // 🔽 novos
    is_installment: false,
    installments_count: 2,
    is_recurring: false,
    frequency: 'mensal',
  })

  function submit() {
    form.post(route('transaction.store'), {
      preserveScroll: true,
      onSuccess: () => {
        router.reload({ only: ['kpis', 'cashFlow', 'categoryPie'] })
        form.reset()
        onSuccess?.()
      },
    })
  }

  return { form, submit }
}
