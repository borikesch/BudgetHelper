import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  showAdd = false;

  transactionForm = new FormGroup({
    price: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
    this.transactions = [
      { price: 1.24 },
      { price: 1.25 },
    ]
  }

  onClicking() {
    this.showAdd = true;
  }

  onAdd() {
    const newTransaction: Transaction = {
      price: this.transactionForm.controls.price.value,
    }
    this.transactions.push(newTransaction);
    this.transactionForm.reset();
  }
}
