"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Status_1 = require("../enums/Status");
class Trip /* implements ITraveler */ {
    constructor() {
        this.travelers = [];
        this.status = Status_1.Status.notDefined;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getCurrency() {
        return this.currency;
    }
    setCurrency(currency) {
        this.currency = currency;
    }
    getStartDate() {
        return this.startDate;
    }
    setStartDate(startDate) {
        this.startDate = startDate;
    }
    getFinishDate() {
        return this.finishDate;
    }
    setFinishDate(finishDate) {
        this.finishDate = finishDate;
    }
    getBudget() {
        return this.budget;
    }
    setBudget(budget) {
        this.budget = budget;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    displayTrip(trip) {
        console.log("Método padrão que será sobrescrito pelos métodos das classes filhas!");
    }
}
exports.default = Trip;
