import {Station} from './Station';


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
