"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trip_1 = __importDefault(require("./Trip"));
class Business extends Trip_1.default {
    constructor() {
        super();
    }
    getCompanyName() {
        return this.companyName;
    }
    setCompanyName(companyName) {
        this.companyName = companyName;
    }
    //Override
    displayTrip(trip) {
        console.log(`    Nome da empresa: ${trip.getCompanyName()}
        
        `);
    }
}
exports.default = Business;
