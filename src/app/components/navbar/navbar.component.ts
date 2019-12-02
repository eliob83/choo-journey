import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // References
  faInfoCircle = faInfoCircle;

  dog = '';

  constructor(private httpClient: HttpClient) {
  }

  setDog() {
    this.httpClient.get('https://random.dog/woof.json').subscribe(data => {
      const url: string = data[`url`];
      if (url.charAt(url.length - 1) === '4') {
        this.setDog();
      } else {
        this.dog = data[`url`];
      }
    });
  }
}
