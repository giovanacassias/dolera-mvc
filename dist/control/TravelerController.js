"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Traveler_1 = __importDefault(require("../model/Traveler"));
class TravelerController {
    //recebendo a instância de database, vinda do Router, via construtor;
    constructor(database) {
        this.database = database;
    }
    addTraveler(traveler) {
    }
    newTraveler() {
        return new Traveler_1.default();
    }
}
exports.default = TravelerController;
