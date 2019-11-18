import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
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


  private stations = [
    new Station(null)
  ];


  loadStationsLike(stationName: string) {
    let places: Array<any> = null;

    this.httpClient.get(endpoint + 'coverage/sncf/places?q=' + stationName + '&count=100&type%5B%5D=stop_area', headers)
    .subscribe((data: {}) => {
      this.stations = [];

      if ((places = data[`places`]).length > 0) {
        places.forEach(element => {
          this.stations.push(new Station(element));
        });

        console.log(this.stations);
      }
    });
    /*.subscribe(
      () => { console.log('Terminé !'); },
      (error) => { console.error('Erreur httpClient : ' + error); }
    );*/
  }

  
  searchJourney(jrny: Journey) {
    let rq = endpoint + 'coverage/sncf/';
    rq += '?from=' + jrny.from + '&to=' + jrny.to + '&datetime=' + jrny.dateTime + '&';
  }

  getLoadedStations() {
    return this.stations;
  }
}
