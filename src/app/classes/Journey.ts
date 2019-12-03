import {Station} from './Station';

// Classification for each type of journeys
export enum JourneyType {
  UNDEFINED, FASTEST, COMFORT, RAPID, BEST
}

export enum JourneyStatus {
  UNDEFINED, NO_SERVICE, REDUCED_SERVICE, SIGNIFICANT_DELAYS, DETOUR, ADDITIONAL_SERVICE,
  MODIFIED_SERVICE, OTHER_EFFECT, UNKNOWN_EFFECT, STOP_MOVED
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

export class JourneySection {

}

// Main class journey
export class Journey {
  duration: number;
  nbTransfers: number;

  departureDateTime: JourneyDate;
  arrivalDateTime: JourneyDate;

  sections: JourneySection[];

  from: Station;
  to: Station;

  co2: number;
  fare: number;

  type: JourneyType;
  status: JourneyStatus;


  constructor(args: Array<any>) {
    this.duration = args[`duration`];
    this.nbTransfers = args[`nb_transfers`];

    this.departureDateTime = new JourneyDate(args[`departure_date_time`]);
    this.arrivalDateTime = new JourneyDate(args[`arrival_date_time`]);

    this.setSectionsFromArray(args[`sections`]);

    this.from = new Station(args[`from`]);
    this.to = new Station(args[`to`]);

    this.co2 = args[`co2_emission`][`value`];
    this.fare = (args[`fare`][`found`] ? args[`fare`][`total`] : -1);

    this.type = args[`type`];
    this.status = args[`status`];
    console.log(this);
  }

  setSectionsFromArray(args: Array<any>) {
    this.sections = new Array<JourneySection>();

    args.forEach(data => {
      /*if ((data[`from`][`embedded_type`] === 'stop_area' && data[`to`][`embedded_type`] === 'stop_point')) {
        if (data[`from`][`id`] === data[`to`][`stop_point`][`stop_area`][`id`]) {
          return;
        }
      } else if ((data[`to`][`embedded_type`] === 'stop_area' && data[`from`][`embedded_type`] === 'stop_point')) {
        if (data[`to`][`id`] === data[`from`][`stop_point`][`stop_area`][`id`]) {
          return;
        }
      }*/
      if (data[`duration`] === 0) {
        return;
      }

      this.sections.push(new JourneySection());
    });
  }
}

export class JourneyList {
  carAltCO2: number;
  journeys: Array<Journey>;

  constructor(args: {}) {
    this.journeys = new Array<Journey>();
    this.carAltCO2 = args[`context`][`car_direct_path`][`co2_emission`][`value`];

    if (args[`journeys`] !== undefined && args[`journeys`].length) {
      args[`journeys`].forEach(element => {
        this.journeys.push(new Journey(element));
      });
    }
  }
}
