# ChooJourney

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.
It will be a one page web site, using the SNCF API (more information below).

## Features
### Dynamic map
- Train stations location
- Rides proposed

### Search bar
- Train stations list
- Autocomplete

### Information tab
- Details about departures and arrivals
- Details about the ride selected 

## Prerequisites

Leaflet required : npm --save install leaflet @types/leaflet
Bootstrap required : npm install jquery ngx-bootstrap bootstrap --save
The API token has to be given in the [token.ts file](./src/app/token.ts).
You can obtain one on the [SNCF API website](https://www.digital.sncf.com/startup/api).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
