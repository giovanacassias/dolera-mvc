import Database from "../db/Database";
import Trip from "../model/Trip";
import Business from "../model/Business";
import Educational from "../model/Educational";
import Leisure from "../model/Leisure";

export default class TripController {
  private database!: Database;

  //recebendo a instância de database, vinda do Router, via construtor;
  constructor(database: Database) {
    this.database = database;
  }

  public getNewBusinessTrip(): Business {
    return new Business();
  }

  public getNewEducationalTrip(): Educational {
    return new Educational();
  }

  public getNewLeisureTrip(): Leisure {
    return new Leisure();
  }

  public getAllTrips(): Trip[] {
    return this.database.getAllTrips();
  }

  //guardando uma instância de trip no banco de dados
  public registerNewTrip(trip: Trip): void {
    this.database.addNewTrip(trip);
  }

  public updateTrip() {
    let allTrips: Trip[] = this.database.getAllTrips();

    try {
      if (allTrips.length != 0) {
        //
      } else {
        console.log("Oops! Nenhuma viagem para atualizar :( ");
      }
    } catch (error: any) {
      console.error("Um erro aconteceu: ", error.message);
    }
  }

  public displayGeneralAspects(trip: Trip) {
    console.log(`
        
    Nome: ${trip.getName()}
    Moeda: ${trip.getCurrency()}
    Data de ida: ${trip.getStartDate()}
    Data de volta: ${trip.getFinishDate()}
    Orçamento: ${trip.getBudget()}`);
  }

  //VERSÃO OVERRIDING - sobrescrevendo método da classe mãe "displayTrip(trip)"
  public showAllTrips() {
    let allTrips: Trip[] = this.database.getAllTrips();

    try {
      if (allTrips.length != 0) {
        allTrips.forEach((trip, index) => {
          console.log(`Dados da sua ${index + 1}ª viagem:`);

          if (trip instanceof Business) {
            this.displayGeneralAspects(trip);
            trip.displayTrip(trip); //OVERRIDING
          } else if (trip instanceof Leisure) {
            this.displayGeneralAspects(trip);
            trip.displayTrip(trip); //OVERRIDING
          } else if (trip instanceof Educational) {
            this.displayGeneralAspects(trip);
            trip.displayTrip(trip); //OVERRIDING
          }
        });
      } else {
        console.log("Oops! Nenhuma viagem por aqui :( ");
      }
    } catch (error: any) {
      console.error("Um erro aconteceu: ", error.message);
    }
  }

  /*   //VERSÃO OVERLOAD

  public displayTrip(trip: Leisure): Leisure;
  public displayTrip(trip: Business): Business;
  public displayTrip(trip: Educational): Educational;

  // Implementação do método
  public displayTrip(
    trip: Leisure | Business | Educational
  ): Leisure | Business | Educational {
    if (trip instanceof Leisure) {
      console.log(trip.getkindOfTrip());
      return trip;
    } else if (trip instanceof Business) {
      console.log(trip.getCompanyName());
      return trip;
    } else if (trip instanceof Educational) {
      console.log(trip.getSchoolName());
      return trip;
    } else {
      console.log("Algo deu errado!");
      return trip;
    }
  } */
}
