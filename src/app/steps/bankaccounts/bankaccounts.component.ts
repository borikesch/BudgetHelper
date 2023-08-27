import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, take } from 'rxjs';
import { Bankaccount } from 'src/app/models/bankaccount.model';
import { DataService } from 'src/app/service/data/data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bankaccounts',
  templateUrl: './bankaccounts.component.html',
  styleUrls: ['./bankaccounts.component.css']
})
export class BankaccountsComponent implements OnInit {
  bankaccounts$: Observable<Bankaccount[]> = this.dataService.bankaccounts$;
  bankaccountsTotalAmount$: Observable<number> = this.bankaccounts$.pipe(
    takeUntilDestroyed(),
    map(bankaccounts => bankaccounts.reduce((total, account) => total + parseFloat(account.amount), 0)));

  showAdd = false;

  bankaccountForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    amount: new FormControl<string>('', Validators.required),
  });

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onAdd(): void {
    const newBankaccount: Bankaccount = {
      name: this.bankaccountForm?.controls?.name?.value ? this.bankaccountForm?.controls?.name?.value : '',
      amount: this.bankaccountForm?.controls?.amount?.value ? this.bankaccountForm?.controls?.amount?.value : '',
    }
    this.dataService.addBankaccount(newBankaccount);
    this.resetForm();
  }

  deleteBudget(bankaccount: Bankaccount): void {
    this.dataService.deleteBankaccount(bankaccount);
  }

  private resetForm() {
    this.bankaccountForm.reset();
  }

}
