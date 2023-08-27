import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Bankaccount } from 'src/app/models/bankaccount.model';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-bankaccounts',
  templateUrl: './bankaccounts.component.html',
  styleUrls: ['./bankaccounts.component.css']
})
export class BankaccountsComponent implements OnInit {
  bankaccounts$: Observable<Bankaccount[]> = this.dataService.bankaccounts$;
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

  getTotalAmount(): number {
    let result = 0;
    // TODO oplossen met een observable
    // this.bankaccounts$.pipe(take(1)).forEach(ba => result += parseFloat(ba.amount));
    return result;
  }

  private resetForm() {
    this.bankaccountForm.reset();
  }

}
