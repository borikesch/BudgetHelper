import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/service/data.service'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  showAdd = false;

  transactionForm = new FormGroup({
    price: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    date: new FormControl<string>('', Validators.required),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.transactions = this.dataService.getTransactionsFromCookie();
  }

  onAdd(): void {
    const newTransaction: Transaction = {
      price: this.transactionForm?.controls?.price?.value ? this.transactionForm?.controls?.price?.value : '',
      name: this.transactionForm?.controls?.name?.value ? this.transactionForm?.controls?.name?.value : '',
      date: this.transactionForm?.controls?.date?.value ? this.transactionForm?.controls?.date?.value : '',
    }
    this.transactions.push(newTransaction);
    this.transactionForm.reset();
    this.dataService.setTransactionsToCookie(this.transactions);
  }
}
