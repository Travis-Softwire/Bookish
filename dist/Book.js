"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(ISBN, title, author, numCopies) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.numCopies = numCopies;
    }
    static CreateFromBookData(bookData) {
        return new Book(bookData.ISBN, bookData.Title, bookData.Author, bookData.NumCopies);
    }
}
exports.default = Book;
//# sourceMappingURL=Book.js.map