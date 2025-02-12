import Trip from "./Trip";
import { IDescription } from "./IDescription";

export default class Educational extends Trip implements IDescription {
  public getHappiness(): string {
    return `retorna conhecimento!`;
  }

  private schoolName!: string;

  constructor() {
    super();
  }
  showDescription(): void {
    console.log(``);
  }

  public getSchoolName(): string {
    return this.schoolName;
  }

  public setSchoolName(schoolName: string): void {
    this.schoolName = schoolName;
  }

  //Override
  public displayTrip(trip: Educational): void {
    console.log(
      `    Nome da escola: ${trip.getSchoolName()}
        
        `
    );
  }

  //Overload
  public displayTripSpec(trip: Educational): void {
    console.log(
      `    Nome da escola: ${trip.getSchoolName()}
          
          `
    );
  }
}
