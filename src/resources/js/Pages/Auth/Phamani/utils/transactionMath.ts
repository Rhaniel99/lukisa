import { SharedParticipant } from '@/Types/Phamani/Transaction'

function toCents(value: number) {
  return Math.round((Number(value) || 0) * 100)
}

function fromCents(cents: number) {
  return cents / 100
}

/**
 * Divide igualmente (você + participantes) em CENTAVOS.
 * A diferença (resto) fica com VOCÊ.
 */
export function splitSharedAmounts(total: number, participants: SharedParticipant[]) {
  const totalCents = toCents(total)
  const count = Math.max((participants?.length || 0) + 1, 1) // +1 você

  const base = Math.floor(totalCents / count)
  const remainder = totalCents - base * count

  const participantCents = base
  const userCents = base + remainder

  const participantAmount = fromCents(participantCents)
  const userAmount = fromCents(userCents)

  const participantPct = totalCents > 0 ? (participantCents / totalCents) * 100 : 0
  const userPct = totalCents > 0 ? (userCents / totalCents) * 100 : 0

  return {
    participantAmount,
    userAmount,
    participantPct,
    userPct,
  }
}

/**
 * Normaliza os participantes para exibir % igual.
 * (Percentual é derivado do split em centavos, então não "derrete".)
 */
export function normalizeEqualSplitParticipants(participants: SharedParticipant[]) {
  const safe = Array.isArray(participants) ? participants : []
  // clone profundo o suficiente (não mutar estado anterior)
  const cloned = safe.map(p => ({ ...p }))

  // Percentual por participante considerando a regra "diferença fica com você"
  // Como não temos o total aqui, usamos a regra "N+1 pessoas"
  const count = Math.max(cloned.length + 1, 1)
  const pct = 100 / count

  for (const p of cloned) p.percentage = pct

  return cloned
}

export function sumPercentages(participants: SharedParticipant[]) {
  return (participants || []).reduce((sum, p) => sum + (Number(p.percentage) || 0), 0)
}

/**
 * Valor real do usuário (à vista) - AGORA POR CENTAVOS
 */
export function getSharedUserAmount(total: number, participants: SharedParticipant[]) {
  return splitSharedAmounts(total, participants).userAmount
}

/**
 * Parcela original
 */
export function getInstallmentValue(total: number, count: number) {
  if (!total || !count) return 0
  return total / count
}

/**
 * Parcela do usuário após compartilhamento - POR CENTAVOS
 */
export function getSharedInstallmentValue(total: number, count: number, participants: SharedParticipant[]) {
  const userTotal = getSharedUserAmount(total, participants)
  if (!count) return 0
  return userTotal / count
}