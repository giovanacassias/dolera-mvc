import Database from "../db/Database";
import Trip from "../model/Trip";
import Business from "../model/Business";
import Educational from "../model/Educational";
import Leisure from "../model/Leisure";
import MyError from "./service/MyError";
import { ITraveler } from "../model/ITraveler";
import Traveler from "../model/Traveler";
import { jsPDF } from "jspdf";

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

  //Tipos genéricos
  public updateTrip<T>(trip: T, property: string): void {
    if (trip instanceof Leisure) {
      console.log(property);
      trip.setkindOfTrip(property);
      console.log("Tipo de viagem atualizado com sucesso!");
    } else if (trip instanceof Business) {
      trip.setCompanyName(property);
      console.log("Nome da empresa atualizado com sucesso!");
    } else if (trip instanceof Educational) {
      trip.setSchoolName(property);
      console.log("Nome da escola atualizado com sucesso!");
    } else {
      console.log("Algo está errado!!");
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
          } else {
            throw MyError.invalidType();
          }
        });
      } else {
        console.log("Oops! Nenhuma viagem por aqui :( ");
      }
    } catch (error: any) {
      console.log(`Um erro aconteceu: ${error.message}`);
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

  //Adaptado para teste

  public deleteTrip(id: number): string {
    //verificando se input é válido
    if (id < 1 || id > this.getAllTrips().length) {
      console.log("Número inválido! Tente novamente.");
      return "Número inválido! Tente novamente.";
    } else {
      let allTrips: Trip[] = this.getAllTrips();
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

  public generatePDF() {
    let allTrips = this.database.getAllTrips();
    const doc = new jsPDF();
    let yPosition = 20; //posição inicial do texto

    doc.text(`RELATÓRIO DAS SUAS VIAGENS :)`, 10, yPosition);
    yPosition += 10; //ajustando a posição para o próximo texto

    if (allTrips.length === 0) {
      doc.text("Nenhuma viagem cadastrada :(", 10, yPosition);
      doc.save("relatorio-viagens.pdf");
      return;
    }

    //escrevendo as viagens no PDF
    allTrips.forEach((trip, index) => {
      let tripDetails = `
        VIAGEM ${index + 1} 
        Nome: ${trip.getName()}
        Moeda: ${trip.getCurrency()}
        Ida: ${trip.getStartDate()}
        Volta: ${trip.getFinishDate()}
        Orçamento: R$${trip.getBudget()}`;

      if (trip instanceof Leisure) {
        tripDetails += `
        Tipo de viagem: ${trip.getkindOfTrip()}
        `;
      } else if (trip instanceof Business) {
        tripDetails += `
        Nome da empresa: ${trip.getCompanyName()}
        `;
      } else if (trip instanceof Educational) {
        tripDetails += `
        Nome da escola: ${trip.getSchoolName()}
        `;
      }

      doc.text(tripDetails, 10, yPosition);
      yPosition += 60;
    });

    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20; // Reinicia a posição na nova página
    }

    doc.save("relatorio-viagens.pdf");

    console.log("Relatório gerado com sucesso!");
  }
}
