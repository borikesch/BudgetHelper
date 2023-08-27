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
  showAdd = false;

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
      name: this.bankaccountForm?.controls?.name?.value ? this.bankaccountForm?.controls?.name?.value : '',
      amount: this.bankaccountForm?.controls?.amount?.value ? this.bankaccountForm?.controls?.amount?.value : '',
    }
    this.bankaccounts.push(newBankaccount);
    this.dataService.setBankaccountsToCookie(this.bankaccounts);
    this.resetForm();
  }

  deleteBudget(bankaccount: Bankaccount): void {
    this.bankaccounts = this.bankaccounts.filter(b => b.name !== bankaccount.name);
    this.dataService.setBankaccountsToCookie(this.bankaccounts);
  }

  getTotalAmount(): number {
    let result = 0;
    this.bankaccounts.forEach(ba => result += parseFloat(ba.amount));
    return result;
  }

  private resetForm() {
    this.bankaccountForm.reset();
  }

}
