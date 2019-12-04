import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {ApiService} from '../api.service';
// Classes
import {Journey, JourneyList} from '../../classes/Journey';


@Injectable({
  providedIn: 'root'
})
export class JourneyService extends ApiService {
  // Journey results observable
  public journeySubjects = new BehaviorSubject<JourneyList>(null);

  public journeyFromList = new BehaviorSubject<any>({ endpoint: undefined, station: undefined });


  // API search like Journey
  loadJourneys(startStationId: string, endStationId: string, schedule: string, count: number): Observable<any> {
    return this.apiCall(this.endpoint + 'coverage/sncf/journeys?from=' + startStationId +
      '&to=' + endStationId + '&datetime=' + schedule + '&count=' + count);
  }

  // Subscribing data to Observer
  subscribeData(data: {}): void {
    this.journeySubjects.next(new JourneyList(data));
  }

  // Journeys list search
  searchJourney(startStationId: string, endStationId: string, schedule: string, count: number): void {
    this.loadJourneys(startStationId, endStationId, schedule, count).subscribe((data: {}) => this.subscribeData(data));
  }
}
