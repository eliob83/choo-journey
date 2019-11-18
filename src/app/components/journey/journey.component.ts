import {Component, OnInit} from '@angular/core';
import {Journey} from '../../classes/Journey';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  journey: Journey;

  constructor() {
  }

  ngOnInit() {
  }

}
