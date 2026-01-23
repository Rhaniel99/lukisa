export function resolveEnumLabel<
  T extends { value: string; label: string }
>(
  list: T[],
  value?: string
) {
  if (!value) return null

  return list.find(item => item.value === value)?.label ?? value
}
