"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Position {
    constructor(idx, ln, col) {
        this.idx = idx;
        this.ln = ln;
        this.col = col;
    }
    advance(currentChar) {
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
exports.default = Position;
