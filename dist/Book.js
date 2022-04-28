"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(ISBN, title, author) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
    }
    static CreateFromBookData(bookData) {
        return new Book(bookData.ISBN, bookData.Title, bookData.Author);
    }
}
exports.default = Book;
//# sourceMappingURL=Book.js.map