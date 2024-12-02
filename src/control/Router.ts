import Database from "../db/Database";
import PrimaryScreen from "../view/PrimaryScreen";
import TripController from "./TripController";
import TravelerController from "./TravelerController";

export default class Router {

    //Única instância de database do sistema
    private database: Database = new Database();

    //Instanciândo a tela inicial e mandando o próprio router como argumento para o construtor de PrimaryScreen
    private primaryScreen: PrimaryScreen = new PrimaryScreen(this);

    //Instanciando o controlador de 'trip' e enviando o banco de dados via argumento - é o controlador que irá interagir com o banco de dados
    public tripController: TripController = new TripController(this.database);

    //Instanciando o controlador de 'traveler' e enviando o banco de dados via argumento - é o controlador que irá interagir com o banco de dados
    public travelerController: TravelerController = new TravelerController(this.database);

    constructor(){
        this.primaryScreen.getFirstScreen();
    }


}