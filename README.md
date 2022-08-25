# MyFullCalendar

Hi, you just got 'MyFullCalendar' by Guilherme Ferreira.

To run this code is as simple as any regular angular app.

* npm install (to install the packages)
* npm start (will start serving at localhost:4200)

now you will be able to test the calendar.

The ng test is already pointed to the mandatory test. So, fell free to run ng test.

# Information about the app

The entire application logic was wrote into the 'MyFullCalendarModule'. The 'AppModule' only uses it just like it was an external library. 
The 'MonthlyCalendarComponent' hold the entire aplication state: the current month and year. The child components only contains the necessary @Inputs and @Outputs.
I decided for using Bootstrap modals to show that the componentes (create, list, update) are plug and play. If you move it outside, it will still work normally.












This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
