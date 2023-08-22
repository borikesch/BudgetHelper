import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { cookieName } from './data.const';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private cookieService: CookieService) { }

  getTransactionsFromCookie() {
    return this.transformCookietoTransactions(this.cookieService.get(cookieName));
  }

  setTransactionsFromCookie(transactions: Transaction[]) {
    this.cookieService.set(cookieName, this.transformTransactionsToCookie(transactions));
  }

  private transformCookietoTransactions(cookieData: string): Transaction[] {
    return [];
  }

  private transformTransactionsToCookie(transactions: Transaction[]): string {
    return ''
  }
}
