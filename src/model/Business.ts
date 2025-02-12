import Educational from "./Educational";
import Leisure from "./Leisure";
import Trip from "./Trip";
import { IDescription } from "./IDescription";

export default class Business extends Trip implements IDescription {
  public getHappiness(): string {
    return `retorna dinheiro que compra coisas que nos deixam felizes!`;
  }
  private companyName!: string;

  constructor() {
    super();
  }

  showDescription(): void {
    console.log("Essa classe é responsável por criar viagens de negócio");
  }

  public getCompanyName(): string {
    return this.companyName;
  }

  public setCompanyName(companyName: string): void {
    this.companyName = companyName;
  }

  //Override
  public displayTrip(trip: Business): void {
    console.log(
      `    Nome da empresa: ${trip.getCompanyName()}
        
        `
    );
  }

  //Overload
  public displayTripSpec(trip: Business): void {
    console.log(
      `    Tipo de viagem: ${trip.getCompanyName()}
        
        `
    );
  }
}
