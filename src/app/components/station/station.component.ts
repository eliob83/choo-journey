import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Station } from '../../classes/Station';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent {
  @Input() station: Station;

  constructor(private stationService: StationService) { }

  seeOnMap() {
    this.stationService.seeEvent(this.station);
  }

  startJourney() {
    this.stationService.startEvent(this.station);
  }
}
