import "dotenv/config";
import open from "open";
import express from "express";
import fs from "fs";
import shell from "./shell";

const __file = process.argv[2]; 
if (!__file || !fs.existsSync(__file)) throw new Error("File not found");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  const url = `http://localhost:${port}`;

  console.log(`🚀 Server ready at ${url}`);
  shell(__file);
  // open(url);
});

fs.watchFile(__file, () => {
  console.log("🚀 File change detected");
  shell(__file);
  // fs.writeFileSync("./public/")
});