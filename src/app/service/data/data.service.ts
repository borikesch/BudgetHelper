import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { bankaccountsCookieName, budgetsCookieName, transactionsCookieName } from './data.const';
import { Transaction } from '../../models/transaction.model';
import { Budget } from '../../models/budget.model';
import { Bankaccount } from 'src/app/models/bankaccount.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private cookieService: CookieService) { }

  resetCookies(): void {
    this.cookieService.delete(transactionsCookieName);
    this.cookieService.delete(budgetsCookieName);
    this.cookieService.delete(bankaccountsCookieName);
  }

  getTransactionsFromCookie(): Transaction[] {
    return this.transformCookieToInput(this.cookieService.get(transactionsCookieName));
  }

  setTransactionsToCookie(transactions: Transaction[]): void {
    this.cookieService.set(transactionsCookieName, this.transformInputToCookie(transactions));
  }

  getBankaccountsFromCookie(): Bankaccount[] {
    return this.transformCookieToInput(this.cookieService.get(bankaccountsCookieName));
  }

  setBankaccountsToCookie(transactions: Bankaccount[]): void {
    this.cookieService.set(bankaccountsCookieName, this.transformInputToCookie(transactions));
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
