import {Component, OnInit} from '@angular/core';

import {StationService} from '../../services/station/station.service';

import * as L from 'leaflet';
import {Icon} from 'leaflet';

import {Station, StationType} from 'src/app/classes/Station';


@Component({
  selector: 'app-station-map',
  templateUrl: './station-map.component.html',
  styleUrls: ['./station-map.component.css']
})
export class StationMapComponent implements OnInit {
  stationsMap: L.Map = null;
  markers: Array<any> = [];
  icons: Icon[][] = [[], [], []];


  constructor(private stationsService: StationService) { }

  ngOnInit() {
    // Map declaration with France-centered coords and zoom
    this.stationsMap = L.map('stationsMap').setView([47.0833, 2.4], 6);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'stationsMap'}).addTo(this.stationsMap);

    // Icons load
    this.icons[0][0] = L.icon({iconUrl: '../assets/map/interrogation.png', iconSize: [50, 50], iconAnchor: [25, 25]});
    for (let t = StationType.TRAIN; t <= StationType.FUNICULAR; t++) {
      for (let i = 0; i < 9; i++) {
        this.icons[t][i] = L.icon(
          {
            iconUrl: '../assets/map/' + (t === StationType.TRAIN ? 'train-icons/train' : 'bus-icons/bus') + i + '.png',
            iconSize: [50, 50], iconAnchor: [25, 25]
          }
        );
      }
    }

    // List update observable
    this.stationsService.listSearchObservable.subscribe(data => {
      this.updateMarkers(data);
    });

    // When a station is focused in the list
    this.stationsService.mapSubjects.subscribe(station => {
      this.focusStation(station);
    });
  }


  updateMarkers(data: Station[]) {
    // Remove every marker from the map
    this.markers.forEach(marker => {
      this.stationsMap.removeLayer(marker);
    });
    // Clear markers array
    this.markers.splice(0, this.markers.length);

    // For each station of the list
    data.forEach(station => {
      console.log(station);
      // Non-zero coords (unknown)
      if (station.lat !== 0 || station.lon !== 0) {
        this.markers.push(L.marker(
          [station.lat, station.lon],
          // Random station type icon
          {icon: this.icons[station.getMainType()][Math.floor(Math.random() * this.icons[station.getMainType()].length)]}
          ).bindPopup(station.label).addTo(this.stationsMap).on('click', e => {
            // Marker click push it on map observable
            this.stationsService.mapSubjects.next(station);
          })
        );
      }
    });
  }

  focusStation(station: Station) {
    // If non-zero coords on existing object
    if (station !== null && station.lat !== 0 && station.lon !== 0) {
      this.focusOnMap(station.lat, station.lon, 16);
    }
  }

  focusOnMap(lat: number, lon: number, zoom: number) {
    this.stationsMap.flyTo([lat, lon], zoom);
  }
}
