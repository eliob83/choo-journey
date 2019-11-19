import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import { StationService} from '../../services/station.service';

@Component({
  selector: 'app-station-map',
  templateUrl: './station-map.component.html',
  styleUrls: ['./station-map.component.css']
})
export class StationMapComponent implements OnInit {

  constructor(private stationsService: StationService) {
  }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myMap = L.map('myMap').setView([47.0833, 2.4], 6);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'myMap'
    }).addTo(myMap);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    /*this.stationsService.getLoadedStations().forEach(station => {
      L.marker([100, 12], {icon: myIcon}).addTo(myMap);
      console.log(station.lat, station.lon, station.name);
    });*/

    this.stationsService.mapSubjects.subscribe((station) => {
      if (station === null) {return;
      }
      console.log(station);
      L.marker([+station.lat, +station.lon], {icon: myIcon}).bindPopup(station.label).addTo(myMap);
    });

  }
}
