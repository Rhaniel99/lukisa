export type AccountType = 'cash' | 'checking' | 'credit'

export interface Account {
  id: string
  name: string
  type: AccountType

  /**
   * Campos opcionais (pensando no futuro)
   */
  balance?: number         
  created_at?: string
  updated_at?: string
}
