import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bankaccount } from 'src/app/models/bankaccount.model';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-bankaccounts',
  templateUrl: './bankaccounts.component.html',
  styleUrls: ['./bankaccounts.component.css']
})
export class BankaccountsComponent implements OnInit {
  bankaccounts: Bankaccount[] = [];

  bankaccountForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    amount: new FormControl<string>('', Validators.required),
  });

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.bankaccounts = this.dataService.getBankaccountsFromCookie();
    this.resetForm();
  }

  onAdd(): void {
    const newBankaccount: Bankaccount = {
    }
    this.bankaccounts.push(newBankaccount);
    this.dataService.setBankaccountsToCookie(this.bankaccounts);
    this.resetForm();
  }

  deleteBudget(): void {
    this.bankaccounts = this.bankaccounts.filter(b => true);
    this.dataService.setBankaccountsToCookie(this.bankaccounts);
  }

  private resetForm() {
    this.bankaccountForm.reset();
  }

}
