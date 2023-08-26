import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget } from 'src/app/models/budget.model';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/service/data.service'

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  showAdd = false;

  budgetForm = new FormGroup({
    moneyForBudget: new FormControl<string>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.budgets = this.dataService.getBudgetsFromCookie();
  }

  onAdd(): void {
    const newBudget: Budget = {
      moneyPerMonth: this.budgetForm?.controls?.moneyForBudget?.value ? this.budgetForm?.controls?.moneyForBudget?.value : '',
      category: this.budgetForm?.controls?.category?.value ? this.budgetForm?.controls?.category?.value : '',
    }
    this.budgets.push(newBudget);
    this.budgetForm.reset();
    this.dataService.setBudgetsToCookie(this.budgets);
  }
}
