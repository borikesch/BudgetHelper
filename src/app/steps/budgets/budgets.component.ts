import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
    this.dataService.addBudget(newBudget);
    this.resetForm();
    this.calculateExtendedBudgets();
  }

  deleteBudget(budget: Budget): void {
    this.dataService.deleteBudget(budget);
  }

  getTotalBudgetPerMonth(): string {
    let result = 0;
    // TODO mbv observable
    // this.budgets.forEach(budget => {
    //   result += parseFloat(budget.moneyPerMonth);
    // });
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
    const dateOfCalculation = new Date().toISOString().split('T')[0];
    this.extendedBudgets = this.budgetCalculatorService.calculateExtendedBudget(this.budgets$, this.dataService.transactions$, dateOfCalculation);
  }
}
