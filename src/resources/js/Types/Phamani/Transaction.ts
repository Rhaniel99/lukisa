import { Account } from "./Account";
import { Category } from "./Category";

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
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