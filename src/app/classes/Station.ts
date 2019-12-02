export enum StationType {
    UNDEFINED,
    TRAIN_STATION,
    BUS_STATION
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
    type: StationType;


    constructor(args: Array<any>) {
        if (args === null) {
            return;
        }

        this.id = args[`id`];
        this.name = args[`name`];
        this.label = args[`stop_area`][`name`];

        this.city = this.setParamFromArray(args, [`stop_area`, `administrative_regions`, 0, `name`]);
        this.zipCode = this.setParamFromArray(args, [`stop_area`, `administrative_regions`, 0, `zip_code`]);

        this.lat = +args[`stop_area`][`coord`][`lat`];
        this.lon = +args[`stop_area`][`coord`][`lon`];

        this.code = args[`stop_area`][`codes`][0].value;
        this.setTypeFromCode(args[`stop_area`][`codes`][0].value);
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

    // Set Station type depending on stop_area code
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
