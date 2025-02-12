"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Trip /* implements ITraveler */ {
    constructor() {
        this.travelers = [];
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
    displayTrip(trip) {
        console.log("Método padrão que será sobrescrito pelos métodos das classes filhas!");
    }
}
exports.default = Trip;
