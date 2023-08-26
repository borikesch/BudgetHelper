import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { budgetsCookieName, transactionsCookieName } from './data.const';
import { Transaction } from '../models/transaction.model';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private cookieService: CookieService) { }

  resetCookies(): void {
    this.cookieService.delete(transactionsCookieName);
    this.cookieService.delete(budgetsCookieName);
  }

  getTransactionsFromCookie(): Transaction[] {
    return this.transformCookieToInput(this.cookieService.get(transactionsCookieName));
  }

  setTransactionsToCookie(transactions: Transaction[]): void {
    this.cookieService.set(transactionsCookieName, this.transformInputToCookie(transactions));
  }

  getBudgetsFromCookie(): Budget[] {
    return this.transformCookieToInput(this.cookieService.get(budgetsCookieName));
  }

  setBudgetsToCookie(transactions: Budget[]): void {
    this.cookieService.set(budgetsCookieName, this.transformInputToCookie(transactions));
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
}
