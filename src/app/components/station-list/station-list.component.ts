
import { Component, Input, Output } from '@angular/core';
import { StationService } from '../../services/station.service';
import { EventEmitter } from 'events';
import { Station } from '../../classes/Station';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent {
  stationName: string;
  notSearched = true;

  constructor(private stationService: StationService) { }


  searchStations() {
    this.notSearched = false;
    this.stationService.searchStation(this.stationName);
  }
}
