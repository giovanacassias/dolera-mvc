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
        this.primaryScreen.getFirstScreen();
    }
}
exports.default = Router;
