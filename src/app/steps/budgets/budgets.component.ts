import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Budget, ExtendedBudget } from 'src/app/models/budget.model';
import { BudgetCalculatorService } from 'src/app/service/budget/calculator.service';
import { DataService } from 'src/app/service/data/data.service'

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets$: Observable<Budget[]> = this.dataService.budgets$;
  extendedBudgets$: Observable<ExtendedBudget[]> =
    this.budgetCalculatorService.calculateExtendedBudget(this.budgets$, this.dataService.transactions$, new Date().toISOString().split('T')[0]);

  totalBudgetPerMonth$: Observable<number> = this.budgets$.pipe(
    takeUntilDestroyed(),
    map(budgets => budgets.reduce((total, budget) => total + parseFloat(budget.moneyPerMonth), 0)));
  getTotalBudgetLeft$: Observable<number> = this.extendedBudgets$.pipe(
    takeUntilDestroyed(),
    map(budgets => budgets.reduce((total, budget) => total + parseFloat(budget.moneyLeftInBudget), 0)));

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
    this.resetForm();
  }

  onAdd(): void {
    const newBudget: Budget = {
      moneyPerMonth: this.budgetForm?.controls?.moneyForBudget?.value ? this.budgetForm?.controls?.moneyForBudget?.value : '',
      category: this.budgetForm?.controls?.category?.value ? this.budgetForm?.controls?.category?.value : '',
      dateAdded: this.budgetForm?.controls?.date?.value ? this.budgetForm?.controls?.date?.value : '',
      changes: [],
    }
    this.dataService.addBudget(newBudget);
    this.resetForm();
  }

  deleteBudget(budget: Budget): void {
    this.dataService.deleteBudget(budget);
  }

  private resetForm() {
    this.budgetForm.reset();
    this.prefillDate();
  }

  private prefillDate() {
    let currentDate = new Date().toJSON().slice(0, 10);
    this.budgetForm?.controls?.date.setValue(currentDate);
  }
}
