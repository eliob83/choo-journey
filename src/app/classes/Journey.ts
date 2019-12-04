import {Station} from './Station';


// Classification for each type of journey
export enum JourneyType {
  UNDEFINED, FASTEST, COMFORT, RAPID, BEST
}

// Current status of the journey
export enum JourneyStatus {
  UNDEFINED, NO_SERVICE, REDUCED_SERVICE, SIGNIFICANT_DELAYS, DETOUR, ADDITIONAL_SERVICE,
  MODIFIED_SERVICE, OTHER_EFFECT, UNKNOWN_EFFECT, STOP_MOVED
}

// Type of the journey's section
export enum JourneyTransport {
  UNDEFINED, WALKING, TRAIN, BUS
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

    // Splits time part
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

  // Date format YYYY-MM-DD
  getYMD() {
    return this.year + '-' + this.month + '-' + this.day;
  }

  // Date format DD-MM-YYYY
  getDMY() {
    return this.day + '-' + this.month + '-' + this.year;
  }

  // Time format HH:MM:SS
  getTime() {
    return this.hour + ':' + this.minute + ':' + this.second;
  }

  // Time format XXhYY
  getShortTime() {
    return this.hour + 'h' + this.minute;
  }


  // Stringify
  toString() {
    return this.getYMD() + ' ' + this.getTime();
  }

  // Litteral stringify
  getText() {
    return this.getYMD() + ' à ' + this.getTime();
  }

  // Get as Date format
  toDate() {
    return this.getYMD() + 'T' + this.getTime();
  }
}


export class JourneySection {

  constructor(args: Array<any>) {
    this.from = new Station(args[`from`]);
    this.to = new Station(args[`to`]);

    this.departureDateTime = new JourneyDate(args[`departure_date_time`]);
    this.arrivalDateTime = new JourneyDate(args[`arrival_date_time`]);

    if (args[`display_informations`] !== undefined) {
      this.headsign = args[`display_informations`][`headsign`];
      this.name = args[`display_informations`][`name`];
      this.commercialMode = args[`display_informations`][`commercial_mode`];
      this.direction = args[`display_informations`][`direction`];
    } else {
      this.headsign = this.name = this.commercialMode = this.direction = undefined;
    }

    this.duration = args[`duration`];
    this.status = args[`type`];
    // In case of walking transfer
    if (this.status === 'transfer') {
      this.status = args[`transfer_type`];
    }
  }

  from: Station;
  to: Station;

  departureDateTime: JourneyDate;
  arrivalDateTime: JourneyDate;

  headsign: string;
  name: string;
  commercialMode: string;
  direction: string;

  duration: number;
  status: string;
}

// Main class journey
export class Journey {

  constructor(args: Array<any>) {
    this.duration = args[`duration`];
    this.walkingDuration = args[`durations`][`walking`];
    this.nbTransfers = args[`nb_transfers`];

    this.setSectionsFromArray(args[`sections`]);

    this.from = new Station(args[`from`]);
    this.to = new Station(args[`to`]);

    this.co2 = args[`co2_emission`][`value`];
    this.fare = (args[`fare`][`found`] ? args[`fare`][`total`] : -1);

    this.type = args[`type`];
    this.status = args[`status`];
  }

  duration: number;
  walkingDuration: number;
  nbTransfers: number;

  sections: JourneySection[];

  from: Station;
  to: Station;

  co2: number;
  fare: number;

  type: JourneyType;
  status: JourneyStatus;

  // Return if stations given are equal (id-wise)
  static areStationsEqual(from: Array<any>, to: Array<any>) {
    if (from === undefined || to === undefined) {
      return false;
    }

    (['stop_point', 'stop_area', 'id']).forEach(str => {
      if (from[str] === undefined || to[str] === undefined) {
        return false;
      }
      from = from[str];
      to = to[str];
    });

    return (from === to);
  }

  getDepartureDateTime() {
    return (this.sections.length > 0) ? this.sections[0].departureDateTime : undefined;
  }

  getArrivalDateTime() {
    return (this.sections.length > 0) ? this.sections[this.sections.length - 1].arrivalDateTime : undefined;
  }

  // Set sections array from JSON array
  setSectionsFromArray(args: Array<any>) {
    this.sections = new Array<JourneySection>();

    args.forEach(data => {
      // If no duration or equal stations, skip this section
      if (data[`duration`] === 0 || Journey.areStationsEqual(data[`from`], data[`to`])) {
        return;
      }

      this.sections.push(new JourneySection(data));
    });
  }
}


export class JourneyList {

  constructor(args: {}) {
    this.journeys = new Array<Journey>();
    this.carAltCO2 = (args[`context`][`car_direct_path`] !== undefined) ? args[`context`][`car_direct_path`][`co2_emission`][`value`] : -1;

    if (args[`journeys`] !== undefined && args[`journeys`].length) {
      args[`journeys`].forEach(element => {
        this.journeys.push(new Journey(element));
      });
    }
  }

  carAltCO2: number;
  journeys: Array<Journey>;
}
