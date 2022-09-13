import Position from "./Position";

export default class Token {
  public type: string;
  public value: any;
  public posStart?: Position | null;
  public posEnd?: Position | null;

  public constructor(type: string, value: any, posStart?: Position | null, posEnd?: Position | null) {
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

  public matches(type: string, value: any) {
    return type === this.type && value === this.value;
  }

  public toString() {
    if (this.value) {
      return `${this.type}:${this.value}`;
    }

    return `${this.type}`;
  }
}