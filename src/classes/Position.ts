export default class Position {
  public idx: number;
  public ln: number;
  public col: number;

  public constructor(idx: number, ln: number, col: number) {
    this.idx = idx;
    this.ln = ln;
    this.col = col;
  }

  public advance(currentChar?: string | null) {
    this.idx++;
    this.col++;

    if (currentChar === "\n") {
      this.ln++;
      this.col = 0;
    }

    return this;
  }

  copy() {
    return new Position(this.idx, this.ln, this.col);
  }
}