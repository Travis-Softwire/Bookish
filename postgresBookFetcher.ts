import dbBookfetcher from "./dbBookFetcher";
import Book from "./Book";
import BookData from "./BookData";
import dbConnection from "./dbConnection";

export default class postgresBookFetcher implements dbBookfetcher {
    private readonly db;

    constructor(dbCon: dbConnection) {
        this.db = dbCon.getDB();
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