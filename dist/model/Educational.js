"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trip_1 = __importDefault(require("./Trip"));
class Educational extends Trip_1.default {
    constructor() {
        super();
    }
    getHappiness() {
        return `retorna conhecimento!`;
    }
    showDescription() {
        console.log(``);
    }
    getSchoolName() {
        return this.schoolName;
    }
    setSchoolName(schoolName) {
        this.schoolName = schoolName;
    }
    //Override
    displayTrip(trip) {
        console.log(`    Nome da escola: ${trip.getSchoolName()}
        
        `);
    }
    //Overload
    displayTripSpec(trip) {
        console.log(`    Nome da escola: ${trip.getSchoolName()}
          
          `);
    }
}
exports.default = Educational;
