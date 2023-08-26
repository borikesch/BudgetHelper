import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget } from 'src/app/models/budget.model';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/service/data/data.service'
import { Row } from './transactions.types';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  budgets: Budget[] = [];
  showAdd = false;
  categoryOptions: string[] = [];
  tableHeaders: string[] = [];
  tableRows: Row[] = [];

  transactionForm = new FormGroup({
    price: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    date: new FormControl<any>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.transactions = this.dataService.getTransactionsFromCookie();
    this.budgets = this.dataService.getBudgetsFromCookie();

    this.setCategoryOptions();
    this.setLayout();
    this.resetForm();
  }

  onAdd(): void {
    const newTransaction: Transaction = {
      price: this.transactionForm?.controls?.price?.value ? this.transactionForm?.controls?.price?.value : '',
      name: this.transactionForm?.controls?.name?.value ? this.transactionForm?.controls?.name?.value : '',
      date: this.transactionForm?.controls?.date?.value ? this.transactionForm?.controls?.date?.value : '',
      category: this.transactionForm?.controls?.category?.value ? this.transactionForm?.controls?.category?.value : '',
    }
    this.transactions.push(newTransaction);
    this.resetForm();
    this.setLayout();
    this.dataService.setTransactionsToCookie(this.transactions);
  }

  getTableItem(row: Row, key: string): string {
    switch (key) {
      case 'Category': return row.category;
      case 'Date': return row.date;
      case 'Name': return row.name;
      case 'Price': return '€ ' + parseFloat(row.price).toFixed(2).toString();
      default: return 'undefined';
    }
  }

  delete(row: Row) {
    this.transactions = this.transactions.filter(t =>
      t.category !== row.category && t.date !== row.date && t.name !== row.name && t.price !== row.price);
    this.dataService.setTransactionsToCookie(this.transactions);
    this.setLayout();
  }

  private setCategoryOptions() {
    this.budgets.forEach(budget => {
      this.categoryOptions.push(budget.category);
    })
  }

  private resetForm() {
    this.transactionForm.reset();
    this.prefillDate();
  }

  private prefillDate() {
    let currentDate = new Date().toJSON().slice(0, 10);
    this.transactionForm?.controls?.date.setValue(currentDate);
  }

  private setLayout() {
    this.tableRows = [];
    this.tableHeaders = ['Name', 'Category', 'Date', 'Price'];
    this.transactions.forEach(transaction => {
      this.tableRows.push({
        ...transaction
      });
    });
  }
}
