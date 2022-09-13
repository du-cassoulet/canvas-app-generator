import { LETTERS, LETTERS_AND_NUMBERS, NUMBERS } from "../constants/Characters";
import Keywords from "../constants/Keywords";
import Tokens from "../constants/Tokens";
import { InvalidCharError } from "./Errors";
import Position from "./Position";
import Token from "./Token";

export default class Lexer {
  private code: string;
  private pos: Position;
  public currentChar: string | null;

  public constructor(code: string) {
    this.code = code;
    this.pos = new Position(-1, 0, -1);
    this.currentChar = null;

    this.advance();
  }

  private advance() {
    this.pos.advance(this.currentChar);
    this.currentChar = this.pos.idx < this.code.length ? this.code[this.pos.idx]: null;
  }

  public parse(): [Token[] | null, Error | null] {
    const tokens: Token[] = [];

    while (this.currentChar !== null) {
      if (";\n".includes(this.currentChar)) {
        tokens.push(new Token(Tokens.NEW_LINE, null, this.pos));
        this.advance();
      } else if ("\r\t ".includes(this.currentChar)) {
        this.advance();
      } else if ("\"'".includes(this.currentChar)) {
        tokens.push(this.makeString());
      } else if (NUMBERS.includes(this.currentChar)) {
        tokens.push(this.makeNumber());
      } else if (LETTERS.includes(this.currentChar)) {
        tokens.push(this.makeIdentifier());
      } else if (this.currentChar === ".") {
        tokens.push(new Token(Tokens.DOT, null, this.pos.copy()));
        this.advance();
      } else if (this.currentChar === "=") {
        tokens.push(this.makeEquals());
      } else if (this.currentChar === "!") {
        tokens.push(this.makeNegative());
      } else {
        const posStart = this.pos.copy();
        let char = this.currentChar;
        this.advance();
        return [[], new InvalidCharError(`Invalid character '${char}'`, posStart, this.pos.copy())];
      }
    }

    tokens.push(new Token(Tokens.EOF, null, this.pos.copy()));
    return [tokens, null];
  }

  private makeString(): Token {
    let string = "";
    let posStart = this.pos.copy();
    let openChar = this.currentChar;
    this.advance();

    while (this.currentChar !== openChar && this.currentChar !== null) {
      string += this.currentChar;
      this.advance();
    }

    this.advance();
    return new Token(Tokens.STRING, string, posStart, this.pos.copy());
  }

  private makeNumber(): Token {
    let number = "";
    let posStart = this.pos.copy();
    let dots = 0;

    while (this.currentChar !== null && (NUMBERS + ".").includes(this.currentChar)) {
      number += this.currentChar;

      if (this.currentChar === ".") dots++;
      if (dots > 1) break;

      this.advance();
    }

    if (dots === 0) {
      return new Token(Tokens.INT, parseInt(number), posStart, this.pos.copy());
    } else {
      return new Token(Tokens.FLOAT, parseFloat(number), posStart, this.pos.copy());
    }
  }

  private makeIdentifier(): Token {
    let identifier = this.currentChar || "";
    let posStart = this.pos.copy();
    this.advance();

    while (this.currentChar !== null && LETTERS_AND_NUMBERS.includes(this.currentChar)) {
      identifier += this.currentChar;
      this.advance();
    }

    if (Keywords.includes(identifier)) {
      return new Token(Tokens.KEYWORD, identifier, posStart, this.pos.copy());
    } else {
      return new Token(Tokens.IDENTIFIER, identifier, posStart, this.pos.copy());
    }
  }

  private makeEquals(): Token {
    const posStart = this.pos.copy();
    this.advance();

    let tok = new Token(Tokens.DEFINE, null, posStart, this.pos.copy());
    if (this.currentChar === "=") {
      this.advance();
      tok = new Token(Tokens.EQUALS, null, posStart, this.pos.copy());
    }

    return tok;
  }

  private makeNegative(): Token {
    const posStart = this.pos.copy();
    this.advance();

    let tok = new Token(Tokens.NOT, null, posStart, this.pos.copy());
    if (this.currentChar === "=") {
      this.advance();
      tok = new Token(Tokens.NOT_EQUALS, null, posStart, this.pos.copy());
    }

    return tok;
  }
}