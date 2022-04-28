import {Express, Response, Request} from "express";
import postgresBookFetcher from "./postgresBookFetcher";
import Book from "./Book";
const express = require('express');
const app = express();
const port: number = 3000;
const connectionString: string = 'postgresql://bookish:bookish@localhost:5432';

app.get('/', async (req: Request, res: Response) => {
    const fetcher = new postgresBookFetcher(connectionString);
    const books: Book[] = await fetcher.fetchBookData();
    console.log(books);
    res.send(JSON.stringify(books));
});

app.listen(port, () => {
    console.log(`Bookish listening on port ${port}`);
})

