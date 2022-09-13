import Position from "./Position";

export default class Error {
  public name: string;
  public message: string;
  public posStart: Position;
  public posEnd: Position;

  public constructor(name: string, message: string, posStart: Position, posEnd: Position) {
    this.name = name;
    this.message = message;
    this.posStart = posStart.copy();
    this.posEnd = posEnd.copy();
  }

  toString() {
    return `New Error: ${this.name}\n${this.message}`;
  }
}

export class InvalidSyntaxError extends Error {
  constructor(message: string, posStart: Position, posEnd: Position) {
    super("Invalid Syntax", message, posStart, posEnd);
  }
}

export class InvalidCharError extends Error {
  constructor(message: string, posStart: Position, posEnd: Position) {
    super("Invalid Character", message, posStart, posEnd);
  }
}