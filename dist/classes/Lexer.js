"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Characters_1 = require("../constants/Characters");
const Keywords_1 = __importDefault(require("../constants/Keywords"));
const Tokens_1 = __importDefault(require("../constants/Tokens"));
const Errors_1 = require("./Errors");
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
            else if ("\"'".includes(this.currentChar)) {
                tokens.push(this.makeString());
            }
            else if (Characters_1.NUMBERS.includes(this.currentChar)) {
                tokens.push(this.makeNumber());
            }
            else if (Characters_1.LETTERS.includes(this.currentChar)) {
                tokens.push(this.makeIdentifier());
            }
            else if (this.currentChar === ".") {
                tokens.push(new Token_1.default(Tokens_1.default.DOT, null, this.pos.copy()));
                this.advance();
            }
            else if (this.currentChar === "=") {
                tokens.push(this.makeEquals());
            }
            else if (this.currentChar === "!") {
                tokens.push(this.makeNegative());
            }
            else {
                const posStart = this.pos.copy();
                let char = this.currentChar;
                this.advance();
                return [[], new Errors_1.InvalidCharError(`Invalid character '${char}'`, posStart, this.pos.copy())];
            }
        }
        tokens.push(new Token_1.default(Tokens_1.default.EOF, null, this.pos.copy()));
        return [tokens, null];
    }
    makeString() {
        let string = "";
        let posStart = this.pos.copy();
        let openChar = this.currentChar;
        this.advance();
        while (this.currentChar !== openChar && this.currentChar !== null) {
            string += this.currentChar;
            this.advance();
        }
        this.advance();
        return new Token_1.default(Tokens_1.default.STRING, string, posStart, this.pos.copy());
    }
    makeNumber() {
        let number = "";
        let posStart = this.pos.copy();
        let dots = 0;
        while (this.currentChar !== null && (Characters_1.NUMBERS + ".").includes(this.currentChar)) {
            number += this.currentChar;
            if (this.currentChar === ".")
                dots++;
            if (dots > 1)
                break;
            this.advance();
        }
        if (dots === 0) {
            return new Token_1.default(Tokens_1.default.INT, parseInt(number), posStart, this.pos.copy());
        }
        else {
            return new Token_1.default(Tokens_1.default.FLOAT, parseFloat(number), posStart, this.pos.copy());
        }
    }
    makeIdentifier() {
        let identifier = this.currentChar || "";
        let posStart = this.pos.copy();
        this.advance();
        while (this.currentChar !== null && Characters_1.LETTERS_AND_NUMBERS.includes(this.currentChar)) {
            identifier += this.currentChar;
            this.advance();
        }
        if (Keywords_1.default.includes(identifier)) {
            return new Token_1.default(Tokens_1.default.KEYWORD, identifier, posStart, this.pos.copy());
        }
        else {
            return new Token_1.default(Tokens_1.default.IDENTIFIER, identifier, posStart, this.pos.copy());
        }
    }
    makeEquals() {
        const posStart = this.pos.copy();
        this.advance();
        let tok = new Token_1.default(Tokens_1.default.DEFINE, null, posStart, this.pos.copy());
        if (this.currentChar === "=") {
            this.advance();
            tok = new Token_1.default(Tokens_1.default.EQUALS, null, posStart, this.pos.copy());
        }
        return tok;
    }
    makeNegative() {
        const posStart = this.pos.copy();
        this.advance();
        let tok = new Token_1.default(Tokens_1.default.NOT, null, posStart, this.pos.copy());
        if (this.currentChar === "=") {
            this.advance();
            tok = new Token_1.default(Tokens_1.default.NOT_EQUALS, null, posStart, this.pos.copy());
        }
        return tok;
    }
}
exports.default = Lexer;
