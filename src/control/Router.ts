import Database from "../db/Database";
import PrimaryScreen from "../view/PrimaryScreen";
import TripController from "./TripController";
import TravelerController from "./TravelerController";
import MyError from "./service/MyError";

export default class Router {
  //Única instância de database do sistema
  private database: Database = new Database();

  //Instanciândo a tela inicial e mandando o próprio router como argumento para o construtor de PrimaryScreen
  private primaryScreen: PrimaryScreen = new PrimaryScreen(this);

  //Instanciando o controlador de 'trip' e enviando o banco de dados via argumento - é o controlador que irá interagir com o banco de dados
  public tripController: TripController = new TripController(this.database);

  //Instanciando o controlador de 'traveler' e enviando o banco de dados via argumento - é o controlador que irá interagir com o banco de dados
  public travelerController: TravelerController = new TravelerController(
    this.database
  );

  constructor() {
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
