import { Component, Input, Output, EventEmitter } from '@angular/core';

import { StationService } from 'src/app/services/station.service';

import { Station, StationType } from '../../classes/Station';

import { faTrain, faBus, faQuestion } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent {
  // Icons
  faTrain = faTrain;
  faBus = faBus;
  faQuestion = faQuestion;

  // Enums
  StationType = StationType;


  @Input() station: Station;
  @Input() index: number;
  @Input() selected: boolean;

  @Output() openEvent = new EventEmitter<any>();


  constructor(private stationService: StationService) { }

  // Focus pinpoint on map
  seeOnMap() {
    this.stationService.mapSubjects.next(this.station);
  }

  // Set Station as journey origin
  startJourney() {
    // this.stationService.startEvent(this.station);
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
