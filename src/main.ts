const showBtn = document.getElementById('show-dialog');
const dialog = <HTMLDialogElement>document.getElementById('enter-book-data');
const submitBookData = document.getElementById('submit-book-data');
const clearBtn = document.getElementById('clear-form');
const cancelBtn = document.getElementById('cancel');
const libraryDisplay = <HTMLDivElement>document.getElementById('library-grid');
let bookTitle = <HTMLInputElement>document.getElementById('book-title');
let bookAuthor = <HTMLInputElement>document.getElementById('book-author');
let bookPages = <HTMLInputElement>document.getElementById('book-pages');
let bookStatus = <HTMLInputElement>(
	document.querySelector('input[name="book-status"]:checked')
);

let library: any[] = [
	
];

function Book(
	this: any,
	title: string,
	author: string,
	pages: string,
	read: string,
	id: string
) {
	if (!new.target) {
		throw Error("You must use 'new' operator when calling constructor");
	}

	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = id;
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
	};
	console.log(this.info());
};

function addBookToLibrary(
	title: string,
	author: string,
	pages: string,
	read: string,
	id: string
) {
	const addBook = new (Book as any)(title, author, pages, read, id);
	library.push(addBook);
	displayLibrary();
};

function displayLibrary() {
	const libraryCard = `${library
		.map(
			(book) =>
				`<div id="${book.id}" class='book-card'><p class="book-title-heading">Title</p><p class="book-title">${book.title}</p><p class="book-author-heading">Author</p><p class="book-author">${book.author}</p><p class="book-pages">${book.pages} pages</p><button class="change-status ${book.read.replace(" ", "-").toLowerCase()}">${book.read}</button><button class="delete">Remove Book</button></div>`
		)
		.join('')}`;
	libraryDisplay.innerHTML = libraryCard;
};
function clearFormData() {
	bookTitle.value = '';
	bookAuthor.value = '';
	bookPages.value = '';
};

function handleBookClick(event: MouseEvent) {
	if (event.target instanceof HTMLElement) {
		if (event.target?.classList.contains('delete')) {
            const warning = confirm("Are you sure you want to delete this entry?")
            if (warning){ 
			let bookIdentity = event.target?.closest('div')?.getAttribute('id');
			let index = library.indexOf(bookIdentity);
			library.splice(index, 1);
			event.target?.closest('div')?.remove();} else {
                return
            }
		} else if (event.target?.classList.contains('change-status')) {
			let bookIdentity = event.target?.closest('div')?.getAttribute('id');
			let index = library.findIndex((book) => book.id === bookIdentity);
			library[index].read =
				library[index].read === 'Read' ? 'Not Read' : 'Read';
                displayLibrary();
		}
	}
};

showBtn!.addEventListener('click', () => {
	dialog.showModal();
});

cancelBtn?.addEventListener('click', () => {
	dialog.close();
});

submitBookData?.addEventListener('click', (e) => {
	e.preventDefault();

	for (let i = 0; i < library.length; i++) {
		if (library[i].title === bookTitle.value) {
			alert('Book already exists in library');
			clearFormData();
			return;
		}
	}

    if (library.length === 12) {
        alert('Max number of books that can be saved at the moment is 12');
        return
    }

	const pagesTest = /^\d+$/;

	if (!pagesTest.test(bookPages.value) || bookPages.value === '0') {
		alert('Please enter a valid value for the number of pages in the book');
		return;
	}

	addBookToLibrary(
		bookTitle.value,
		bookAuthor.value,
		bookPages.value,
		(bookStatus.value = bookStatus.value === 'read' ? 'Read' : 'Not Read'),
		crypto.randomUUID()
	);
	dialog.close();
	clearFormData();
});

clearBtn?.addEventListener('click', clearFormData);

libraryDisplay.addEventListener('click', handleBookClick);

displayLibrary();
