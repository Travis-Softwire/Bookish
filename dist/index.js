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
const PassportManager_1 = __importDefault(require("./PassportManager"));
const PassportStrategyType_1 = __importDefault(require("./PassportStrategyType"));
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const app = express();
const port = 3000;
const connectionString = 'postgresql://bookish:bookish@localhost:5432';
const dbConnection = new postgreDBConnection_1.default(connectionString);
const loginManager = new PlainTextPostgresPwdLoginManager_1.default(dbConnection);
const passportManager = new PassportManager_1.default(passport, loginManager, 'Bookish123');
passportManager.configurePassportWithStrategy(PassportStrategyType_1.default.USER_PWD);
passportManager.configurePassportWithStrategy(PassportStrategyType_1.default.JWT);
app.get('/Login', passport.authenticate(PassportStrategyType_1.default.USER_PWD, { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.query.username;
    const token = jwt.sign({ user: userName }, 'Bookish123');
    res.send(token);
}));
app.get('/books', passport.authenticate(PassportStrategyType_1.default.JWT, { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fetcher = new postgresBookFetcher_1.default(dbConnection);
    const books = yield fetcher.fetchBookData();
    console.log(books);
    res.send(JSON.stringify(books));
}));
app.listen(port, () => {
    console.log(`Bookish listening on port ${port}`);
});
//# sourceMappingURL=index.js.map