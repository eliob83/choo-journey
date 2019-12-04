# ChooJourney

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.
It will be a one page web site, using the SNCF API (more information below).

## Features
### Dynamic map
- Stations location
    - Trains
    - Buses

### Stations

#### Search

#### Results
- Train station list (up to 5)

#### Information tab
- Details about departures and arrivals
- Details about the ride selected
- Button that show the station on the map

### Journeys

#### Search
- Autocomplete (typeahead)
- Form with required fields
- Datepicker

#### Results
- Journey list (up to 5)

## Technical features

### Components
We used many components dedicate each part of our project correctly.<br>
Here is the list of our components :<br>
- journey : a single journey result
- journey-form : the form for our journey search feature
- journey-list : the results of our search
- station : a single station result
- station-list : the results of our search
- station-map : the dynamic map
- navbar : a component used for presentation and style in our project 

### Classes
- __Station :__ Class mainly used for search
    - Filled with API requests (search + form fields)
    - Enum to define station types
    - 
- __Journey :__ Class used for journey search
    - Filled with API requests (form search)
    - Subclass __JourneyDate__ (date + time)
    - Subclass __JourneySection__ (2 stations)
    - Subclass __JourneySection__
- __Search :__ Contains enums
    - Enum __SearchState__
    - Enum __SearchOption__ (differentiate each field in the page)

### Observables
We used observable for API requests :<br>
Each field of the form / search tab have a __separate observable.__<br>
There are located in services

### Services
- __API__
    - Main service extended in _Station_ and _Journey_
    - Contains variables / methods for API requests
- __Station__
    - Manages requests for matching stations with input
- __Journey__
    - Manages requests for journey list results

### Events
We used event emitter to make API requests :
- Search __buttons__
- __Autocomplete__ fields

Some events were used for CSS :
- Buttons for __modals__
- __Datepicker__ field
- __Modal event__ for random images

## Prerequisites
- __Leaflet__
    - npm --save install leaflet @types/leaflet
- __Font-awesome :__
    - npm install @fortwaesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/angular-fontawesome@0.5.0
- __Bootstrap :__
    - npm install jquery ngx-bootstrap bootstrap --save<br><br>
    
The API token has to be given in the [token.ts file](./src/app/token.ts).<br>
You can obtain one on the [SNCF API website](https://www.digital.sncf.com/startup/api).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component.<br>
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
