import {Injectable} from '@angular/core';
import {Journey} from '../classes/Journey';

@Injectable({
  providedIn: 'root'
})

export class StationServiceService {
  private rq: string;

  constructor() {
  }

  searchJourney(jrny: Journey) {
    this.rq = 'https://api.navitia.io/v1/coverage/sncf/journeys?from=' + jrny.from + '&to=' + jrny.to + '&datetime=' + jrny.dateTime + '&';
  }
}
