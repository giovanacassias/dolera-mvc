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
        let showScreen = true;
        while (showScreen) {
            let choice = this.prompt(`Escolha uma opção:
                
                1. Cadastrar nova viagem
                2. Listar viagens
                3. Atualizar viagem
                4. Excluir viagem
                5. Sair
                
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
exports.default = PrimaryScreen;
