import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Station } from '../classes/Station';

import { API_TOKEN } from '../token';


@Injectable({
  providedIn: 'root'
})
export class StationService {
  protected readonly endpoint = 'https://api.navitia.io/v1/';
  protected readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: API_TOKEN
    })
  };

  // List update observable
  stationsSubjects: BehaviorSubject<Array<Station>> = new BehaviorSubject<Array<Station>>([]);
  // Map update observable
  mapSubjects: BehaviorSubject<Station> = new BehaviorSubject<Station>(null);


  constructor(private httpClient: HttpClient) { }

  // API call function
  apiCall(url: string): Observable<any> {
    return this.httpClient.get(url, this.headers);
  }

  // API search like stationName
  loadStationsLike(stationName: string, count: number): Observable<any> {
    return this.apiCall(this.endpoint + 'coverage/sncf/places?q=' + stationName + '&count=' + count + '&type%5B%5D=stop_area');
    /*.subscribe(
      () => { console.log('Terminé !'); },
      (error) => { console.error('Erreur httpClient : ' + error); }
    );*/
  }

  // Stations list search
  searchStation(stationName: string, nb: number) {
    const stations = [];

    this.loadStationsLike(stationName, nb).subscribe((data: {}) => {
      if (data[`places`] !== undefined && data[`places`].length) {
        data[`places`].forEach(element => {
          stations.push(new Station(element));
        });

        // Push stations list in observable
        this.stationsSubjects.next(stations);
      }
    });
  }
}
