import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget, ExtendedBudget } from 'src/app/models/budget.model';
import { BudgetCalculatorService } from 'src/app/service/budget/calculator.service';
import { DataService } from 'src/app/service/data/data.service'

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  extendedBudgets: ExtendedBudget[] = [];
  showAdd = false;

  budgetForm = new FormGroup({
    moneyForBudget: new FormControl<string>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
    date: new FormControl<any>('', Validators.required),
  });

  constructor(
    private dataService: DataService,
    private budgetCalculatorService: BudgetCalculatorService,
  ) { }

  ngOnInit(): void {
    this.budgets = this.dataService.getBudgetsFromCookie();
    this.calculateExtendedBudgets();
    this.resetForm();
  }

  onAdd(): void {
    const newBudget: Budget = {
      moneyPerMonth: this.budgetForm?.controls?.moneyForBudget?.value ? this.budgetForm?.controls?.moneyForBudget?.value : '',
      category: this.budgetForm?.controls?.category?.value ? this.budgetForm?.controls?.category?.value : '',
      dateAdded: this.budgetForm?.controls?.date?.value ? this.budgetForm?.controls?.date?.value : '',
      changes: [],
    }
    this.budgets.push(newBudget);
    this.resetForm();
    this.dataService.setBudgetsToCookie(this.budgets);
    this.calculateExtendedBudgets();
  }

  deleteBudget(category: string): void {
    this.budgets = this.budgets.filter(b => b.category !== category);
    this.dataService.setBudgetsToCookie(this.budgets);
    this.calculateExtendedBudgets();
  }

  getTotalBudgetPerMonth(): string {
    let result = 0;
    this.budgets.forEach(budget => {
      result += parseFloat(budget.moneyPerMonth);
    });
    return '€ ' + result.toFixed(2).toString();
  }

  getTotalBudgetLeft(): string {
    let result = 0;
    this.extendedBudgets.forEach(budget => {
      result += parseFloat(budget.moneyLeftInBudget);
    });
    return '€ ' + result.toFixed(2).toString();
  }

  private resetForm() {
    this.budgetForm.reset();
    this.prefillDate();
  }

  private prefillDate() {
    let currentDate = new Date().toJSON().slice(0, 10);
    this.budgetForm?.controls?.date.setValue(currentDate);
  }

  private calculateExtendedBudgets() {
    const transactions = this.dataService.getTransactionsFromCookie();
    const dateOfCalculation = new Date().toISOString().split('T')[0];
    this.extendedBudgets = this.budgetCalculatorService.calculateExtendedBudget(this.budgets, transactions, dateOfCalculation);
  }
}
