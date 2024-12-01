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

    public displayGeneralAspects(trip: Trip){
        console.log(`
        
    Nome: ${trip.getName()}
    Moeda: ${trip.getCurrency()}
    Data de ida: ${trip.getStartDate()}
    Data de volta: ${trip.getFinishDate()}
    Orçamento: ${trip.getBudget()}`);
    }

    //overriding - sobrescrevendo método da classe mãe "displayTrip(trip)""
    public showAllTrips(){

        let allTrips = this.database.getAllTrips();

        allTrips.forEach((trip, index) => {

            console.log(`Dados da sua ${index + 1}ª viagem:`);

            if(trip instanceof Business){
                this.displayGeneralAspects(trip);
                trip.displayTrip(trip);
            }else if (trip instanceof Leisure){
                this.displayGeneralAspects(trip);
                trip.displayTrip(trip);
            }else if (trip instanceof Educational){
                this.displayGeneralAspects(trip);
                trip.displayTrip(trip);
            }            
        });
    }


    //Overload - primeiro criando as assinaturas e depois fazer o corpo do método

    /*  public displayTrip(trip: Leisure): Leisure;
        public displayTrip(trip: Business): Business;
        public displayTrip(trip: Educational): Educational; 
    */

    /*

        //criando o corpo do método
    public displayTrip(trip: Leisure | Business | Educational): Trip {
        if(trip instanceof Business){
            console.log(trip.getCompanyName());
        }
        else if (trip instanceof Educational){
            console.log(trip.getSchoolName());
        }
        else if (trip instanceof Leisure){
            console.log(trip.getkindOfTrip());
        }
        else{
            console.log("Algo deu errado!");
        }

        return trip;
    }


    //retornando o array com todas as viagens
    public showAllTrips(){

        let allTrips = this.database.getAllTrips();

        allTrips.forEach((trip, index) => {

            console.log(`Dados da sua ${index + 1}ª viagem:`);
            this.displayGeneralAspects(trip);

            if(trip instanceof Business || trip instanceof Leisure || trip instanceof Educational){
                this.displayTrip(trip);
            }
                        
        });
    }
    */

}