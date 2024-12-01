"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class TripScreen {
    constructor(router) {
        this.prompt = (0, prompt_sync_1.default)();
        this.router = router;
    }
    //HERANÇA - TENHO A CLASSE TRIP GENÉRICA E AS CLASSES FILHAS 'LEISURE', 'BUSINESS' E 'EDUCATIONAL' QUE CONTÉM ATRIBUTOS PRÓPRIOS
    registerTrip() {
        let kindOfTrip = this.prompt(`
            What kind of trip is it? Choose one option:
            1. Leisure
            2. Business
            3. Educational
        `);
        switch (kindOfTrip) {
            case "1":
                let tripLeisure;
                tripLeisure = this.router.tripController.getNewLeisureTrip();
                tripLeisure = this.getGeneralAspects(tripLeisure);
                console.log(tripLeisure);
                //povoar com dados específicos
                tripLeisure = this.getSpecificsLeisure(tripLeisure);
                console.log(tripLeisure);
                //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PARA A DATABASE E DA PUSH NO ARRAY
                this.router.tripController.registerNewTrip(tripLeisure);
                break;
            case "2":
                let tripBusiness;
                tripBusiness = this.router.tripController.getNewBusinessTrip();
                tripBusiness = this.getGeneralAspects(tripBusiness);
                tripBusiness = this.getSpecificsBusiness(tripBusiness);
                console.log(tripBusiness);
                //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PAtRA A DATABASE E DA PUSH NO ARRAY
                this.router.tripController.registerNewTrip(tripBusiness);
                break;
            case "3":
                let tripEducational;
                tripEducational = this.router.tripController.getNewEducationalTrip();
                tripEducational = this.getGeneralAspects(tripEducational);
                tripEducational = this.getSpecificsEducational(tripEducational);
                console.log(tripEducational);
                //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PARA A DATABASE E DA PUSH NO ARRAY
                this.router.tripController.registerNewTrip(tripEducational);
                break;
            default:
                console.log("Opção inválida!");
                break;
        }
    }
    getGeneralAspects(trip) {
        let name, currency, startDate, finishDate, budget;
        name = this.prompt("Qual o nome da sua viagem?");
        trip.setName(name);
        currency = this.prompt("Qual é a moeda usada?");
        trip.setCurrency(currency);
        startDate = this.prompt("Quando será o início da viagem?");
        trip.setStartDate(startDate);
        finishDate = this.prompt("Quando a viagem vai acabar?");
        trip.setFinishDate(finishDate);
        budget = this.prompt("Qual é o orçamento total para essa viagem?");
        trip.setBudget(budget);
        return trip;
    }
    getSpecificsLeisure(trip) {
        let kindOfTrip;
        kindOfTrip = this.prompt("Qual é o tipo da sua viagem de lazer?");
        trip.setkindOfTrip(kindOfTrip);
        return trip;
    }
    getSpecificsBusiness(trip) {
        let companyName;
        companyName = this.prompt("Qual é o nome da empresa referente à essa viagem?");
        trip.setCompanyName(companyName);
        return trip;
    }
    getSpecificsEducational(trip) {
        let schoolName;
        schoolName = this.prompt("Qual é o nome da instituição de ensino dessa viagem?");
        trip.setSchoolName(schoolName);
        return trip;
    }
    listAllTrips() {
    }
}
exports.default = TripScreen;
