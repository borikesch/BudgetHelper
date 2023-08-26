import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget } from 'src/app/models/budget.model';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/service/data.service'

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

  transactionForm = new FormGroup({
    price: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    date: new FormControl<string>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.transactions = this.dataService.getTransactionsFromCookie();
    this.budgets = this.dataService.getBudgetsFromCookie();

    this.setCategoryOptions();
  }

  onAdd(): void {
    const newTransaction: Transaction = {
      price: this.transactionForm?.controls?.price?.value ? this.transactionForm?.controls?.price?.value : '',
      name: this.transactionForm?.controls?.name?.value ? this.transactionForm?.controls?.name?.value : '',
      date: this.transactionForm?.controls?.date?.value ? this.transactionForm?.controls?.date?.value : '',
      category: this.transactionForm?.controls?.category?.value ? this.transactionForm?.controls?.category?.value : '',
    }
    this.transactions.push(newTransaction);
    this.transactionForm.reset();
    this.dataService.setTransactionsToCookie(this.transactions);
  }

  private setCategoryOptions() {
    this.budgets.forEach(budget => {
      this.categoryOptions.push(budget.category);
    })
  }
}
