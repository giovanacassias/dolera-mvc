import Trip from "../model/Trip";

export default class Database {

    private allTheTrips: Trip[] = [];

    //recebendo um objeto de trip e guardando dentro do array 'allTheTrips'
    public addNewTrip(trip: Trip): void {
        this.allTheTrips.push(trip);
        console.log(this.allTheTrips);
    }

    public getAllTrips(): Trip[] {
        console.log(this.allTheTrips);
        return this.allTheTrips;
    }

}