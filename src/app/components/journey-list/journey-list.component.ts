import {Component} from '@angular/core';

import {JourneyService} from 'src/app/services/journey/journey.service';

import {Journey} from 'src/app/classes/Journey';
import {SearchState} from 'src/app/classes/Search';


@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.css']
})
export class JourneyListComponent {
  // References
  SearchState = SearchState;

  journeys = new Array<Journey>();
  currentState: SearchState;

  constructor(private journeyService: JourneyService) {
    this.journeyService.journeySubjects.subscribe(data => {
      if (data !== null && data !== undefined) {
        this.journeys = data.journeys;
        if (data.journeys.length === 0) {
          this.currentState = SearchState.UNDEFINED;
        } else {
          this.currentState = SearchState.COMPLETED;
        }
      } else {
        this.currentState = SearchState.UNDEFINED;
      }
    });

    this.currentState = SearchState.COMPLETED;
  }
}
