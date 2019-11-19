import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {Station} from '../classes/Station';
import {API_TOKEN} from '../token';

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

  // private stations: Array<Station> = [];
  public stationsSubjects: BehaviorSubject<Array<Station>> = new BehaviorSubject<Array<Station>>([]);
  public mapSubjects: BehaviorSubject<Station> = new BehaviorSubject<Station>(null);

  constructor(private httpClient: HttpClient) {
  }

  loadStationsLike(stationName: string, nb: number): Observable<any> {
    const url = this.endpoint + 'coverage/sncf/places?q=' + stationName + '&count=' + nb + '&type%5B%5D=stop_area';
    return this.httpClient.get(url, this.headers);
    /*.subscribe(
      () => { console.log('Terminé !'); },
      (error) => { console.error('Erreur httpClient : ' + error); }
    );*/
  }


  searchStation(stationName: string, nb: number) {
    const stations = [];

    this.loadStationsLike(stationName, nb).subscribe((data: {}) => {
      if (data[`places`] !== undefined && data[`places`].length) {
        data[`places`].forEach(element => {
          stations.push(new Station(element));
        });

        this.stationsSubjects.next(stations);
      }
    });
  }

  seeEvent(station: Station) {
    this.mapSubjects.next(station);
  }

  startEvent(station: Station) {

  }
}
