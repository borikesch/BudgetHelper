import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { bankaccountsCookieName, budgetsCookieName, transactionsCookieName } from './data.const';
import { Transaction } from '../../models/transaction.model';
import { Budget } from '../../models/budget.model';
import { Bankaccount } from 'src/app/models/bankaccount.model';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  transactions$ = new BehaviorSubject<Transaction[]>([]);
  budgets$ = new BehaviorSubject<Budget[]>([]);
  bankaccounts$ = new BehaviorSubject<Bankaccount[]>([]);

  constructor(private cookieService: CookieService) {
    this.initialize();
  }

  resetCookies(): void {
    this.cookieService.delete(transactionsCookieName);
    this.cookieService.delete(budgetsCookieName);
    this.cookieService.delete(bankaccountsCookieName);
    this.initialize();
  }

  initialize(): void {
    this.getTransactionsFromCookie();
    this.getBankaccountsFromCookie();
    this.getBudgetsFromCookie();
  }

  addTransaction(transaction: Transaction): void {
    this.transactions$.pipe(take(1)).subscribe(transactions => {
      transactions.push(transaction);
      this.setTransactions(transactions);
      // Transactie naar een andere bank toe
      if (transaction.originBankaccountName) {
        this.modifyBankaccount(transaction.price, transaction.originBankaccountName);
        this.modifyBudget(transaction.price, transaction.category);
      }
      /**
       * Transactie naar eigen bankrekening
       * Kan ontstaan door inkomsten of door geld wat je tussen banken overmaakt
       * Als het intern is, niks doen voor budgetten
       * Als het niet intern is, geld evenredig verdelen over budgetten
       */
      if (transaction.targetBankaccountName) {
        this.modifyBankaccount('-' + transaction.price, transaction.targetBankaccountName);
        if (!transaction.originBankaccountName) {
          this.shareIncomeOverBudgets(transaction.price);
        }
      }
    });
  }

  deleteTransaction(transaction: Transaction): void {
    this.transactions$.pipe(take(1)).subscribe(transactions => {
      const newTransactions = transactions.filter(t => t.category !== transaction.category || t.date !== transaction.date || t.name !== transaction.name || t.price !== transaction.price);
      this.setTransactions(newTransactions);
      if (transaction.originBankaccountName) {
        this.modifyBankaccount('-' + transaction.price, transaction.originBankaccountName);
        this.modifyBudget('-' + transaction.price, transaction.category);
      }
      /**
       * Transactie naar eigen bankrekening
       * Kan ontstaan door inkomsten of door geld wat je tussen banken overmaakt
       * Als het intern is, niks doen voor budgetten
       * Als het niet intern is, geld evenredig verdelen over budgetten
       */
      if (transaction.targetBankaccountName) {
        this.modifyBankaccount(transaction.price, transaction.targetBankaccountName);
        if (!transaction.originBankaccountName) {
          this.shareIncomeOverBudgets('-' + transaction.price);
        }
      }
    });
  }

  addBudget(budget: Budget): void {
    this.budgets$.pipe(take(1)).subscribe(budgets => {
      budgets.push(budget);
      this.setBudgets(budgets);
    });
  }

  deleteBudget(budget: Budget): void {
    this.budgets$.pipe(take(1)).subscribe(budgets => {
      const newBudgets = budgets.filter(b => b.category !== budget.category);
      this.setBudgets(newBudgets);
    });
  }

  addBankaccount(bankaccount: Bankaccount): void {
    this.bankaccounts$.pipe(take(1)).subscribe(bankaccounts => {
      bankaccounts.push(bankaccount);
      this.setBankaccounts(bankaccounts);
    });
  }

  deleteBankaccount(bankaccount: Bankaccount): void {
    this.bankaccounts$.pipe(take(1)).subscribe(bankaccounts => {
      const newBankaccounts = bankaccounts.filter(b => b.name !== bankaccount.name);
      this.setBankaccounts(newBankaccounts);
    });
  }

  private getBudgetsFromCookie(): void {
    this.budgets$.next(this.transformCookieToInput(this.cookieService.get(budgetsCookieName)));
  }

  private setBudgets(budgets: Budget[]): void {
    this.cookieService.set(budgetsCookieName, this.transformInputToCookie(budgets));
    this.budgets$.next(budgets);
  }

  private getBankaccountsFromCookie(): void {
    this.bankaccounts$.next(this.transformCookieToInput(this.cookieService.get(bankaccountsCookieName)));
  }

  private setBankaccounts(bankaccounts: Bankaccount[]): void {
    this.cookieService.set(bankaccountsCookieName, this.transformInputToCookie(bankaccounts));
    this.bankaccounts$.next(bankaccounts);
  }

  private getTransactionsFromCookie(): void {
    this.transactions$.next(this.transformCookieToInput(this.cookieService.get(transactionsCookieName)));
  }

  private setTransactions(transactions: Transaction[]): void {
    this.cookieService.set(transactionsCookieName, this.transformInputToCookie(transactions));
    this.transactions$.next(transactions);
  }

  private transformCookieToInput(cookieData: string): any[] {
    if (cookieData === '' || !cookieData) {
      return [];
    }
    return JSON.parse(cookieData);
  }

  private transformInputToCookie(transactions: any[]): string {
    return JSON.stringify(transactions);
  }

  private modifyBankaccount(amount: string, name: string) {
    this.bankaccounts$.pipe(take(1)).subscribe(bankaccounts => {
      const targetBankaccount = bankaccounts.find(ba => ba.name === name);
      if (targetBankaccount) {
        targetBankaccount.amount = (parseFloat(targetBankaccount.amount) - parseFloat(amount)).toString();
      }
      this.setBankaccounts(bankaccounts);
    })
  }

  private shareIncomeOverBudgets(amount: string) {
    this.budgets$.pipe(take(1)).subscribe(budgets => {
      let totalBudget = 0;
      budgets.forEach(b => totalBudget += parseFloat(b.moneyPerMonth));
      budgets.forEach(b => {
        b.moneyLeftInBudget = (parseFloat(b.moneyLeftInBudget) + (parseFloat(amount) * (parseFloat(b.moneyPerMonth) / totalBudget))).toString();
      });
      this.setBudgets(budgets);
    })
  }

  private modifyBudget(amount: string, category: string) {
    this.budgets$.pipe(take(1)).subscribe(budgets => {
      const targetBudget = budgets.find(ba => ba.category === category);
      if (targetBudget) {
        targetBudget.moneyLeftInBudget = (parseFloat(targetBudget.moneyLeftInBudget) - parseFloat(amount)).toString();
      }
      this.setBudgets(budgets);
    })
  }
}
