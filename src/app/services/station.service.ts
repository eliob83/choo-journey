import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';

import { Station } from '../classes/Station';
import { Journey } from '../classes/Journey';
import { API_TOKEN } from '../token';


const endpoint = 'https://api.navitia.io/v1/';
const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: API_TOKEN
  })
};


@Injectable({
  providedIn: 'root'
})

export class StationService {
  constructor(private httpClient: HttpClient) { }

  private stations: Array<Station> = [ ];

  private mapSubjects: BehaviorSubject<Station> = new BehaviorSubject<Station>(null);


  loadStationsLike(stationName: string): Observable<any> {
    return this.httpClient.get(endpoint + 'coverage/sncf/places?q=' + stationName + '&count=100&type%5B%5D=stop_area', headers);
    /*.subscribe(
      () => { console.log('Terminé !'); },
      (error) => { console.error('Erreur httpClient : ' + error); }
    );*/
  }


  searchStation(stationName: string) {
    let places: Array<any> = [];
    this.stations = [];

    this.loadStationsLike(stationName).subscribe((data: {}) => {
      if ((places = data[`places`]).length > 0) {
        places.forEach(element => {
          this.stations.push(new Station(element));
          console.log(element);
        });

        console.log(this.stations); // DEBUG
      }
    });
  }

  autocompletionStation(nameLike: string) {
    //this.loadStationsLike(nameLike).subscribe()
  }


  searchJourney(jrny: Journey) {
    let rq = endpoint + 'coverage/sncf/';
    rq += '?from=' + jrny.from + '&to=' + jrny.to + '&datetime=' + jrny.dateTime + '&';
  }

  getLoadedStations() {
    return this.stations;
  }

  getLoadedStationFromId(stationId: string) {
    this.stations.forEach(element => {
      if (element.id === stationId) {
        return element;
      }
    });

    return null;
  }


  seeEvent(station: Station) {
    this.mapSubjects.next(station);
  }

  startEvent(station: Station) {

  }
}
