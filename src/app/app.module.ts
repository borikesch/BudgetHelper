import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './steps/dashboard/dashboard.component';
import { TransactionsComponent } from './steps/transactions/transactions.component';
import { BudgetsComponent } from './steps/budgets/budgets.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './steps/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TransactionsComponent,
    BudgetsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl-NL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
