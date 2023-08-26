export interface Budget {
    moneyPerMonth: string;
    category: string;
    dateAdded: string;
    changes: Change[];
}

export interface ExtendedBudget extends Budget {
    moneyLeftInBudget: string;
}

export interface Change {

}