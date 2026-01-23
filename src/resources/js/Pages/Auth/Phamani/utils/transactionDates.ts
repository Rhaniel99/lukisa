export function getNextTransactionDate(data: {
  date?: string
  is_installment?: boolean
  is_recurring?: boolean
  frequency?: string
}) {
  if (!data.date) return null

  const base = new Date(data.date)
  const next = new Date(base)

  if (data.is_installment) {
    next.setMonth(base.getMonth() + 1)
  }

  if (data.is_recurring) {
    switch (data.frequency) {
      case 'daily':
        next.setDate(base.getDate() + 1)
        break
      case 'weekly':
        next.setDate(base.getDate() + 7)
        break
      case 'monthly':
        next.setMonth(base.getMonth() + 1)
        break
      case 'yearly':
        next.setFullYear(base.getFullYear() + 1)
        break
    }
  }

  return next.toLocaleDateString('pt-BR')
}
