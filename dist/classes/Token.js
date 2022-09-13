"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Token {
    constructor(type, value, posStart, posEnd) {
        this.type = type;
        this.value = value;
        if (posStart) {
            this.posStart = posStart.copy();
            this.posEnd = posStart.copy();
            this.posEnd.advance();
        }
        if (posEnd) {
            this.posEnd = posEnd;
        }
    }
    matches(type, value) {
        return type === this.type && value === this.value;
    }
    toString() {
        if (this.value) {
            return `${this.type}:${this.value}`;
        }
        return `${this.type}`;
    }
}
exports.default = Token;
