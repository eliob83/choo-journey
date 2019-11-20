import {Component, OnInit} from '@angular/core';
import {Journey, Options} from '../../classes/Journey';
import {JourneyService} from '../../services/journey.service';
import {Station} from '../../classes/Station';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {

  Options = Options;
  journeys: Array<Journey> = [];

  stationFrom: Station = new Station(null);
  stationTo: Station = new Station(null);
  dateJourney = '';
  journey: [string, string, string] = [this.stationFrom.id, this.stationTo.id, this.dateJourney];
  idWait = 0;

  maxScroll = 10;
  nbJourneys = 10;

  today: Date;
  placeholderDate: string;

  constructor(private journeyService: JourneyService) {
    journeyService.journeySubjects.subscribe(data => {
      this.journeys = data;
    });
  }

  ngOnInit() {
    this.today = new Date();
    this.placeholderDate = this.today.getFullYear() + '-' + this.today.getMonth() + '-' + this.today.getDate();
  }

  startSearchDelayed(str: string, opt: Options): void {
    this.idWait = setTimeout(() => this.journeyService.searchStation(str, 20, opt), 400);
    console.log(this.stationFrom);
  }

  stopSearchDelay(): void {
    console.log('Annulation du timeout ' + this.idWait);
    console.log(this.stationFrom);
    clearTimeout(this.idWait);
  }

  checkForm(): void {
    if (this.journey[0] !== '' && this.journey[1] !== '' && this.journey[2] !== '') {
      if (this.stationFrom.id !== null && this.stationTo.id !== null) {
        this.reformatDate(this.journey[2]);
        this.submitJourney(this.journey);
      }
    } else {
      console.log('NON');
    }
  }

  submitJourney(journey): void {
    this.journeyService.searchJourney(journey, this.nbJourneys);
  }

  reformatDate(str: string): string {
    const strTab = str.split('-', 3);
    return strTab[0] + strTab[1] + strTab[2];
  }
}
