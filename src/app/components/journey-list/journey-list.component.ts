import {Component} from '@angular/core';
import {JourneyService} from 'src/app/services/journey/journey.service';
import {Journey} from 'src/app/classes/Journey';

@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.css']
})
export class JourneyListComponent {
  journeys = new Array<Journey>();

  constructor(private journeyService: JourneyService) {
    this.journeyService.journeySubjects.subscribe(data => {
      this.journeys = data;
    });
  }

}
