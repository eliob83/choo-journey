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

    constructor(args: Array<any>) {
        if (args === null || args === undefined) {
            return;
        }

        // Allow use of stop_area and stop_point
        if (args[`stop_area`] === undefined) {
            args = args[`stop_point`];
        }

        this.id = args[`id`];
        this.name = args[`name`];
        this.label = args[`stop_area`][`name`];

        this.city = this.setParamFromArray(args, [`stop_area`, `administrative_regions`, 0, `name`]);
        this.zipCode = this.setParamFromArray(args, [`stop_area`, `administrative_regions`, 0, `zip_code`]);
        if (this.zipCode === undefined || this.zipCode === '') {
            this.zipCode = '00000';
        }

        this.lat = +args[`stop_area`][`coord`][`lat`];
        this.lon = +args[`stop_area`][`coord`][`lon`];

        this.code = args[`stop_area`][`codes`][0].value;

        this.types = new Array<StationType>();
        if (args[`stop_area`][`physical_modes`] !== undefined) {
            args[`stop_area`][`physical_modes`].forEach(element => {
                const type = Station.getTypeFromString(element.id);

                // If not included yet
                if (!this.types.includes(type)) {
                    this.types.push(type);
                }
            });
        }
    }

    id: string;
    name: string;
    label: string;

    lat: number;
    lon: number;

    city: string;
    zipCode: string;

    code: string;
    types: StationType[];

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

    // Return main type depending on priority
    getMainType() {
        if (this.types.includes(StationType.TRAIN)) {
            return StationType.TRAIN;
        } else if (this.types.includes(StationType.BUS)) {
            return StationType.BUS;
        } else if (this.types.includes(StationType.METRO)) {
            return StationType.METRO;
        }

        return (this.types.length > 0 ? this.types[0] : StationType.UNDEFINED);
    }

    // Return fontawesome variable name
    getIconMainType() {
        return 'fa' + this.getMainType().toString();
    }
}
