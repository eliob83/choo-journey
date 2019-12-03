import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_TOKEN} from '../token';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected readonly endpoint = 'https://api.navitia.io/v1/';
  protected readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: API_TOKEN
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  // API call function
  apiCall(url: string): Observable<any> {
    return this.httpClient.get(url, this.headers);
  }
}
