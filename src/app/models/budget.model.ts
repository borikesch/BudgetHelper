export interface Budget {
    moneyPerMonth: string;
    category: string;
    dateAdded?: string;
}

export interface ExtendedBudget extends Budget {
    moneyLeftInBudget: string;
}