import { Account } from "./Account";
import { Category } from "./Category";

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: TransactionType;

  category_id: string;
  category?: Category;

  account_id: string;
  account?: Account;

  date: string;
  isInstallment?: boolean;
  installments?: {
    current: number;
    total: number;
  };
  isRecurring?: boolean;
  frequency?: string;
  status: 'paid' | 'pending';
}

export interface CreateTransaction {
  description: string
  amount: number
  type: TransactionType
  category_id: string
  account_id: string
  date: string

  // 🔽 novos campos
  is_installment?: boolean
  installments_count?: number

  is_recurring?: boolean
  frequency?: 'diario' | 'semanal' | 'mensal' | 'anual'
}


export interface TransactionFormData {
  description: string
  amount: number
  type: 'income' | 'expense'
  category_id: string
  account_id: string
  date: string

  // avançados
  is_installment: boolean
  installments_count: number
  is_recurring: boolean
  is_shared: boolean
  shared_participants: SharedParticipant[]
  frequency: 'diario' | 'semanal' | 'mensal' | 'anual'
  tags: { id?: string; name: string }[]
}

export interface SharedParticipant {
  name: string
  percentage: number
}
