"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Expenses {
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
    getCategory() {
        return this.category;
    }
    setCategory(category) {
        this.category = category;
    }
}
exports.default = Expenses;
