import {Component, EventEmitter, Input, Output} from '@angular/core';

import {StationService} from 'src/app/services/station/station.service';
import {JourneyService} from 'src/app/services/journey/journey.service';

import {Station, StationType} from '../../classes/Station';

import {
  faBus,
  faPlane,
  faQuestion,
  faQuidditch,
  faShip,
  faSubway,
  faTaxi,
  faTrain,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent {
  // References
  faQuestion = faQuestion;
  faPlane = faPlane;
  faShip = faShip;
  faBus = faBus;
  faTrain = faTrain;
  faSubway = faSubway;
  faTaxi = faTaxi;
  faQuidditch = faQuidditch;

  StationType = StationType;


  @Input() station: Station;
  @Input() index: number;
  @Input() selected: boolean;

  @Output() openEvent = new EventEmitter<any>();


  stationIcon: IconDefinition;


  constructor(private stationService: StationService, private journeyService: JourneyService) { }

  // Focus pinpoint on map
  seeOnMap() {
    this.stationService.mapSubjects.next(this.station);
  }

  // Set Station as journey origin
  startJourney() {
    this.journeyService.journeyFromList.next({endpoint: 'from', station: this.station});
  }

  endJourney() {
    this.journeyService.journeyFromList.next({endpoint: 'to', station: this.station});
  }

  // Open detail panel animation
  openStation() {
    // Closing event
    if (this.selected) {
      this.openEvent.emit(null);
    } else {
      this.openEvent.emit(this.station);
    }
  }
}
