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

  loadJourneys(journey: Journey, nb: number): Observable<any> {
    let url = this.endpoint + 'coverage/sncf/journeys?from=';
    url += journey.from.id + '&to=' + journey.to.id + '&datetime=' + journey.dateTime + '&count=' + nb;

    return this.http.get(url, this.headers);
  }

  searchJourney(j: Journey, nb: number): void {
    const journeys = [];

    this.loadJourneys(j, nb).subscribe((data: {}) => {
      if (data[`journeys`] !== undefined && data[`journeys`].length) {
        data[`journeys`].forEach(element => {
          journeys.push(new Journey(element));
        });

        this.journeySubjects.next(journeys);
      }
    });
  }
}
