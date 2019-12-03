import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {ApiService} from '../api.service';
// Classes
import {Station} from '../../classes/Station';
import {SearchOption} from '../../classes/Search';


@Injectable({
  providedIn: 'root'
})
export class StationService extends ApiService {
  // Station search list observable
  public listSearchObservable = new BehaviorSubject<Array<Station>>([]);
  // Map pinpoint update observable
  public mapSubjects = new BehaviorSubject<Station>(null);
  // Journey search 'from' input observable
  public fromSearchObservable = new BehaviorSubject<Array<Station>>([]);
  // Journey search 'to' input observable
  public toSearchObservable = new BehaviorSubject<Array<Station>>([]);


  // API search like stationName
  loadStationsLike(stationName: string, count: number): Observable<any> {
    return this.apiCall(this.endpoint + 'coverage/sncf/places?q=' + stationName + '&count=' + count + '&type%5B%5D=stop_area&depth=3');
  }

  // Subscribing data to option-related Observer
  subscribeData(data: {}, opt: SearchOption): void {
    const stations = [];

    if (data[`places`] !== undefined && data[`places`].length) {
      data[`places`].forEach(element => {
        stations.push(new Station(element));
      });
    }

    switch (opt) {
      case SearchOption.FROM_INPUT:
        this.fromSearchObservable.next(stations);
        break;

      case SearchOption.TO_INPUT:
        this.toSearchObservable.next(stations);
        break;

      case SearchOption.LIST:
        this.listSearchObservable.next(stations);
        break;

      default:
        console.error('Error on \'subscribeData(*, ' + opt + ')\': unknown option');
        break;
    }
  }

  // Stations list search
  searchStation(stationName: string, count: number, opt: SearchOption): void {
    this.loadStationsLike(stationName, count)
      .subscribe((data: {}) => this.subscribeData(data, opt));
  }
}
