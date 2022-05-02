import {Response, Request} from "express";
import postgresBookFetcher from "./postgresBookFetcher";
import Book from "./Book";
import PlainTextPostgresPwdLoginManager from "./PlainTextPostgresPwdLoginManager";
import PostgreDBConnection from "./postgreDBConnection";
const express = require('express');
const app = express();
const port: number = 3000;
const connectionString: string = 'postgresql://bookish:bookish@localhost:5432';
const dbConnection = new PostgreDBConnection(connectionString);
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;

passport.use('login', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username: string, password: string, done: any) => {
        const loginManager = new PlainTextPostgresPwdLoginManager(dbConnection);
        const loggedIn = await loginManager.tryLogin(username, password);
        if (loggedIn) {
            done(null, {user: username}, { message: 'Logged in' });
        } else {
            done(null, false, { message: 'Invalid username or password.'});
        }
    }
));

const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Bookish123';

passport.use('jwt', new JwtStrategy(opts, async (token: any, done: any) => {
    try {
        const user = token.user;
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

app.get('/Login', passport.authenticate('login', {session: false}) ,async (req: Request, res: Response) => {
   const userName = req.query.username as string;
   const token = jwt.sign({user: userName}, 'Bookish123');
   res.send(token);
});

app.get('/books', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    const fetcher = new postgresBookFetcher(dbConnection);
    const books: Book[] = await fetcher.fetchBookData();
    console.log(books);
    res.send(JSON.stringify(books));
});

app.listen(port, () => {
    console.log(`Bookish listening on port ${port}`);
});