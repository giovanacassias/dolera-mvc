"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Expenses {
    //private category!: CategoryEnum; // OU category [] = ['accommodation', 'transportation', 'shopping', 'food', 'sightseeing', 'fees', 'others']
    //aí na screen, no switch case, ao escolher de 0 à 6 será o index do elemento no array?
    getDescription() {
        return this.description;
    }
    setName(description) {
        this.description = description;
    }
    getDate() {
        return this.date;
    }
    setDate(date) {
        this.date = date;
    }
    getAmount() {
        return this.amount;
    }
    setAmount(amount) {
        this.amount = amount;
    }
}
exports.default = Expenses;
