# Example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

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

## Client's Request for Gaussian Webpage

- The ORCA and Gaussian websites should be very similar or perhaps even merged if possible. 
- The types of data needed are going to be very similar, the only difference will be the formatting of the text in the output files. 
- The suggestion would be to try and duplicate the orca website with the gaussian website. 
- It might be easier to select the output file type (ORCA or Gaussian) on the same page, and then use the same code to do the text extraction.

## Client's Request for Data Extraction 

- Cycles:
    - Last or first should be the main options because the number of cycles change
    - Start from some row to end in some row
    - Separate over multiple files, “for this keyword I want 3 lines or for some other keywords I want 10 lines”
    - X,Y,Z Coordinates,
    - Energy,
    - Thermal energy,
    - Frequencies,
- Outputs should be in one file