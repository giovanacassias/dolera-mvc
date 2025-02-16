"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyError extends Error {
    constructor(message) {
        super(`${message}`);
        this.name = "MyError";
    }
    static invalidType() {
        // Retorna um novo erro MyError com mensagem customizada
        return new MyError("O item não é um tipo válido de viagem!");
    }
}
exports.default = MyError;
