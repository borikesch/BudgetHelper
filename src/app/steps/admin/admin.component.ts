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
    this.dataService.resetCookies();
    this.createTestBudgets();
    this.createTestTransactions();
  }



  private createTestBudgets() {
    const today = new Date().toISOString().split('T')[0];
    this.dataService.addBudget({
      moneyPerMonth: '150',
      category: 'Boodschappen',
      dateAdded: today,
      changes: [],
    });
    this.dataService.addBudget({
      moneyPerMonth: '650',
      category: 'Hypotheek',
      dateAdded: today,
      changes: [],
    });
    this.dataService.addBudget({
      moneyPerMonth: '100',
      category: 'Uitjes',
      dateAdded: today,
      changes: [],
    });
  }

  private createTestTransactions() {
    const today = new Date().toISOString().split('T')[0];
    this.dataService.addTransaction({
      price: '5.99',
      category: 'Boodschappen',
      name: 'Wekelijkse boodschappen',
      date: today,
    });
    this.dataService.addTransaction({
      price: '24.39',
      category: 'Boodschappen',
      name: 'AH boodschappen',
      date: today,
    });
    this.dataService.addTransaction({
      price: '650',
      category: 'Hypotheek',
      name: 'Maandelijkse afschrijving',
      date: today,
    });
    this.dataService.addTransaction({
      price: '35.34',
      category: 'Uitjes',
      name: 'Uit eten geweest',
      date: today,
    });
  }
}
