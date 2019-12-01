import {Station} from './Station';


export class JourneyDate {
  day: number;
  month: number;
  year: number;

  hour: number;
  minute: number;
  second: number;

  constructor(args: {}) {
    this.day = args[`day`];
    this.month = args[`month`];
    this.year = args[`year`];

    this.hour = args[`hour`];
    this.minute = args[`minute`];
    this.second = args[`second`];
  }

  getYMD() {
    return this.year + '-' + this.month + '-' + this.day;
  }

  getDMY() {
    return this.day + '-' + this.month + '-' + this.year;
  }

  getTime() {
    return this.hour + ':' + this.minute + ':' + this.second;
  }

  toString() {
    return this.getYMD() + ' ' + this.getTime();
  }
}

export class Journey {
  from: Station;
  to: Station;
  dateTime: string;

  firstTransportation: string;
  lastTransportation: string;


  constructor(args: Array<any>) {
    this.from = new Station(args[`sections`][0][`from`]);
    this.to = new Station(args[`sections`][args[`sections`].length - 1][`to`]);
  }
}
