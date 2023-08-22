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
    price: new FormControl('', Validators.required),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.transactions = this.dataService.getTransactionsFromCookie();
  }

  onClicking(): void {
    this.showAdd = true;
  }

  onAdd(): void {
    const newTransaction: Transaction = {
      price: this.transactionForm.controls.price.value,
    }
    this.transactions.push(newTransaction);
    this.transactionForm.reset();
    this.dataService.setTransactionsFromCookie(this.transactions);
  }
}
