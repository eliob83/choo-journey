import {Injectable} from '@angular/core';
import {Journey} from '../classes/Journey';
import {API_TOKEN} from '../token';

@Injectable({
  providedIn: 'root'
})

export class StationServiceService {
  private rq: string;

  constructor() {
  }

  searchJourney(jrny: Journey) {
    this.rq = 'https://' + API_TOKEN + '@api.navitia.io/v1/coverage/sncf/';
    this.rq += '?from=' + jrny.from + '&to=' + jrny.to + '&datetime=' + jrny.dateTime + '&';
  }
}
