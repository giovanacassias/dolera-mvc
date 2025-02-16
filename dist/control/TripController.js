"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Business_1 = __importDefault(require("../model/Business"));
const Educational_1 = __importDefault(require("../model/Educational"));
const Leisure_1 = __importDefault(require("../model/Leisure"));
const MyError_1 = __importDefault(require("./service/MyError"));
const jspdf_1 = require("jspdf");
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
    //Tipos genéricos
    updateTrip(trip, property) {
        if (trip instanceof Leisure_1.default) {
            console.log(property);
            trip.setkindOfTrip(property);
            console.log("Tipo de viagem atualizado com sucesso!");
        }
        else if (trip instanceof Business_1.default) {
            trip.setCompanyName(property);
            console.log("Nome da empresa atualizado com sucesso!");
        }
        else if (trip instanceof Educational_1.default) {
            trip.setSchoolName(property);
            console.log("Nome da escola atualizado com sucesso!");
        }
        else {
            console.log("Algo está errado!!");
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
                        //trip.displayTrip(trip); //OVERRIDING - trip.displayTrip(trip);
                        this.displayTrip(trip); //OVERLOAD - this.displayTrip(trip);
                    }
                    else if (trip instanceof Leisure_1.default) {
                        this.displayGeneralAspects(trip);
                        //trip.displayTrip(trip); //OVERRIDING
                        this.displayTrip(trip); //OVERLOAD
                    }
                    else if (trip instanceof Educational_1.default) {
                        this.displayGeneralAspects(trip);
                        //trip.displayTrip(trip); //OVERRIDING
                        this.displayTrip(trip); //OVERLOAD
                    }
                });
            }
            else {
                console.log("Oops! Nenhuma viagem por aqui :( ");
            }
        }
        catch (error) {
            throw MyError_1.default;
        }
    }
    // Implementação do método
    displayTrip(trip) {
        if (trip instanceof Leisure_1.default) {
            trip.displayTripSpec(trip);
            return trip;
        }
        else if (trip instanceof Business_1.default) {
            trip.displayTripSpec(trip);
            return trip;
        }
        else if (trip instanceof Educational_1.default) {
            trip.displayTripSpec(trip);
            return trip;
        }
        else {
            console.log("Algo deu errado!");
            return trip;
        }
    }
    menuGeneralOptions() {
        console.log(`
        1. Nome
        2. Moeda
        3. Ida
        4. Volta
        5. Orçamento`);
    }
    menuSpecificOptionsLeisure() {
        console.log(`        6. Tipo de viagem`);
    }
    menuSpecificOptionsBusiness() {
        console.log(`        6. Nome da empresa`);
    }
    menuSpecificOptionsEducational() {
        console.log(`        6. Nome da escola`);
    }
    //Adaptado para teste
    deleteTrip(id) {
        //verificando se input é válido
        if (id < 1 || id > this.getAllTrips().length) {
            console.log("Número inválido! Tente novamente.");
            return "Número inválido! Tente novamente.";
        }
        else {
            let allTrips = this.getAllTrips();
            let index = id - 1;
            const tripName = allTrips[index].getName();
            allTrips.splice(index, 1);
            console.log("Viagem excluída!");
            return tripName;
        }
    }
    /*   ORIGINAL
  
      public deleteTrip(id: number): void {
      let allTrips: Trip[] = this.getAllTrips();
      let index = id - 1;
      allTrips.splice(index, 1);
      console.log("Viagem excluída!");
      }
      
    */
    generatePDF() {
        let allTrips = this.database.getAllTrips();
        const doc = new jspdf_1.jsPDF();
        let yPosition = 20; //posição inicial do texto
        doc.text(`RELATÓRIO DAS SUAS VIAGENS :)`, 10, yPosition);
        yPosition += 10; //ajustando a posição para o próximo texto
        if (allTrips.length === 0) {
            doc.text("Nenhuma viagem cadastrada :(", 10, yPosition);
            doc.save("relatorio-viagens.pdf");
            return;
        }
        //criando o conteúdo
        const tripData = allTrips.map((trip, index) => {
            return `
      
      Viagem ${index + 1}: 
      Destino: ${trip.getName()}
      Moeda: ${trip.getCurrency()}
      Ida: ${trip.getStartDate()}
      Volta: ${trip.getFinishDate()}
      Orçamento: ${trip.getBudget()}
      `;
        });
        //escrevendo as viagens no PDF
        tripData.forEach((tripDetails, index) => {
            doc.text(tripDetails, 10, yPosition);
            yPosition += 50;
        });
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20; // Reinicia a posição na nova página
        }
        doc.save("relatorio-viagens.pdf");
    }
}
exports.default = TripController;
