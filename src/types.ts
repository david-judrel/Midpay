export type PaymentChannel = 
  | 'MTN Mobile Money' 
  | 'Airtel Money' 
  | 'Visa Card' 
  | 'Mastercard' 
  | 'Bank Transfer';

export interface SimulatedTransaction {
  id: string;
  senderName: string;
  recipientName: string;
  amount: number; // in XAF, or converted
  currency: 'XAF' | 'USD' | 'EUR';
  channel: PaymentChannel;
  status: 'initiating' | 'routing' | 'clearing' | 'settled' | 'failed';
  timestamp: string;
  referenceNumber: string;
  fee: number;
}

export interface CustomCardConfig {
  holderName: string;
  color: 'black' | 'yellow' | 'silver';
  tier: 'Standard' | 'Infinity' | 'Black Gold';
  number: string;
  expiry: string;
  cvv: string;
  isLocked: boolean;
}
