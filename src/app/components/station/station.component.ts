import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Station, StationType } from '../../classes/Station';
import { StationService } from 'src/app/services/station.service';

import { faTrain, faBus, faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent {
  faTrain = faTrain;
  faBus = faBus;
  faQuestion = faQuestion;
  StationType = StationType;

  @Input() station: Station;
  @Input() index: number;
  @Input() selected: boolean;

  @Output() openEvent = new EventEmitter<any>();

  constructor(private stationService: StationService) { }

  seeOnMap() {
    this.stationService.seeEvent(this.station);
  }

  startJourney() {
    this.stationService.startEvent(this.station);
  }

  openStation() {
    if (this.selected) {
      this.openEvent.emit(null);
    } else {
      this.openEvent.emit(this.station);
    }
  }
}
