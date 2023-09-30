import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest, map, of, take } from 'rxjs';
import { Bankaccount } from 'src/app/models/bankaccount.model';
import { Budget } from 'src/app/models/budget.model';
import { DataService } from 'src/app/service/data/data.service'

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  initialized = false;
  showAdd = false;
  budgets$: Observable<Budget[]> = this.dataService.budgets$.pipe(map(budgets => budgets.sort((a, b) => this.budgetSorter(a, b))));
  bankaccounts$: Observable<Bankaccount[]> = this.dataService.bankaccounts$;
  bankaccountsTotalAmount$: Observable<number> = this.bankaccounts$.pipe(
    takeUntilDestroyed(),
    map(bankaccounts => bankaccounts.reduce((total, account) => total + parseFloat(account.amount), 0)));

  totalBudgetPerMonth$: Observable<number> = this.budgets$.pipe(
    takeUntilDestroyed(),
    map(budgets => budgets.reduce((total, budget) => total + parseFloat(budget.moneyPerMonth), 0)));
  getTotalBudgetLeft$: Observable<number> = this.budgets$.pipe(
    takeUntilDestroyed(),
    map(budgets => budgets.reduce((total, budget) => total + parseFloat(budget.moneyLeftInBudget), 0)));

  totalMoneyUnaccounted$ = combineLatest([
    this.getTotalBudgetLeft$,
    this.bankaccountsTotalAmount$,
  ]).pipe(
    takeUntilDestroyed(),
    map(([budgetTotal, bankaccountTotal]) => bankaccountTotal - budgetTotal),
  );

  sortAlphabetically = true;
  sortDescending = false;
  sortMoneyEachMonth = false;
  sortMoneyLeft = false;

  budgetForm = new FormGroup({
    moneyLeftInBudget: new FormControl<string>('0', Validators.required),
    moneyForBudget: new FormControl<string>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
    date: new FormControl<any>('', Validators.required),
  });

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onAdd(): void {
    const newBudget: Budget = {
      moneyLeftInBudget: this.budgetForm?.controls?.moneyLeftInBudget?.value ? this.budgetForm?.controls?.moneyLeftInBudget?.value : '',
      moneyPerMonth: this.budgetForm?.controls?.moneyForBudget?.value ? this.budgetForm?.controls?.moneyForBudget?.value : '',
      category: this.budgetForm?.controls?.category?.value ? this.budgetForm?.controls?.category?.value : '',
      dateAdded: this.budgetForm?.controls?.date?.value ? this.budgetForm?.controls?.date?.value : '',
    }
    this.dataService.addBudget(newBudget);
    this.resetForm();
  }

  deleteBudget(budget: Budget): void {
    this.dataService.deleteBudget(budget);
  }

  setSorting(sorter: string): void {
    if (sorter === 'alphabetically') {
      this.sortDescending = this.sortAlphabetically ? !this.sortDescending : false;
      this.sortAlphabetically = true;
      this.sortMoneyLeft = false;
      this.sortMoneyEachMonth = false;
    } else if (sorter === 'moneyLeft') {
      this.sortDescending = this.sortMoneyLeft ? !this.sortDescending : false;
      this.sortAlphabetically = false;
      this.sortMoneyLeft = true;
      this.sortMoneyEachMonth = false;
    } else if (sorter === 'moneyEachMonth') {
      this.sortDescending = this.sortMoneyEachMonth ? !this.sortDescending : false;
      this.sortAlphabetically = false;
      this.sortMoneyLeft = false;
      this.sortMoneyEachMonth = true;
    }
    this.budgets$ = this.dataService.budgets$.pipe(map(budgets => budgets.sort((a, b) => this.budgetSorter(a, b))));
  }

  private resetForm() {
    this.budgetForm.reset();
    this.prefillDate();
  }

  private prefillDate() {
    let currentDate = new Date().toJSON().slice(0, 10);
    this.budgetForm?.controls?.date.setValue(currentDate);
  }

  private budgetSorter(a: Budget, b: Budget) {
    let leftIsSmaller = false;
    if (this.sortAlphabetically) {
      leftIsSmaller = a.category < b.category;
    }
    if (this.sortMoneyLeft) {
      leftIsSmaller = parseFloat(a.moneyLeftInBudget) < parseFloat(b.moneyLeftInBudget);
    }
    if (this.sortMoneyEachMonth) {
      leftIsSmaller = parseFloat(a.moneyPerMonth) < parseFloat(b.moneyPerMonth);
    }
    return leftIsSmaller ?
      this.sortDescending ? 1 : -1 :
      this.sortDescending ? -1 : 1;
  }
}
