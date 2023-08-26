import { Component } from '@angular/core';
import { Budget } from 'src/app/models/budget.model';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private dataService: DataService) { }

  onReset() {
    this.dataService.resetCookies();
  }

  onCreateTestScenario() {
    this.createTestBudgets();
    this.createTestTransactions();
  }

  private createTestBudgets() {
    const testBudgets: Budget[] = [];
    const today = new Date().toISOString().split('T')[0];
    testBudgets.push({
      moneyPerMonth: '150',
      category: 'Boodschappen',
      dateAdded: today,
      changes: [],
    });
    testBudgets.push({
      moneyPerMonth: '650',
      category: 'Hypotheek',
      dateAdded: today,
      changes: [],
    });
    testBudgets.push({
      moneyPerMonth: '100',
      category: 'Uitjes',
      dateAdded: today,
      changes: [],
    });
    this.dataService.setBudgetsToCookie(testBudgets);
  }

  private createTestTransactions() {
    const testTransactions: Transaction[] = [];
    const today = new Date().toISOString().split('T')[0];
    testTransactions.push({
      price: '5.99',
      category: 'Boodschappen',
      name: 'Wekelijkse boodschappen',
      date: today,
    });
    testTransactions.push({
      price: '24.39',
      category: 'Boodschappen',
      name: 'AH boodschappen',
      date: today,
    });
    testTransactions.push({
      price: '650',
      category: 'Hypotheek',
      name: 'Maandelijkse afschrijving',
      date: today,
    });
    testTransactions.push({
      price: '35.34',
      category: 'Uitjes',
      name: 'Uit eten geweest',
      date: today,
    });
    this.dataService.setTransactionsToCookie(testTransactions);
  }
}
