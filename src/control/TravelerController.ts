import Traveler from "../model/Traveler";
import Database from "../db/Database";
import { ITraveler } from "../model/ITraveler";

export default class TravelerController implements ITraveler {
    private database!: Database;

    //recebendo a instância de database, vinda do Router, via construtor;
    constructor(database: Database){
        this.database = database;
    }
    addTraveler(traveler: Traveler): void {
       
    }

    public newTraveler(): Traveler {
        return new Traveler();
    }

}