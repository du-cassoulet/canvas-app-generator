"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const shell_1 = __importDefault(require("./shell"));
const __file = process.argv[2];
if (!__file || !fs_1.default.existsSync(__file))
    throw new Error("File not found");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`🚀 Server ready at ${url}`);
    (0, shell_1.default)(__file);
    // open(url);
});
fs_1.default.watchFile(__file, () => {
    console.log("🚀 File change detected");
    (0, shell_1.default)(__file);
    // fs.writeFileSync("./public/")
});
