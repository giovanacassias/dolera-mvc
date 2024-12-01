import Trip from "./Trip";

export default class Leisure extends Trip {
    
    private kindOfTrip!: string;

    constructor(){
        super();
    }

    public getkindOfTrip(): string {
        return this.kindOfTrip;
    }

    public setkindOfTrip(kindOfTrip: string): void {
        this.kindOfTrip = kindOfTrip;
    }
}