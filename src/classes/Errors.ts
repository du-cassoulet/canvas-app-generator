export default class Error {
  public name: string;
  public message: string;

  public constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }

  toString() {
    return `New Error: ${this.name}\n${this.message}`;
  }
}

export class InvalidSyntaxError extends Error {
  constructor(message: string) {
    super("Invalid Syntax", message);
  }
}