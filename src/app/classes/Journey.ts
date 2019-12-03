import {Station} from './Station';

// Classification for each type of journeys
export enum JourneyType {
  UNDEFINED, ECOLOGICAL, FASTER
}

// Class for the date picker
export class JourneyDate {

  constructor(args: string) {
    const formated = JourneyDate.formatDate(args);

    this.day = formated[`day`];
    this.month = formated[`month`];
    this.year = formated[`year`];

    this.hour = formated[`hour`];
    this.minute = formated[`minute`];
    this.second = formated[`second`];
  }

  day: number;
  month: number;
  year: number;

  hour: number;
  minute: number;
  second: number;


  static formatDate(date: string) {
    const args = {};

    // Splits date string
    let splited = date.split('T')[0].split('-', 3);
    if (splited.length >= 3) {
      args[`day`] = splited[2];
      args[`month`] = splited[1];
      args[`year`] = splited[0];
    } else {
      args[`day`] = splited[0].substr(6, 4);
      args[`month`] = splited[0].substr(4, 2);
      args[`year`] = splited[0].substr(0, 4);
    }

    splited = date.split('T')[1].split(':', 3);
    if (splited.length >= 3) {
      args[`hour`] = splited[0];
      args[`minute`] = splited[1];
      args[`second`] = splited[2].substr(0, 2);
    } else {
      args[`hour`] = splited[0].substr(0, 2);
      args[`minute`] = splited[0].substr(2, 2);
      args[`second`] = splited[0].substr(4, 2);
    }

    return args;
  }

  // Date format 2019-11-01
  getYMD() {
    return this.year + '-' + this.month + '-' + this.day;
  }

  // Date format 01-11-2019
  getDMY() {
    return this.day + '-' + this.month + '-' + this.year;
  }

  // Date time
  getTime() {
    return this.hour + ':' + this.minute + ':' + this.second;
  }

  // Stringify
  toString() {
    return this.getYMD() + ' ' + this.getTime();
  }
}

// Main class journey
export class Journey {
  from: Station;
  to: Station;
  dateTime: JourneyDate;

  firstTransportation: string;
  lastTransportation: string;


  constructor(args: Array<any>) {
    console.log(args);
    this.from = new Station(args[`sections`][0][`from`]);
    this.to = new Station(args[`sections`][args[`sections`].length - 1][`to`]);
    this.dateTime = new JourneyDate(args[`sections`][args[`sections`].length - 1][`arrival_date_time`]);
  }
}
