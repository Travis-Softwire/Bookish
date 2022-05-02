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
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const loginManager = new PlainTextPostgresPwdLoginManager_1.default(dbConnection);
    const loggedIn = yield loginManager.tryLogin(username, password);
    if (loggedIn) {
        done(null, { user: username }, { message: 'Logged in' });
    }
    else {
        done(null, false, { message: 'Invalid username or password.' });
    }
})));
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Bookish123';
passport.use('jwt', new JwtStrategy(opts, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = token.user;
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
})));
app.get('/Login', passport.authenticate('login', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.query.username;
    const token = jwt.sign({ user: userName }, 'Bookish123');
    res.send(token);
}));
app.get('/books', passport.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fetcher = new postgresBookFetcher_1.default(dbConnection);
    const books = yield fetcher.fetchBookData();
    console.log(books);
    res.send(JSON.stringify(books));
}));
app.listen(port, () => {
    console.log(`Bookish listening on port ${port}`);
});
//# sourceMappingURL=index.js.map