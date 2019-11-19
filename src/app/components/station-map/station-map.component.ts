import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {StationService} from '../../services/station.service';
import {DivIcon, Icon, IconOptions} from 'leaflet';
import { StationType } from 'src/app/classes/Station';

@Component({
  selector: 'app-station-map',
  templateUrl: './station-map.component.html',
  styleUrls: ['./station-map.component.css']
})
export class StationMapComponent implements OnInit {
  markers: Array<any> = [];
  icons: Icon[][] = [[ ], [ ], [ ]];

  constructor(private stationsService: StationService) { }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myMap = L.map('myMap').setView([47.0833, 2.4], 6);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'myMap'
    }).addTo(myMap);

    this.icons[0][0] = L.icon({
      iconUrl: '../assets/img/interrogation.png', iconSize: [50, 50], iconAnchor: [47, 47]
    });
    for (let t = StationType.TRAIN_STATION; t <= StationType.BUS_STATION; t++) {
      for (let i = 0; i < 9; i++) {
        this.icons[t][i] = L.icon({
          iconUrl: '../assets/img/' + (t === StationType.TRAIN_STATION ? 'train' : 'bus') + i + '.png',
          iconSize: [50, 50], iconAnchor: [47, 47]
        });
      }
    }

    // When stations are searched
    this.stationsService.stationsSubjects.subscribe((data) => {
      this.markers.forEach(marker => {
        myMap.removeLayer(marker);
      });
      this.markers.splice(0, this.markers.length);

      data.forEach(station => {
        this.markers.push(
          L.marker(
              [+station.lat, +station.lon],
              {icon: this.icons[station.type][Math.floor(Math.random() * this.icons[station.type].length)]})
            .bindPopup(station.label).addTo(myMap)
            .on('click', e => {
              this.stationsService.mapSubjects.next(station);
            }
          )
        );
      });
    });

    // When a station is focused in the list
    this.stationsService.mapSubjects.subscribe((station) => {
      if (station !== null && station.lon !== undefined && station.lat !== undefined) {
        myMap.flyTo([+station.lat, +station.lon], 16);
      }
    });
  }
}
