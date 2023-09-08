export interface Transaction {
    price: string;
    name: string;
    date: string;
    category: string;
    originBankaccountName?: string;
    targetBankaccountName?: string;
    transactionId: number;
}