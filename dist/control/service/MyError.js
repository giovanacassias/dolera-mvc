"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyError extends Error {
    constructor(s) {
        super(`meu erro personalizado é: ${s}`);
    }
}
exports.default = MyError;
