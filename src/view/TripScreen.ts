import PromptSync from "prompt-sync";
import Router from "../control/Router";
import Leisure from "../model/Leisure";
import Business from "../model/Business";
import Educational from "../model/Educational";
import Trip from "../model/Trip";
import Traveler from "../model/Traveler";

export default class TripScreen {

    private prompt = PromptSync();
    private router!: Router;

    constructor(router: Router){
        this.router = router;
    }

    //HERANÇA - TENHO A CLASSE TRIP GENÉRICA E AS CLASSES FILHAS 'LEISURE', 'BUSINESS' E 'EDUCATIONAL' QUE CONTÉM ATRIBUTOS PRÓPRIOS
    public registerTrip(): void {


        let kindOfTrip = this.prompt(`
            Qual o tipo da sua viagem? Escolha uma das opções:
            1. Lazer
            2. Trabalho
            3. Estudo
        `);

        switch(kindOfTrip){
            case "1":
                let tripLeisure: Leisure;
                tripLeisure = this.router.tripController.getNewLeisureTrip();
                tripLeisure = this.getGeneralAspects(tripLeisure) as Leisure;
                //console.log(tripLeisure);
                //povoar com dados específicos
                tripLeisure = this.getSpecificsLeisure(tripLeisure);
                console.log(tripLeisure);
                //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PARA A DATABASE E DA PUSH NO ARRAY
                this.router.tripController.registerNewTrip(tripLeisure);         
            break;

            case "2":
                let tripBusiness: Business;
                tripBusiness = this.router.tripController.getNewBusinessTrip();
                tripBusiness = this.getGeneralAspects(tripBusiness) as Business;
                tripBusiness = this.getSpecificsBusiness(tripBusiness);
                //console.log(tripBusiness);
                //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PAtRA A DATABASE E DA PUSH NO ARRAY
                this.router.tripController.registerNewTrip(tripBusiness);
            break;

            case "3":
                let tripEducational: Educational;
                tripEducational = this.router.tripController.getNewEducationalTrip();
                tripEducational = this.getGeneralAspects(tripEducational) as Educational;
                tripEducational = this.getSpecificsEducational(tripEducational);
                //console.log(tripEducational);
                //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PARA A DATABASE E DA PUSH NO ARRAY
                this.router.tripController.registerNewTrip(tripEducational);
            break;

            default:
                console.log("Opção inválida!");
            break;
        }
        
    }

    public getGeneralAspects(trip: Trip){

        let name: string, 
            currency: string, 
            startDate: string, 
            finishDate: string, 
            budget: string,
            resposta: string,
            traveler: Traveler;

            
        name = this.prompt("Qual o nome da sua viagem?");
        trip.setName(name);

        currency = this.prompt("Qual é a moeda usada?");
        trip.setCurrency(currency);

        startDate = this.prompt("Quando será o início da viagem?");
        trip.setStartDate(startDate);

        finishDate = this.prompt("Quando a viagem vai acabar?");
        trip.setFinishDate(finishDate);

        budget = this.prompt("Qual é o orçamento total para essa viagem?");
        trip.setBudget(budget);

        resposta = this.prompt(`Você está viajando com mais alguém? 
            1. sim
            2. não`
        );

        switch(resposta){
            case "1":
            traveler = this.router.travelerController.newTraveler();
            let name = this.prompt("Qual é o nome do viajante?");
            traveler.setName(name);
            
        };


        return trip;
    }

    public getSpecificsLeisure(trip: Leisure){

        let kindOfTrip: string;

        kindOfTrip = this.prompt("Qual é o tipo da sua viagem de lazer? Aventura, cultural, gastronômico, etc.?" );
        trip.setkindOfTrip(kindOfTrip);

        return trip;
    }

    public getSpecificsBusiness(trip: Business){
        
        let companyName: string;

        companyName = this.prompt("Qual é o nome da empresa referente à essa viagem?");
        trip.setCompanyName(companyName);

        return trip;
    }

    public getSpecificsEducational(trip: Educational){

        let schoolName: string;

        schoolName = this.prompt("Qual é o nome da instituição de ensino dessa viagem?");
        trip.setSchoolName(schoolName);

        return trip;
    }
    
    public listAllTrips(){
        this.router.tripController.showAllTrips();
    }
}