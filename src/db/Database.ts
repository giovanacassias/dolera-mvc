import Trip from "../model/Trip";

export default class Database {

    private trips: any[] = [];

    //recebendo um objeto de trip e guardando dentro do array 'trips'
    public addNewTrip(trip: any): void {
        this.trips.push(trip);
        console.log(this.trips);
    }

    

}