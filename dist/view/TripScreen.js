"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Leisure_1 = __importDefault(require("../model/Leisure"));
const Business_1 = __importDefault(require("../model/Business"));
const Educational_1 = __importDefault(require("../model/Educational"));
class TripScreen {
    constructor(router) {
        this.prompt = (0, prompt_sync_1.default)();
        this.router = router;
    }
    //HERANÇA - TENHO A CLASSE TRIP GENÉRICA E AS CLASSES FILHAS 'LEISURE', 'BUSINESS' E 'EDUCATIONAL' QUE CONTÉM ATRIBUTOS PRÓPRIOS
    registerTrip() {
        let kindOfTrip = this.prompt(`
            Qual o tipo da sua viagem? Escolha uma das opções:
            1. Lazer
            2. Trabalho
            3. Estudo
        `);
        switch (kindOfTrip) {
            case "1":
                let tripLeisure;
                tripLeisure = this.router.tripController.getNewLeisureTrip();
                tripLeisure = this.getGeneralAspects(tripLeisure);
                //povoar com dados específicos
                tripLeisure = this.getSpecificsLeisure(tripLeisure);
                //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PARA A DATABASE E DA PUSH NO ARRAY
                this.router.tripController.registerNewTrip(tripLeisure);
                break;
            case "2":
                let tripBusiness;
                tripBusiness = this.router.tripController.getNewBusinessTrip();
                tripBusiness = this.getGeneralAspects(tripBusiness);
                tripBusiness = this.getSpecificsBusiness(tripBusiness);
                //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PAtRA A DATABASE E DA PUSH NO ARRAY
                this.router.tripController.registerNewTrip(tripBusiness);
                break;
            case "3":
                let tripEducational;
                tripEducational = this.router.tripController.getNewEducationalTrip();
                tripEducational = this.getGeneralAspects(tripEducational);
                tripEducational = this.getSpecificsEducational(tripEducational);
                //console.log(tripEducational);
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
        //resposta: string,
        //traveler: Traveler;
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
        /* resposta = this.prompt(`Você está viajando com mais alguém?
                1. sim
                2. não`
            );
    
            switch(resposta){
                case "1":
                traveler = this.router.travelerController.newTraveler();
                let name = this.prompt("Qual é o nome do viajante?");
                traveler.setName(name);
                
            }; */
        return trip;
    }
    getSpecificsLeisure(trip) {
        let kindOfTrip;
        kindOfTrip = this.prompt("Qual é o tipo da sua viagem de lazer? Aventura, cultural, gastronômico, etc.?");
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
        this.router.tripController.showAllTrips();
    }
    updateTrip() {
        //obtendo todas as viagens registradas no 'banco'
        let allTrips = this.router.tripController.getAllTrips();
        //mostrando todas as viagens na tela para o user
        this.router.tripController.showAllTrips();
        //descobrindo qual viagem o user quer editar
        if (allTrips.length != 0) {
            let tripToEdit = parseInt(this.prompt(`Digite o número da viagem que você deseja selecionar:
            `));
            //verificando se o input é válido
            if (tripToEdit < 1 || tripToEdit > allTrips.length) {
                console.log(`
          ${tripToEdit} não é um id de viagem válido! Tente novamente
          `);
            }
            else {
                //atualizando de 1-based (user) para 0-based (array)
                tripToEdit = tripToEdit - 1;
                let tripToUpdate = allTrips[tripToEdit];
                console.log(`
          Você deseja editar a viagem chamada ${tripToUpdate.getName()}
          O que você deseja alterar?
          
          `);
                //terá um método para editar as propriedades gerais e 3 overloads pois serão parâmetros diferentes
                if (tripToUpdate instanceof Leisure_1.default) {
                    //chamar método que irá editar as propriedades de Leisure
                    //this.router.tripController.updateTrip(allTrips[tripToEdit]);
                    this.router.tripController.menuGeneralOptions();
                    this.router.tripController.menuSpecificOptionsLeisure();
                    let answer = parseInt(this.prompt(`
            
            Digite o número da opção: `));
                }
                else if (tripToUpdate instanceof Business_1.default) {
                    //chamar método que irá editar as propriedade de Business
                }
                else if (tripToUpdate instanceof Educational_1.default) {
                    //chamar método que irá editar as propriedades de Educational
                }
                else {
                    console.log("Algo deu muito errado aqui!");
                }
            }
        }
        else {
            console.log("Você não possui nenhuma viagem ainda :( Que tal adicionar uma? ");
        }
        //this.router.tripController.updateTrip();
    }
    //Pesquisa especializada no banco de dados
    searchTrip() {
        let trips = this.router.tripController.getAllTrips();
        let amount = Number.parseInt(this.prompt(`
      Pesquisar por viagens com orçamento maior ou igual a:
      
      `));
        trips.forEach((trip) => {
            if (Number.parseInt(trip.getBudget()) >= amount) {
                let name = trip.getName();
                let budget = trip.getBudget();
                console.log(`${name}: R$${budget}`);
            }
        });
    }
}
exports.default = TripScreen;
