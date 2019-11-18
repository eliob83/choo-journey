import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Journey} from '../../classes/Journey';
import {StationService} from '../../services/station.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  journey: Journey = new Journey();

  //@Output() updatedJourney = new EventEmitter<Journey>();

  constructor(private stationService: StationService) { }

  ngOnInit() {
  }

  submitJourney() {
    console.log("ok");//this.updatedJourney.emit(this.journey);
  }
}
