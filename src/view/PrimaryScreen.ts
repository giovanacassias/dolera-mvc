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
    let showScreen: boolean = true;

    while (showScreen) {
      let choice = this.prompt(
        `Escolha uma opção:
                
                1. Cadastrar nova viagem
                2. Listar viagens
                3. Atualizar viagem
                4. Excluir viagem
                5. Sair
                
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
          //Excluir viagem;
          break;

        case "5":
          showScreen = false;
          break; //Não é reduntante? Por que se for 'false' ele irá sair do loop;

        default:
          console.log("Opção inválida!");
      }
    }
  }
}
