import {Express, Response, Request} from "express";
import postgresBookFetcher from "./postgresBookFetcher";
import Book from "./Book";
const express = require('express');
const app = express();
const port: number = 3000;
const connectionString: string = 'postgresql://bookish:bookish@localhost:5432';
const passport = require('passport');
const LocalStrategy = require('passport-local');

const strategy = new LocalStrategy((username: string, password: string, cb: any) => {

})

app.get('/Login', (req: Request, res: Response) => {
   const userName = req.query.username;
   const password = req.query.password;
   // Send credentials to loginManager class which responds true if login was successful
    // If not logged in, send access denied response
    // Otherwise, generate token using username and password and return it
});

app.get('/books', async (req: Request, res: Response) => {
    const fetcher = new postgresBookFetcher(connectionString);
    const books: Book[] = await fetcher.fetchBookData();
    console.log(books);
    res.send(JSON.stringify(books));
});

app.listen(port, () => {
    console.log(`Bookish listening on port ${port}`);
})

