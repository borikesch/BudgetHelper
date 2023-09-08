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
X_Change 'start of month' (not relevant anymore)
X_Ability to save transactions and budgets in cookies
_Warning when your total budget is currently lower then your total bankaccount amount
_Warning when you are adding an invalid transaction (no category, no bankaccount, etc)
_Last transaction date remembered
_Show the last time you did some transactions or something else

## Challenges
_No way yet to validate inputs
    _Add total of what we believe should be the number on your bank account
        _Different accounts?
_No way to check if you budgets is valid
    _Warning if your income was lower then your planned budget
X_No way to put in your income yet
    X_Possible solution: Put in your income without a category
X_What to do with money in your accounts that is not in your budgets?
X_What to do if the money in your budgets exceed the money in your accounts (You will just be in the red on your account)
X_How and when do you start the budgetting (At the moment that you start using the website)
X_What is the most efficient workflow (Bankaccounts => budgets => Transactions)
_What should be on the dashboard?
    _Graph of moneyflows?
    _Warnings currently active
    _Explanation of the initialization (partly done)

## Outline of logic

Dashboard
    X- Overview Transactions
        X- Add Transaction
        - Change Transaction
    X- Overview budgets
        X- Add Budget
        - Change Budget
    X- Overview Bankaccounts
        X- Add Bankaccounts
        - Change Bankaccounts

## Flow
Set up your bank accounts with their current amounts
Set up your budgets and pick how much is in it from your bankaccounts
Then you have a base point from which you start

Then you just put in your transactions
When your transaction is an income action, put it proportional in your budgets (based on budget per month)
    Warning if income isn't enough
        Optional (might have 2 incomes)
    Option to put it all in one budget (vakantie geld for example)
        
