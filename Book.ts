import BookData from "./BookData";


export default class Book {
    private ISBN: number;
    private title: string;
    private author: string;
    private numCopies: number;

    static CreateFromBookData(bookData: BookData) {
        return new Book(bookData.ISBN, bookData.Title, bookData.Author, bookData.NumCopies);
    }

    constructor(ISBN: number, title: string, author: string, numCopies: number) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.numCopies = numCopies;
    }
}