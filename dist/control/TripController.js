"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Business_1 = __importDefault(require("../model/Business"));
const Educational_1 = __importDefault(require("../model/Educational"));
const Leisure_1 = __importDefault(require("../model/Leisure"));
class TripController {
    //recebendo a instância de database, vinda do Router, via construtor;
    constructor(database) {
        this.database = database;
    }
    getNewBusinessTrip() {
        return new Business_1.default();
    }
    getNewEducationalTrip() {
        return new Educational_1.default();
    }
    getNewLeisureTrip() {
        return new Leisure_1.default();
    }
    //guardando uma instância de trip no banco de dados
    registerNewTrip(trip) {
        this.database.addNewTrip(trip);
    }
    displayGeneralAspects(trip) {
        console.log(`
        
    Nome: ${trip.getName()}
    Moeda: ${trip.getCurrency()}
    Data de ida: ${trip.getStartDate()}
    Data de volta: ${trip.getFinishDate()}
    Orçamento: ${trip.getBudget()}`);
    }
    //overriding - sobrescrevendo método da classe mãe
    showAllTrips() {
        let allTrips = this.database.getAllTrips();
        allTrips.forEach((trip, index) => {
            console.log(`Dados da sua ${index + 1}ª viagem:`);
            if (trip instanceof Business_1.default) {
                this.displayGeneralAspects(trip);
                trip.displayTrip(trip);
            }
            else if (trip instanceof Leisure_1.default) {
                this.displayGeneralAspects(trip);
                trip.displayTrip(trip);
            }
            else if (trip instanceof Educational_1.default) {
                this.displayGeneralAspects(trip);
                trip.displayTrip(trip);
            }
        });
    }
}
exports.default = TripController;
