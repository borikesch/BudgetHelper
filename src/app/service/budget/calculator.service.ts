import { Injectable } from '@angular/core';
import { Budget, ExtendedBudget } from 'src/app/models/budget.model';
import { Transaction } from 'src/app/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetCalculatorService {

  constructor() { }

  calculateExtendedBudget(budgets: Budget[], transactions: Transaction[]): ExtendedBudget[] {
    const result: ExtendedBudget[] = [];
    /** Calculate how much total money should be in the budget */

    /** Remove all Transactions */
    return result;
  }
}
