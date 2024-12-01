import Database from "../db/Database";
import Trip from "../model/Trip";
import Business from "../model/Business";
import Educational from "../model/Educational"; 
import Leisure from "../model/Leisure";

export default class TripController {

    private database!: Database;

    //recebendo a instância de database, vinda do Router, via construtor;
    constructor(database: Database){
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

    //guardando uma instância de trip no banco de dados
    public registerNewTrip(trip: Trip): void {
        this.database.addNewTrip(trip);
    }

    //retornando o array com todas as viagens
    public showAllTrips(){
        
    }
}