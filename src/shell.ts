import fs from "fs";
import Lexer from "./classes/Lexer";

export default function shell(file: string): string {
  const code = fs.readFileSync(file, "utf8");
  const lexer = new Lexer(code);
  console.log(lexer.parse().toString());
  return "";
}