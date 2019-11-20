import {Component} from '@angular/core';
import {StationService} from '../../services/station.service';
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
  notSearched = true;


  constructor(private stationService: StationService) {
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
    this.notSearched = false;
    this.stationService.searchStation(this.stationName, 20, Options.SEARCH);
  }

  // Set station as selected
  openStation(station: Station) {
    this.selectedStation = station;
  }
}
