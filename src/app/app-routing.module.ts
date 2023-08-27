import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './steps/dashboard/dashboard.component';
import { BudgetsComponent } from './steps/budgets/budgets.component';
import { TransactionsComponent } from './steps/transactions/transactions.component';
import { AdminComponent } from './steps/admin/admin.component';
import { BankaccountsComponent } from './steps/bankaccounts/bankaccounts.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionsComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'bankaccounts', component: BankaccountsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
