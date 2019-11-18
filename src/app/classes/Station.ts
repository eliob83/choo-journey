enum StationType {
    UNDEFINED,
    TRAIN_STATION
}

export class Station {
    id: string;
    name: string;

    lat: string;
    lon: string;


    type: StationType;



    constructor(args: Array<any>) {
        if (args === null) {
            this.name = 'lol';
            return;
        }

        this.id = args[`id`];
        this.name = args[`name`];

        this.lat = args[`stop_area`][`coord`][`lat`];
        this.lon = args[`stop_area`][`coord`][`lon`];

        this.setTypeFromCode(args[`stop_area`][`codes`][0].value);
    }

    setTypeFromCode(code: string) {
        switch (code.slice(-2)) {
            case 'BV':
                this.type = StationType.TRAIN_STATION;
                break;

            default:
                this.type = StationType.UNDEFINED;
        }
    }
}
