import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {ApiService} from '../api.service';
// Classes
import {Journey} from '../../classes/Journey';


@Injectable({
  providedIn: 'root'
})
export class JourneyService extends ApiService {
  // Journey results observable
  public journeySubjects = new BehaviorSubject<Array<Journey>>([]);


  // API search like Journey
  loadJourneys(startStationId: string, endStationId: string, schedule: string, count: number): Observable<any> {
    return this.apiCall(this.endpoint + 'coverage/sncf/journeys?from=' + startStationId +
      '&to=' + endStationId + '&datetime=' + schedule + '&count=' + count);
  }

  // Subscribing data to Observer
  subscribeData(data: {}): void {
    const journeys = [];

    if (data[`journeys`] !== undefined && data[`journeys`].length) {
      data[`journeys`].forEach(element => {
        journeys.push(new Journey(element));
      });
    }

    this.journeySubjects.next(journeys);
  }

  // Journeys list search
  searchJourney(startStationId: string, endStationId: string, schedule: string, count: number): void {
    this.loadJourneys(startStationId, endStationId, schedule, count).subscribe((data: {}) => this.subscribeData(data));
  }
}
