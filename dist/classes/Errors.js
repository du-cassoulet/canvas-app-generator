"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSyntaxError = void 0;
class Error {
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
    toString() {
        return `New Error: ${this.name}\n${this.message}`;
    }
}
exports.default = Error;
class InvalidSyntaxError extends Error {
    constructor(message) {
        super("Invalid Syntax", message);
    }
}
exports.InvalidSyntaxError = InvalidSyntaxError;
