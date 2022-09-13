"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCharError = exports.InvalidSyntaxError = void 0;
class Error {
    constructor(name, message, posStart, posEnd) {
        this.name = name;
        this.message = message;
        this.posStart = posStart.copy();
        this.posEnd = posEnd.copy();
    }
    toString() {
        return `New Error: ${this.name}\n${this.message}`;
    }
}
exports.default = Error;
class InvalidSyntaxError extends Error {
    constructor(message, posStart, posEnd) {
        super("Invalid Syntax", message, posStart, posEnd);
    }
}
exports.InvalidSyntaxError = InvalidSyntaxError;
class InvalidCharError extends Error {
    constructor(message, posStart, posEnd) {
        super("Invalid Character", message, posStart, posEnd);
    }
}
exports.InvalidCharError = InvalidCharError;
