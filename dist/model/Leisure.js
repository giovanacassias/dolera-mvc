"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trip_1 = __importDefault(require("./Trip"));
class Leisure extends Trip_1.default {
    constructor() {
        super();
    }
    getHappiness() {
        return `Retorna felicidade pura!!`;
    }
    getkindOfTrip() {
        return this.kindOfTrip;
    }
    setkindOfTrip(kindOfTrip) {
        this.kindOfTrip = kindOfTrip;
    }
    //Override
    displayTrip(trip) {
        console.log(`    Tipo de viagem: ${trip.getkindOfTrip()}
        
        `);
    }
    //Overload
    displayTripSpec(trip) {
        console.log(`    Tipo de viagem: ${trip.getkindOfTrip()}
        
        `);
    }
}
exports.default = Leisure;
