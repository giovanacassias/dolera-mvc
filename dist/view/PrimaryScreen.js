"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const TripScreen_1 = __importDefault(require("./TripScreen"));
class PrimaryScreen {
    constructor(router) {
        this.prompt = (0, prompt_sync_1.default)();
        this.router = router;
        this.tripScreen = new TripScreen_1.default(this.router);
    }
    getFirstScreen() {
        /*     //populando o banco para testes
    
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
        this.router.tripController.registerNewTrip(tripC); */
        let showScreen = true;
        while (showScreen) {
            let choice = this.prompt(`Escolha uma opção:
                
                1. Cadastrar nova viagem
                2. Listar viagens
                3. Atualizar viagem
                4. Pesquisar viagem
                5. Excluir viagem
                6. Alterar status da viagem
                7. Gerar relatório em PDF
                8. Sair
                
                `);
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
                    //Editando status da viagem
                    this.tripScreen.tripStatus();
                    break;
                case "7":
                    //Gerar relatório em PDF
                    this.tripScreen.getPDF();
                    break;
                case "8":
                    //Saindo do sistema
                    showScreen = false;
                    break;
                default:
                    console.log("Opção inválida!");
            }
        }
    }
}
exports.default = PrimaryScreen;
