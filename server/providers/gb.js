const gb = {
    options: {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    },
    type: 'Book',
    key: process.env.GB_API_KEY,

    bookUrl (query) {
        return `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(query)}&key=${this.key}`
    },

    toObj (book) {
        return {
            externalId: book.id,
            title: book.volumeInfo.title,
            releaseDate: book.volumeInfo.publishedDate,
            note: book.volumeInfo.description,
            authors: () => {
                if (book.volumeInfo.authors !== undefined) {
                    return book.volumeInfo.authors.join(', ')
                } else { return book.volumeInfo.publisher }
            },
            type: 'Book',
            img: () => {
                if (book.volumeInfo.imageLinks !== undefined) {
                    return book.volumeInfo.imageLinks.thumbnail
                } else {
                    return 'none'
                }
            }
        }
    }
}
module.exports = gb
