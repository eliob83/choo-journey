
import { Component, Input } from '@angular/core';
import { StationServiceService } from '../../services/station-service.service';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent {
  stationName: string;

  constructor(private stationService: StationServiceService) { }


  searchStations() {
    console.log('Nom : ' + this.stationName);
    this.stationService.loadStationsLike(this.stationName);
  }
}
