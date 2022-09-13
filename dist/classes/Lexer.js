"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tokens_1 = __importDefault(require("../constants/Tokens"));
const Position_1 = __importDefault(require("./Position"));
const Token_1 = __importDefault(require("./Token"));
class Lexer {
    constructor(code) {
        this.code = code;
        this.pos = new Position_1.default(-1, 0, -1);
        this.currentChar = null;
        this.advance();
    }
    advance() {
        this.pos.advance(this.currentChar);
        this.currentChar = this.pos.idx < this.code.length ? this.code[this.pos.idx] : null;
    }
    parse() {
        const tokens = [];
        while (this.currentChar !== null) {
            if (";\n".includes(this.currentChar)) {
                tokens.push(new Token_1.default(Tokens_1.default.NEW_LINE, null, this.pos));
                this.advance();
            }
            else if ("\r\t ".includes(this.currentChar)) {
                this.advance();
            }
            else if (this.currentChar === "\"'") {
                tokens.push(this.makeString());
            }
        }
        return tokens;
    }
    makeString() {
        let string = "";
        return new Token_1.default();
    }
}
exports.default = Lexer;
