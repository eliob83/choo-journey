import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Journey} from '../../classes/Journey';
import {StationServiceService} from '../../services/station-service.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  private Sss: StationServiceService;

  @Input() journey: Journey;

  @Output() updatedJourney = new EventEmitter<Journey>();

  constructor(stationService: StationServiceService) {
    this.Sss = stationService;
  }

  ngOnInit() {
  }

  submitJourney() {
    this.updatedJourney.emit(this.journey);
  }

}
