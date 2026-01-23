export function getInstallmentValue(
  amount?: number,
  count?: number
) {
  if (!amount || !count) return null

  return amount / count
}