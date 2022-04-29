import {Express, Response, Request} from "express";
import postgresBookFetcher from "./postgresBookFetcher";
import Book from "./Book";
import PlainTextPostgresPwdLoginManager from "./PlainTextPostgresPwdLoginManager";
import PostgreDBConnection from "./postgreDBConnection";
const express = require('express');
const app = express();
const port: number = 3000;
const connectionString: string = 'postgresql://bookish:bookish@localhost:5432';
const dbConnection = new PostgreDBConnection(connectionString);

//Temp
let loggedIn = false;

app.get('/Login', async (req: Request, res: Response) => {
   const userName = req.query.username as string;
   const password = req.query.password as string;
   const loginManager = new PlainTextPostgresPwdLoginManager(dbConnection);
   loggedIn = await loginManager.tryLogin(userName, password);
   if (loggedIn) {
       res.send('Logged in');
   } else {
       res.send('Log in failed');
   }
   // Send credentials to loginManager class which responds true if login was successful
    // If not logged in, send access denied response
    // Otherwise, generate token using username and password and return it

});

app.get('/books', async (req: Request, res: Response) => {
    const fetcher = new postgresBookFetcher(dbConnection);
    const books: Book[] = await fetcher.fetchBookData();
    console.log(books);
    res.send(JSON.stringify(books));
});

app.listen(port, () => {
    console.log(`Bookish listening on port ${port}`);
})

