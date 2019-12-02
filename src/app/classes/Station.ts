import { ThrowStmt } from '@angular/compiler';

export enum StationType {
    UNDEFINED,
    AIR,
    BOAT,
    BUS,
    TRAIN,
    METRO,
    TAXI,
    FUNICULAR
}

export class Station {
    id: string;
    name: string;
    label: string;

    lat: number;
    lon: number;

    city: string;
    zipCode: string;

    code: string;
    types: StationType[];


    constructor(args: Array<any>) {
        if (args === null) {
            return;
        }
        console.log(args);

        this.id = args[`id`];
        this.name = args[`name`];
        this.label = args[`stop_area`][`name`];

        this.city = this.setParamFromArray(args, [`stop_area`, `administrative_regions`, 0, `name`]);
        this.zipCode = this.setParamFromArray(args, [`stop_area`, `administrative_regions`, 0, `zip_code`]);

        this.lat = +args[`stop_area`][`coord`][`lat`];
        this.lon = +args[`stop_area`][`coord`][`lon`];

        this.code = args[`stop_area`][`codes`][0].value;

        this.types = new Array<StationType>();
        args[`stop_area`][`physical_modes`].forEach(element => {
            const type = Station.getTypeFromString(element.id);

            if (!this.types.includes(type)) {
                this.types.push(type);
            }
        });
    }

    static getTypeFromString(str: string) {
        switch (str.split(':')[1]) {
            case 'Air':
                return StationType.AIR;

            case 'Boat':
            case 'Ferry':
                return StationType.BOAT;

            case 'Bus':
            case 'BusRapidTransit':
            case 'Coach':
            case 'Shuttle':
            case 'Tramway':
                return StationType.BUS;

            case 'LocalTrain':
            case 'LongDistanceTrain':
            case 'RailShuttle':
            case 'Train':
                return StationType.TRAIN;

            case 'Metro':
            case 'RapidTransit':
                return StationType.METRO;

            case 'Taxi':
                return StationType.TAXI;

            case 'Funicular':
            case 'SuspendedCableCar':
                return StationType.FUNICULAR;

            default:
                return StationType.UNDEFINED;
        }
    }

    // Browse each args given and test them one after the other to access wanted value
    setParamFromArray(arr: Array<any>, args: Array<any>): string {
        let cur = arr;

        for (const element of args) {
            cur = cur[element];

            if (cur === undefined) {
                return undefined;
            }
        }

        return cur.toString();
    }

    getMainType() {
        if (this.types.includes(StationType.TRAIN)) {
            return StationType.TRAIN;
        } else if (this.types.includes(StationType.BUS)) {
            return StationType.BUS;
        } else if (this.types.includes(StationType.METRO)) {
            return StationType.METRO;
        }

        return this.types[0];
    }

    getIconMainType() {
        return 'fa' + this.getMainType().toString();
    }
/*
    // Set Station type depending on stop_area code
    setType(code: string) {
        switch (code.slice(-2)) {
            case 'BV':
                this.type = StationType.TRAIN_STATION;
                break;

            case 'HR':
                this.type = StationType.BUS_STATION;
                break;

            default:
                this.type = StationType.UNDEFINED;
        }
    }*/
}
