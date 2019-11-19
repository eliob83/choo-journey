export enum StationType {
    UNDEFINED,
    TRAIN_STATION,
    BUS_STATION
}

export class Station {
    id: string;
    name: string;
    label: string;

    lat: string;
    lon: string;

    city: string;
    zipCode: string;

    type: StationType;



    constructor(args: Array<any>) {
        if (args === null) {
            this.name = 'lol';
            return;
        }

        this.id = args[`id`];
        this.name = args[`name`];
        this.label = args[`stop_area`][`name`];

        this.city = args[`stop_area`][`administrative_regions`][0][`name`];
        this.zipCode = args[`stop_area`][`administrative_regions`][0][`zip_code`];

        this.lat = args[`stop_area`][`coord`][`lat`];
        this.lon = args[`stop_area`][`coord`][`lon`];

        this.setTypeFromCode(args[`stop_area`][`codes`][0].value);
    }

    setTypeFromCode(code: string) {
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
    }
}
