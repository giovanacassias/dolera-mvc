"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("../control/Router"));
const router = new Router_1.default();
test("testando se exclui a viagem correta", () => {
    expect(router.tripController.deleteTrip(1)).toBe("França");
    expect(router.tripController.getAllTrips().length).toBe(2);
});
test("Não altera o array caso seja input inválido", () => {
    expect(router.tripController.deleteTrip(4)).toBe("Número inválido! Tente novamente.");
});
