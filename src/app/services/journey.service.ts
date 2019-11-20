import {Injectable} from '@angular/core';
import {StationService} from './station.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Journey} from '../classes/Journey';

@Injectable({
  providedIn: 'root'
})
export class JourneyService extends StationService {

  public journeySubjects: BehaviorSubject<Array<Journey>> = new BehaviorSubject<Array<Journey>>([]);

  constructor(private http: HttpClient) {
    super(http);
  }

  // API search like Journey
  loadJourneys(journey: Journey, count: number): Observable<any> {
    const url = this.endpoint + 'coverage/sncf/journeys?from='
      + journey.from.id + '&to=' + journey.to.id + '&datetime=' + journey.dateTime + '&count=' + count;
    return this.apiCall(url);
  }

  // Subscribing data to Observer
  subscribeData(data: {}): void {
    const journeys = [];

    if (data[`journeys`] !== undefined && data[`journeys`].length) {
      data[`journeys`].forEach(element => {
        journeys.push(new Journey(element));
      });

      this.journeySubjects.next(journeys);
    }
  }

  // Journeys list search
  searchJourney(j: Journey, count: number): void {
    this.loadJourneys(j, count).subscribe((data: {}) => this.subscribeData(data));
  }
}
