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
    getAllTrips() {
        return this.database.getAllTrips();
    }
    //guardando uma instância de trip no banco de dados
    registerNewTrip(trip) {
        this.database.addNewTrip(trip);
    }
    updateTrip() {
        let allTrips = this.database.getAllTrips();
        try {
            if (allTrips.length != 0) {
                //
            }
            else {
                console.log("Oops! Nenhuma viagem para atualizar :( ");
            }
        }
        catch (error) {
            console.error("Um erro aconteceu: ", error.message);
        }
    }
    displayGeneralAspects(trip) {
        console.log(`
        
    Nome: ${trip.getName()}
    Moeda: ${trip.getCurrency()}
    Data de ida: ${trip.getStartDate()}
    Data de volta: ${trip.getFinishDate()}
    Orçamento: ${trip.getBudget()}`);
    }
    //VERSÃO OVERRIDING - sobrescrevendo método da classe mãe "displayTrip(trip)"
    showAllTrips() {
        let allTrips = this.database.getAllTrips();
        try {
            if (allTrips.length != 0) {
                allTrips.forEach((trip, index) => {
                    console.log(`Dados da sua ${index + 1}ª viagem:`);
                    if (trip instanceof Business_1.default) {
                        this.displayGeneralAspects(trip);
                        trip.displayTrip(trip); //OVERRIDING
                    }
                    else if (trip instanceof Leisure_1.default) {
                        this.displayGeneralAspects(trip);
                        trip.displayTrip(trip); //OVERRIDING
                    }
                    else if (trip instanceof Educational_1.default) {
                        this.displayGeneralAspects(trip);
                        trip.displayTrip(trip); //OVERRIDING
                    }
                });
            }
            else {
                console.log("Oops! Nenhuma viagem por aqui :( ");
            }
        }
        catch (error) {
            console.error("Um erro aconteceu: ", error.message);
        }
    }
}
exports.default = TripController;
