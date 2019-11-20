import {Station} from './Station';

export enum Options {
  FROM,
  TO,
  SEARCH
}

export class Journey {
  from: Station;
  to: Station;
  dateTime: string;
  firstTransportation: string;
  lastTransportation: string;

  constructor(args: Array<any>) {
    this.from = new Station(args[`sections`][0][`from`]);
    this.to = new Station(args[`sections`][args.length - 1][`to`]);
  }
}
