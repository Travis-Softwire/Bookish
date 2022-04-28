import BookData from "./BookData";


export default class Book {
    private ISBN: number;
    private title: string;
    private author: string;

    static CreateFromBookData(bookData: BookData) {
        return new Book(bookData.ISBN, bookData.Title, bookData.Author);
    }

    constructor(ISBN: number, title: string, author: string) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
    }
}