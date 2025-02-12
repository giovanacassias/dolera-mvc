import Database from "../db/Database";
import Trip from "../model/Trip";
import Business from "../model/Business";
import Educational from "../model/Educational";
import Leisure from "../model/Leisure";
import MyError from "./service/MyError";
import { ITraveler } from "../model/ITraveler";
import Traveler from "../model/Traveler";

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

  /*   public updateTrip() {
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
  } */

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
            //trip.displayTrip(trip); //OVERRIDING - trip.displayTrip(trip);
            this.displayTrip(trip); //OVERLOAD - this.displayTrip(trip);
          } else if (trip instanceof Leisure) {
            this.displayGeneralAspects(trip);
            //trip.displayTrip(trip); //OVERRIDING
            this.displayTrip(trip); //OVERLOAD
          } else if (trip instanceof Educational) {
            this.displayGeneralAspects(trip);
            //trip.displayTrip(trip); //OVERRIDING
            this.displayTrip(trip); //OVERLOAD
          }
        });
      } else {
        console.log("Oops! Nenhuma viagem por aqui :( ");
      }
    } catch (error: any) {
      throw MyError;
    }
  }

  //VERSÃO OVERLOAD

  public displayTrip(trip: Leisure): Leisure;
  public displayTrip(trip: Business): Business;
  public displayTrip(trip: Educational): Educational;

  // Implementação do método
  public displayTrip(
    trip: Leisure | Business | Educational
  ): Leisure | Business | Educational {
    if (trip instanceof Leisure) {
      trip.displayTripSpec(trip);

      return trip;
    } else if (trip instanceof Business) {
      trip.displayTripSpec(trip);
      return trip;
    } else if (trip instanceof Educational) {
      trip.displayTripSpec(trip);
      return trip;
    } else {
      console.log("Algo deu errado!");
      return trip;
    }
  }

  public menuGeneralOptions() {
    console.log(
      `
        1. Nome
        2. Moeda
        3. Ida
        4. Volta
        5. Orçamento`
    );
  }

  public menuSpecificOptionsLeisure() {
    console.log(`        6. Tipo de viagem`);
  }

  public menuSpecificOptionsBusiness() {
    console.log(`        6. Nome da empresa`);
  }

  public menuSpecificOptionsEducational() {
    console.log(`        6. Nome da escola`);
  }
}
