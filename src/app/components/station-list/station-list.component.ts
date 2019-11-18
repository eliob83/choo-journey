
import { Component, Input } from '@angular/core';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent {
  stationName: string;

  constructor(private stationService: StationService) { }


  searchStations() {
    console.log('Nom : ' + this.stationName);
    this.stationService.loadStationsLike(this.stationName);
  }
}
