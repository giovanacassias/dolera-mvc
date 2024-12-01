import Educational from "./Educational";
import Leisure from "./Leisure";
import Trip from "./Trip";

export default class Business extends Trip {

    private companyName!: string;

    constructor(){
        super();
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
        
        `);
    }
}