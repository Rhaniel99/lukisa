export const CATEGORY_COLOR_MAP = {
  brown:     '#3D2817',
  beige:     '#8B7355',

  red:       '#D4183D',
  green:     '#1F5428',
  blue:      '#2563EB',

  orange:    '#D97706',
  purple:    '#7C3AED',

  pink:      '#EC4899',
  teal:      '#14B8A6',
  indigo:    '#4F46E5',

  emerald:   '#047857',
  rose:      '#BE123C',

  slate:     '#334155',
  charcoal:  '#1F2937',

  amber:     '#B45309',
} as const

export type CategoryColorName = keyof typeof CATEGORY_COLOR_MAP
