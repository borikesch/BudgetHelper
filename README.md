# BudgetHelper

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Goals of repo
X_Overview of all transactions made
_Ability to change transactions
X_Ability to setup budgets
_Overview of budget this month
_Change 'start of month' 
X_Ability to save transactions and budgets in cookies

## Challenges
_No way yet to validate inputs
    _Add total of what we believe should be the number on your bank account
        _Different accounts?
_No way to check if you budgets is valid
    _Warning if your income was lower then your planned budget
_No way to put in your income yet

## Outline of logic

Dashboard
    - Overview Transactions
        - Add Transaction
        - Change Transaction
    - Overview budgets
        - Add Budget
        - Change Budget
        
