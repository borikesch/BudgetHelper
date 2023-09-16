import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Bankaccount } from 'src/app/models/bankaccount.model';
import { Budget } from 'src/app/models/budget.model';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]> = this.dataService.transactions$;
  budgets$: Observable<Budget[]> = this.dataService.budgets$;
  bankaccounts$: Observable<Bankaccount[]> = this.dataService.bankaccounts$;

  showAdd = false;
  transactionId: number = 0;
  categoryOptions: string[] = [];
  bankaccountOptions: string[] = [];

  transactionForm = new FormGroup({
    price: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    date: new FormControl<any>('', Validators.required),
    category: new FormControl<string>(''),
    bankaccount: new FormControl<string>(''),
    targetbankaccount: new FormControl<string>(''),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.setCategoryOptions();
    this.setBankaccountOptions();
    this.resetForm();
    this.getTransactionId();
  }

  onAdd(): void {
    const newTransaction: Transaction = {
      price: this.transactionForm?.controls?.price?.value ? this.transactionForm?.controls?.price?.value : '',
      name: this.transactionForm?.controls?.name?.value ? this.transactionForm?.controls?.name?.value : '',
      date: this.transactionForm?.controls?.date?.value ? this.transactionForm?.controls?.date?.value : '',
      category: this.transactionForm?.controls?.category?.value ? this.transactionForm?.controls?.category?.value : '',
      originBankaccountName: this.transactionForm?.controls?.bankaccount?.value ? this.transactionForm?.controls?.bankaccount?.value : '',
      targetBankaccountName: this.transactionForm?.controls?.targetbankaccount?.value ? this.transactionForm?.controls?.targetbankaccount?.value : '',
      transactionId: this.transactionId,
    }
    this.transactionId++;
    this.dataService.addTransaction(newTransaction);
    this.resetForm();
  }

  delete(transaction: Transaction) {
    this.dataService.deleteTransaction(transaction);
  }

  private setBankaccountOptions() {
    this.bankaccounts$.pipe(take(1)).subscribe(bankaccounts => {
      bankaccounts.forEach(bankaccount => {
        this.bankaccountOptions.push(bankaccount.name);
      })
    })
  }

  private setCategoryOptions() {
    this.budgets$.pipe(take(1)).subscribe(budgets => {
      budgets.forEach(budget => {
        this.categoryOptions.push(budget.category);
      });
      this.categoryOptions.sort();
    });
  }

  private resetForm() {
    this.transactionForm.reset();
    this.prefillDate();
  }

  private prefillDate() {
    let currentDate = new Date().toJSON().slice(0, 10);
    this.transactionForm?.controls?.date.setValue(currentDate);
  }

  private getTransactionId() {
    this.transactions$.pipe(take(1)).subscribe(transactions => {
      this.transactionId = transactions.length > 0 ?
        transactions[transactions.length - 1].transactionId : 0;
    })
  }
}
