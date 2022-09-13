import Tokens from "../constants/Tokens";
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

  public parse(): Token[] {
    const tokens: Token[] = [];

    while (this.currentChar !== null) {
      if (";\n".includes(this.currentChar)) {
        tokens.push(new Token(Tokens.NEW_LINE, null, this.pos));
        this.advance();
      } else if ("\r\t ".includes(this.currentChar)) {
        this.advance();
      } else if (this.currentChar === "\"'") {
        tokens.push(this.makeString());
      }
    }

    return tokens;
  }

  private makeString(): Token {
    let string = "";

    return new Token()
  }
}