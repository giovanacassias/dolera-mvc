"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trip_1 = __importDefault(require("./Trip"));
class Business extends Trip_1.default {
    constructor() {
        super();
    }
    getHappiness() {
        return `retorna dinheiro que compra coisas que nos deixam felizes!`;
    }
    showDescription() {
        console.log("Essa classe é responsável por criar viagens de negócio");
    }
    getCompanyName() {
        return this.companyName;
    }
    setCompanyName(companyName) {
        this.companyName = companyName;
    }
    //Override
    displayTrip(trip) {
        console.log(`    Nome da empresa: ${trip.getCompanyName()}
        
        `);
    }
    //Overload
    displayTripSpec(trip) {
        console.log(`    Tipo de viagem: ${trip.getCompanyName()}
        
        `);
    }
}
exports.default = Business;
