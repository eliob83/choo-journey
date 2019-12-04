import {Component, Input} from '@angular/core';

import {Journey, JourneyType} from 'src/app/classes/Journey';

import {faBus, faSubway, faTrain} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent {
  // References
  faTrain = faTrain;
  faBus = faBus;
  faSubway = faSubway;
  JourneyType = JourneyType;

  @Input() index: number;
  @Input() journey: Journey;


  constructor() {
  }

}
