"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor() {
        this.trips = [];
    }
    //recebendo um objeto de trip e guardando dentro do array 'trips'
    addNewTrip(trip) {
        this.trips.push(trip);
        console.log(this.trips);
    }
}
exports.default = Database;
