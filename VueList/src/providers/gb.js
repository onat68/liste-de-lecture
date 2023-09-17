export const gb = {
    query: '',
    url: `gb/v1/volumes?q=${encodeURI(this.query)}&key=AIzaSyATExARtYho9ib0B_uCuN_vmS7jbA7CoBg`,

    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    },
    toObj(book) {
        let thisBook = {}
        thisBook.externalId = book.id
        thisBook.title = book.volumeInfo.title;
        thisBook.releaseDate = book.volumeInfo.publishedDate;
        thisBook.note = book.volumeInfo.description;

        if (book.volumeInfo.authors != undefined) {
            thisBook.authors = book.volumeInfo.authors.join(', ')
        } else { thisBook.authors = book.volumeInfo.publisher }
        thisBook.type = 'Book'
        book.volumeInfo.imageLinks != undefined
            ? (thisBook.img = book.volumeInfo.imageLinks.thumbnail)
            : (thisBook.img = "none");

        return thisBook
    }
}