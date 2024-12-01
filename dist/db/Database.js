"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor() {
        this.allTheTrips = [];
    }
    //recebendo um objeto de trip e guardando dentro do array 'allTheTrips'
    addNewTrip(trip) {
        this.allTheTrips.push(trip);
        console.log(this.allTheTrips);
    }
    getAllTrips() {
        console.log(this.allTheTrips);
        return this.allTheTrips;
    }
}
exports.default = Database;
