import {Response, Request} from "express";
import postgresBookFetcher from "./postgresBookFetcher";
import Book from "./Book";
import PlainTextPostgresPwdLoginManager from "./PlainTextPostgresPwdLoginManager";
import PostgreDBConnection from "./postgreDBConnection";
import PassportManager from "./PassportManager";
import PassportStrategyType from "./PassportStrategyType";
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const app = express();
const port: number = 3000;
const connectionString: string = 'postgresql://bookish:bookish@localhost:5432';
const dbConnection = new PostgreDBConnection(connectionString);
const loginManager = new PlainTextPostgresPwdLoginManager(dbConnection);
const passportManager = new PassportManager(passport, loginManager, 'Bookish123');
passportManager.configurePassportWithStrategy(PassportStrategyType.USER_PWD);
passportManager.configurePassportWithStrategy(PassportStrategyType.JWT);

app.get('/Login', passport.authenticate(PassportStrategyType.USER_PWD, {session: false}) ,async (req: Request, res: Response) => {
   const userName = req.query.username as string;
   const token = jwt.sign({user: userName}, 'Bookish123');
   res.send(token);
});

app.get('/books', passport.authenticate(PassportStrategyType.JWT, {session: false}), async (req: Request, res: Response) => {
    const fetcher = new postgresBookFetcher(dbConnection);
    const books: Book[] = await fetcher.fetchBookData();
    console.log(books);
    res.send(JSON.stringify(books));
});

app.listen(port, () => {
    console.log(`Bookish listening on port ${port}`);
});