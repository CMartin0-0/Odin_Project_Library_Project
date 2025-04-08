function Book(title, author, pages, read) {
    if(!new.target) {
        throw Error("You must use 'new' operator when calling constructor" )
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read === true ? 'read' : 'not read yet'}` 
        
}
console.log(this.info())
    } 
   

const book = new Book('Hobbit', 'jrr tolkein', 200, false);

console.log(book.author)

book.info()