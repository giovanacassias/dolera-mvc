import promptSync from "prompt-sync";
import TripScreen from "./TripScreen";
import Router from "../control/Router";

export default class PrimaryScreen {
  private prompt = promptSync();
  private tripScreen!: TripScreen;
  private router!: Router;

  constructor(router: Router) {
    this.router = router;
    this.tripScreen = new TripScreen(this.router);
  }

  public getFirstScreen(): void {
    //populando o banco para testes

    let tripA = this.router.tripController.getNewLeisureTrip();
    tripA.setName("França");
    tripA.setCurrency("Euro");
    tripA.setBudget("100");
    tripA.setStartDate("05/05/2025");
    tripA.setFinishDate("31/05/2025");
    tripA.setkindOfTrip("Cultural");
    this.router.tripController.registerNewTrip(tripA);

    let tripB = this.router.tripController.getNewBusinessTrip();
    tripB.setName("PFI");
    tripB.setCurrency("Real");
    tripB.setBudget("150");
    tripB.setStartDate("20/03/2025");
    tripB.setFinishDate("25/03/2025");
    tripB.setCompanyName("Fundação Araucária");
    this.router.tripController.registerNewTrip(tripB);

    let tripC = this.router.tripController.getNewEducationalTrip();
    tripC.setName("Intercâmbio");
    tripC.setCurrency("Dólar");
    tripC.setBudget("200");
    tripC.setStartDate("23/09/2025");
    tripC.setFinishDate("23/09/2026");
    tripC.setSchoolName("Harvard");
    this.router.tripController.registerNewTrip(tripC);

    let showScreen: boolean = true;

    while (showScreen) {
      let choice = this.prompt(
        `Escolha uma opção:
                
                1. Cadastrar nova viagem
                2. Listar viagens
                3. Atualizar viagem
                4. Pesquisar viagem
                5. Excluir viagem
                6. Sair
                
                `
      );

      switch (choice) {
        case "1":
          //Adicionar uma viagem
          this.tripScreen.registerTrip();
          break;

        case "2":
          //listar viagens existentes;
          this.tripScreen.listAllTrips();
          break;

        case "3":
          //Atualizar uma viagem;
          this.tripScreen.updateTrip();
          break;

        case "4":
          //Pesquisar por viagem;
          this.tripScreen.searchTrip();
          break;

        case "5":
          //Excluir uma viagem
          this.tripScreen.deleteTrip();

          break;

        case "6":
          showScreen = false;
          break; //Não é reduntante? Por que se for 'false' ele irá sair do loop;

        default:
          console.log("Opção inválida!");
      }
    }
  }
}
