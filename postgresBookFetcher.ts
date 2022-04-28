import dbBookfetcher from "./dbBookFetcher";
import Book from "./Book";
import BookData from "./BookData";
const pgp = require('pg-promise')();

export default class postgresBookFetcher implements dbBookfetcher {
    private readonly db;

    constructor(connectionString: string) {
        this.db = pgp(connectionString);
    }

    async fetchBookData(): Promise<Book[]> {
        let books: Book[] = [];
        try {
            const bookData: BookData[] = await this.db.any('SELECT * FROM bookish."Books"');
            books = bookData.map((data) => Book.CreateFromBookData(data));
        } catch (err: any) {
            console.log(err.message);
        }
        return books;
    }
}