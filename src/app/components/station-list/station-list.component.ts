import {Component} from '@angular/core';
import {StationService} from '../../services/station/station.service';
import {Station} from '../../classes/Station';
import {Options} from '../../classes/Journey';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent {
  // List items
  stations: Array<Station> = [ ];
  selectedStation: Station = null;

  // Search items
  stationName: string;
  lastStationName: string;
  searchState = true;


  constructor(private stationService: StationService) {
    this.searchState = true;

    // List update observable
    stationService.stationsSubjects.subscribe((data) => {
      this.stations = data;
      this.selectedStation = null;
    });

    // Map update observable
    stationService.mapSubjects.subscribe(data => {
      this.selectedStation = data;
    });
  }

  // Search stationName thanks to API
  searchStations() {
    if (this.stationName !== undefined && this.stationName !== '') {
      this.stationService.searchStation(this.stationName, 10, Options.SEARCH);

      this.searchState = false;
      this.lastStationName = this.stationName;
    }
  }

  // Set station as selected
  openStation(station: Station) {
    this.selectedStation = station;
  }
}
