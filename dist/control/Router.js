"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
const PrimaryScreen_1 = __importDefault(require("../view/PrimaryScreen"));
const TripController_1 = __importDefault(require("./TripController"));
const TravelerController_1 = __importDefault(require("./TravelerController"));
class Router {
    constructor() {
        //Única instância de database do sistema
        this.database = new Database_1.default();
        //Instanciândo a tela inicial e mandando o próprio router como argumento para o construtor de PrimaryScreen
        this.primaryScreen = new PrimaryScreen_1.default(this);
        //Instanciando o controlador de 'trip' e enviando o banco de dados via argumento - é o controlador que irá interagir com o banco de dados
        this.tripController = new TripController_1.default(this.database);
        //Instanciando o controlador de 'traveler' e enviando o banco de dados via argumento - é o controlador que irá interagir com o banco de dados
        this.travelerController = new TravelerController_1.default(this.database);
        //PS.: para fazer os TESTES COM JEST COMENTAR A CHAMADA DE PRIMARY SCREEN!!
        let tripA = this.tripController.getNewLeisureTrip();
        tripA.setName("França");
        tripA.setCurrency("Euro");
        tripA.setBudget("100");
        tripA.setStartDate("05/05/2025");
        tripA.setFinishDate("31/05/2025");
        tripA.setkindOfTrip("Cultural");
        this.tripController.registerNewTrip(tripA);
        let tripB = this.tripController.getNewBusinessTrip();
        tripB.setName("PFI");
        tripB.setCurrency("Real");
        tripB.setBudget("150");
        tripB.setStartDate("20/03/2025");
        tripB.setFinishDate("25/03/2025");
        tripB.setCompanyName("Fundação Araucária");
        this.tripController.registerNewTrip(tripB);
        let tripC = this.tripController.getNewEducationalTrip();
        tripC.setName("Intercâmbio");
        tripC.setCurrency("Dólar");
        tripC.setBudget("200");
        tripC.setStartDate("23/09/2025");
        tripC.setFinishDate("23/09/2026");
        tripC.setSchoolName("Harvard");
        this.tripController.registerNewTrip(tripC);
        this.primaryScreen.getFirstScreen();
        //populando o banco para testes
    }
}
exports.default = Router;
