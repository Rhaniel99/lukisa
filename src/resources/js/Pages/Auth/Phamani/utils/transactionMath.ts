import { SharedParticipant } from '@/Types/Phamani/Transaction'

/**
 * Valor real do usuário (à vista)
 */
export function getSharedUserAmount(
  total: number,
  participants: SharedParticipant[]
) {
  const sharedPercentage = participants.reduce(
    (sum, p) => sum + p.percentage,
    0
  )

  const sharedValue = total * (sharedPercentage / 100)

  return Math.max(total - sharedValue, 0)
}

/**
 * Valor da parcela original
 */
export function getInstallmentValue(
  total: number,
  count: number
) {
  if (!total || !count) return 0
  return total / count
}

/**
 * Valor da parcela após compartilhamento
 */
export function getSharedInstallmentValue(
  total: number,
  count: number,
  participants: SharedParticipant[]
) {
  const originalInstallment = getInstallmentValue(total, count)
  const userTotal = getSharedUserAmount(total, participants)

  return userTotal / count
}
