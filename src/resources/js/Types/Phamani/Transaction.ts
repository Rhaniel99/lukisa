export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  account: string;
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