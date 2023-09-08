import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Bankaccount } from 'src/app/models/bankaccount.model';
import { Budget } from 'src/app/models/budget.model';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /**
   * Dashboard is the main flow regulator of this app
   * All apps will route back to the dashboard and the dashboard will route to the apps if necessary
   */
  bankaccounts$: Observable<Bankaccount[]> = this.dataService.bankaccounts$;
  hasBankaccountsSetup$: Observable<boolean> = this.bankaccounts$.pipe(map(accounts => accounts.length > 0));
  budgets$: Observable<Budget[]> = this.dataService.budgets$;
  budgetsSetup$: Observable<boolean> = this.budgets$.pipe(map(budgets => budgets.length > 0));

  constructor(
    private dataService: DataService,
  ) { }
}
