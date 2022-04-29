"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresBookFetcher_1 = __importDefault(require("./postgresBookFetcher"));
const PlainTextPostgresPwdLoginManager_1 = __importDefault(require("./PlainTextPostgresPwdLoginManager"));
const postgreDBConnection_1 = __importDefault(require("./postgreDBConnection"));
const express = require('express');
const app = express();
const port = 3000;
const connectionString = 'postgresql://bookish:bookish@localhost:5432';
const dbConnection = new postgreDBConnection_1.default(connectionString);
//Temp
let loggedIn = false;
app.get('/Login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.query.username;
    const password = req.query.password;
    const loginManager = new PlainTextPostgresPwdLoginManager_1.default(dbConnection);
    loggedIn = yield loginManager.tryLogin(userName, password);
    if (loggedIn) {
        res.send('Logged in');
    }
    else {
        res.send('Log in failed');
    }
    // Send credentials to loginManager class which responds true if login was successful
    // If not logged in, send access denied response
    // Otherwise, generate token using username and password and return it
}));
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fetcher = new postgresBookFetcher_1.default(dbConnection);
    const books = yield fetcher.fetchBookData();
    console.log(books);
    res.send(JSON.stringify(books));
}));
app.listen(port, () => {
    console.log(`Bookish listening on port ${port}`);
});
//# sourceMappingURL=index.js.map