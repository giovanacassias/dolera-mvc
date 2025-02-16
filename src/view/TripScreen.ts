import PromptSync from "prompt-sync";
import Router from "../control/Router";
import Leisure from "../model/Leisure";
import Business from "../model/Business";
import Educational from "../model/Educational";
import Trip from "../model/Trip";
import Traveler from "../model/Traveler";
import { Status } from "../enums/Status";

export default class TripScreen {
  private prompt = PromptSync();
  private router!: Router;

  constructor(router: Router) {
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

    switch (kindOfTrip) {
      case "1":
        let tripLeisure: Leisure;
        tripLeisure = this.router.tripController.getNewLeisureTrip();
        tripLeisure = this.getGeneralAspects(tripLeisure) as Leisure;
        //povoar com dados específicos
        tripLeisure = this.getSpecificsLeisure(tripLeisure);
        //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PARA A DATABASE E DA PUSH NO ARRAY
        this.router.tripController.registerNewTrip(tripLeisure);
        break;

      case "2":
        let tripBusiness: Business;
        tripBusiness = this.router.tripController.getNewBusinessTrip();
        tripBusiness = this.getGeneralAspects(tripBusiness) as Business;
        tripBusiness = this.getSpecificsBusiness(tripBusiness);
        //INJEÇÃO DE DEPENDÊNCIA ESTÁ AQUI - ENVIANDO O OBJETO CRIADO E POPULADO LÁ PARA O CONTROLLER QUE VAI ENVIAR PAtRA A DATABASE E DA PUSH NO ARRAY
        this.router.tripController.registerNewTrip(tripBusiness);
        break;

      case "3":
        let tripEducational: Educational;
        tripEducational = this.router.tripController.getNewEducationalTrip();
        tripEducational = this.getGeneralAspects(
          tripEducational
        ) as Educational;
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

  public getGeneralAspects(trip: Trip) {
    let name: string,
      currency: string,
      startDate: string,
      finishDate: string,
      budget: string;
    //resposta: string,
    //traveler: Traveler;

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

    /* resposta = this.prompt(`Você está viajando com mais alguém? 
            1. sim
            2. não`
        );

        switch(resposta){
            case "1":
            traveler = this.router.travelerController.newTraveler();
            let name = this.prompt("Qual é o nome do viajante?");
            traveler.setName(name);
            
        }; */

    return trip;
  }

  public getSpecificsLeisure(trip: Leisure) {
    let kindOfTrip: string;

    kindOfTrip = this.prompt(
      "Qual é o tipo da sua viagem de lazer? Aventura, cultural, gastronômico, etc.?"
    );
    trip.setkindOfTrip(kindOfTrip);

    return trip;
  }

  public getSpecificsBusiness(trip: Business) {
    let companyName: string;

    companyName = this.prompt(
      "Qual é o nome da empresa referente à essa viagem?"
    );
    trip.setCompanyName(companyName);

    return trip;
  }

  public getSpecificsEducational(trip: Educational) {
    let schoolName: string;

    schoolName = this.prompt(
      "Qual é o nome da instituição de ensino dessa viagem?"
    );
    trip.setSchoolName(schoolName);

    return trip;
  }

  public listAllTrips() {
    this.router.tripController.showAllTrips();
  }

  public updateTrip() {
    //obtendo todas as viagens registradas no 'banco'
    let allTrips = this.router.tripController.getAllTrips();
    //mostrando todas as viagens na tela para o user
    this.router.tripController.showAllTrips();

    //descobrindo qual viagem o user quer editar
    if (allTrips.length != 0) {
      let tripToEdit = parseInt(
        this.prompt(
          `Digite o número da viagem que você deseja selecionar:
            `
        )
      );

      //verificando se o input é válido
      if (tripToEdit < 1 || tripToEdit > allTrips.length) {
        console.log(
          `
          ${tripToEdit} não é um id de viagem válido! Tente novamente
          `
        );
      } else {
        //atualizando de 1-based (user) para 0-based (array)
        tripToEdit = tripToEdit - 1;
        let tripToUpdate = allTrips[tripToEdit];

        console.log(
          `
          Você deseja editar a viagem chamada ${tripToUpdate.getName()}
          O que você deseja alterar?
          
          `
        );

        if (tripToUpdate instanceof Leisure) {
          //chamar método que irá editar as propriedades de Leisure
          //this.router.tripController.updateTrip(allTrips[tripToEdit]);
          this.router.tripController.menuGeneralOptions();
          this.router.tripController.menuSpecificOptionsLeisure();
          let answer = parseInt(
            this.prompt(`
            
            Digite o número da opção: `)
          );

          //checando se input é valido (menu de 1 à 6)
          if (answer >= 1 && answer < 6) {
            this.updateOneToFive(tripToUpdate, answer);
          } else if (answer === 6) {
            let kindOfTrip = this.prompt(`Informe o novo tipo da viagem: `);
            this.router.tripController.updateTrip<Leisure>(
              tripToUpdate,
              kindOfTrip
            );
          } else {
            console.log("Opção inválida!");
          }
        } else if (tripToUpdate instanceof Business) {
          this.router.tripController.menuGeneralOptions();
          this.router.tripController.menuSpecificOptionsBusiness();
          let answer = parseInt(
            this.prompt(`
            
            Digite o número da opção: `)
          );

          if (answer >= 1 && answer < 6) {
            this.updateOneToFive(tripToUpdate, answer);
          } else if (answer === 6) {
            let companyName = this.prompt(`Informe o novo nome da empresa: `);
            this.router.tripController.updateTrip<Business>(
              tripToUpdate,
              companyName
            );
          } else {
            console.log("Opção inválida!");
          }
        } else if (tripToUpdate instanceof Educational) {
          this.router.tripController.menuGeneralOptions();
          this.router.tripController.menuSpecificOptionsEducational();
          let answer = parseInt(
            this.prompt(`
            
            Digite o número da opção: `)
          );

          if (answer >= 1 && answer < 6) {
            this.updateOneToFive(tripToUpdate, answer);
          } else if (answer === 6) {
            let schoolName = this.prompt(`Informe o novo nome da escola: `);
            this.router.tripController.updateTrip<Educational>(
              tripToUpdate,
              schoolName
            );
          } else {
            console.log("Opção inválida!");
          }
        } else {
          console.log("Algo deu muito errado aqui!");
        }
      }
    } else {
      console.log(
        "Você não possui nenhuma viagem ainda :( Que tal adicionar uma? "
      );
    }
  }

  //Seta as propriedades comuns à todos os objetos das classes filhas
  public updateOneToFive(tripToUpdate: Trip, answer: number) {
    switch (answer) {
      case 1:
        let name = this.prompt(`Informe o novo nome da viagem: `);
        tripToUpdate.setName(name);
        console.log("Nome atualizado com sucesso!");
        break;
      case 2:
        let currency = this.prompt(`Informe a nova moeda da viagem: `);
        tripToUpdate.setCurrency(currency);
        console.log("Moeda atualizada com sucesso!");
        break;
      case 3:
        let startDate = this.prompt(`Informe a nova data de ida da viagem: `);
        tripToUpdate.setStartDate(startDate);
        console.log("Ida atualizada com sucesso!");
        break;
      case 4:
        let finishDate = this.prompt(
          `Informe a nova data de volta da viagem: `
        );
        tripToUpdate.setFinishDate(finishDate);
        console.log("Volta atualizada com sucesso!");
        break;
      case 5:
        let budget = this.prompt(`Informe o novo orçamento da viagem: `);
        tripToUpdate.setBudget(budget);
        console.log("Orçamento atualizado com sucesso!");
        break;
    }
  }

  //Pesquisa especializada no banco de dados
  public searchTrip(): void {
    let trips = this.router.tripController.getAllTrips();

    let amount = Number.parseInt(
      this.prompt(`
      Pesquisar por viagens com orçamento maior ou igual a:
      
      `)
    );

    trips.forEach((trip) => {
      if (Number.parseInt(trip.getBudget()) >= amount) {
        let name = trip.getName();
        let budget = trip.getBudget();

        console.log(`${name}: R$${budget}`);
      }
    });
  }

  public tripStatus() {
    //Buscando array com todas as viagens
    let allTrips = this.router.tripController.getAllTrips();

    //Mostrando todas as viagens cadastradas
    this.router.tripController.showAllTrips();

    //Coletando o index da viagem a ser editada
    let tripToEdit = Number.parseInt(
      this.prompt(`
      Qual viagem você deseja incluir um status?
    `)
    );

    //verificando se o input é válido
    if (tripToEdit < 1 || tripToEdit > allTrips.length) {
      console.log(
        `${tripToEdit} não é um id de viagem válido! Tente novamente`
      );
    } else {
      let status = Number.parseInt(
        this.prompt(`
        Qual o novo status da viagem?
        1. Viagem atual
        2. Viagem concluída
      `)
      );

      let selectedTrip = allTrips[tripToEdit - 1];
      console.log(
        `Atualmente, o status da viagem ${selectedTrip.getName()} é de: ${selectedTrip.getStatus()}`
      );

      if (status === 1) {
        selectedTrip.setStatus(Status.Current);
        console.log(
          `O status da viagem chamada ${selectedTrip.getName()} é: ${selectedTrip.getStatus()}`
        );
      } else if (status === 2) {
        selectedTrip.setStatus(Status.Finished);
        console.log(
          `O status da viagem chamada ${selectedTrip.getName()} é: ${selectedTrip.getStatus()}`
        );
      } else {
        console.log("Opção inválida!");
      }
    }
  }

  public deleteTrip(): void | string {
    this.listAllTrips();

    let trip = Number.parseInt(
      this.prompt(`Digite o número da viagem que deseja excluir: `)
    );

    this.router.tripController.deleteTrip(trip);
  }
}
