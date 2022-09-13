"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Lexer_1 = __importDefault(require("./classes/Lexer"));
function shell(file) {
    const code = fs_1.default.readFileSync(file, "utf8");
    const lexer = new Lexer_1.default(code);
    console.log(lexer.parse().toString());
    return "";
}
exports.default = shell;
