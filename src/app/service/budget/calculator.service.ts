import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Budget, ExtendedBudget } from 'src/app/models/budget.model';
import { Transaction } from 'src/app/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetCalculatorService {

  constructor() { }

  calculateExtendedBudget(budgets$: Observable<Budget[]>, transactions: Observable<Transaction[]>, dateOfCalculation: string): ExtendedBudget[] {
    const result: ExtendedBudget[] = [];
    // TODO
    /** Calculate how much total money should be in the budget */
    // budgets$.pipe(take(1)).subscribe(budgets => {

    //   budgets.forEach(budget => {
    //     result.push({
    //       ...budget,
    //       moneyLeftInBudget: this.calculateTotalMoneyInBudget(budget, dateOfCalculation),
    //     });
    //   })
    // })

    // /** Remove all Transactions */
    // transactions.forEach(transaction => {
    //   const targetBudget = result.find(budget => budget.category === transaction.category)
    //   if (!targetBudget) {
    //     return;
    //   }
    //   targetBudget.moneyLeftInBudget = (parseFloat(targetBudget.moneyLeftInBudget) - parseFloat(transaction.price)).toString();
    // })

    return result;
  }

  private calculateTotalMoneyInBudget(budget: Budget, dateOfCalculation: string): string {
    const dateAdded = new Date(budget.dateAdded);
    const dateOfCalculationDate = new Date(dateOfCalculation);

    if (dateAdded > dateOfCalculationDate) {
      console.log('budget with category: ' + budget.category + ' was added to late')
      return '0';
    }
    return ((this.getMonthsDifference(dateAdded, dateOfCalculationDate) + 1) * parseFloat(budget.moneyPerMonth)).toString();
  }

  private getMonthsDifference(dateFrom: Date, dateTo: Date): number {
    return dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
  }
}
