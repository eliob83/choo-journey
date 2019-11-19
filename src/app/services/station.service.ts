import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';

import {Station} from '../classes/Station';
import {Journey} from '../classes/Journey';
import {API_TOKEN} from '../token';


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

  //private stations: Array<Station> = [ ];
  public stationsSubjects: BehaviorSubject<Array<Station>> = new BehaviorSubject<Array<Station>>([ ]);
  public mapSubjects: BehaviorSubject<Station> = new BehaviorSubject<Station>(null);


  loadStationsLike(stationName: string): Observable<any> {
    return this.httpClient.get(endpoint + 'coverage/sncf/places?q=' + stationName + '&count=100&type%5B%5D=stop_area', headers);
    /*.subscribe(
      () => { console.log('Terminé !'); },
      (error) => { console.error('Erreur httpClient : ' + error); }
    );*/
  }


  searchStation(stationName: string) {
    const stations = [];

    this.loadStationsLike(stationName).subscribe((data: {}) => {
      if (data[`places`] !== undefined && data[`places`].length) {
        data[`places`].forEach(element => {
          stations.push(new Station(element));
        });

        this.stationsSubjects.next(stations);
      }
    });
  }

  autocompletionStation(nameLike: string) {
    // this.loadStationsLike(nameLike).subscribe()
  }


  searchJourney(jrny: Journey) {
    console.log(jrny);
    // let rq = endpoint + 'coverage/sncf/';
    // rq += '?from=' + jrny.from + '&to=' + jrny.to + '&datetime=' + jrny.dateTime + '&';
  }


  seeEvent(station: Station) {
    this.mapSubjects.next(station);
  }

  startEvent(station: Station) {

  }
}
