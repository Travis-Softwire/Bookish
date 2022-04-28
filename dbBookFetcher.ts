import Book from "./Book";

export default interface dbBookfetcher {
    fetchBookData(): Promise<Book[]>;
}