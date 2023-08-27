import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
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
  showAdd = false;
  categoryOptions: string[] = [];

  transactionForm = new FormGroup({
    price: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    date: new FormControl<any>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.setCategoryOptions();
    this.resetForm();
  }

  onAdd(): void {
    const newTransaction: Transaction = {
      price: this.transactionForm?.controls?.price?.value ? this.transactionForm?.controls?.price?.value : '',
      name: this.transactionForm?.controls?.name?.value ? this.transactionForm?.controls?.name?.value : '',
      date: this.transactionForm?.controls?.date?.value ? this.transactionForm?.controls?.date?.value : '',
      category: this.transactionForm?.controls?.category?.value ? this.transactionForm?.controls?.category?.value : '',
    }
    this.dataService.addTransaction(newTransaction);
    this.resetForm();
  }

  delete(transaction: Transaction) {
    this.dataService.deleteTransaction(transaction);
  }

  private setCategoryOptions() {
    this.budgets$.pipe(take(1)).subscribe(budgets => {
      budgets.forEach(budget => {
        this.categoryOptions.push(budget.category);
      })
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
}
