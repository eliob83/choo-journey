import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {Station} from '../../classes/Station';
import {Options} from '../../classes/Journey';

import {API_TOKEN} from '../../token';

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
  stationsSubjects: BehaviorSubject<Array<Station>> = new BehaviorSubject<Array<Station>>([]); // Search
  autoCompleteSearchFrom: BehaviorSubject<Array<Station>> = new BehaviorSubject<Array<Station>>([]); // From
  autoCompleteSearchTo: BehaviorSubject<Array<Station>> = new BehaviorSubject<Array<Station>>([]); // To
  // Map update observable
  mapSubjects: BehaviorSubject<Station> = new BehaviorSubject<Station>(null);


  constructor(private httpClient: HttpClient) {
  }

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

  // Subscribing data to Observer
  subscribeData(data: {}, opt: Options): void {
    const stations = [];

    if (data[`places`] !== undefined && data[`places`].length) {
      data[`places`].forEach(element => {
        stations.push(new Station(element));
      });
    }

    switch (opt) {
      case Options.FROM:
        this.autoCompleteSearchFrom.next(stations);
        break;

      case Options.TO:
        this.autoCompleteSearchTo.next(stations);
        break;

      case Options.SEARCH:
        this.stationsSubjects.next(stations);
        break;
    }
  }

  // Stations list search
  searchStation(stationName: string, count: number, opt: Options): void {
    this.loadStationsLike(stationName, count).subscribe((data: {}) => this.subscribeData(data, opt));
  }
}
