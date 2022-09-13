"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lexer_1 = __importDefault(require("./Lexer"));
class Interpreter {
    constructor(code) {
        this.code = code;
        this.lexer = new Lexer_1.default(this.code);
    }
    parse() {
        return [null, null];
    }
}
exports.default = Interpreter;
