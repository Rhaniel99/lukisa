export interface Installment {
  number: number;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'future';
}