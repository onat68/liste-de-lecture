require("dotenv").config()

const gb = {
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    },
    type: "Book",
    key: process.env.GB_API_KEY,

    bookUrl(query) {
        return `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(query)}&maxResults=10&key=${this.key}`
    },

    async find(query) {
        const res1 = await fetch(this.bookUrl(query), this.options)
        const books = await res1.json()
        const items = []
        try {
            for (const book of books.items) {
                const item = await this.toObj(book)

                items.push(await item)
            }
        } catch (e) {
            console.error(e)
        }
        return await items
    },

    toObj(book) {
        console.info(book.authors)

        return {
            externalId: book.id,
            title: book.volumeInfo.title,
            releaseDate: book.volumeInfo.publishedDate,
            note: book.volumeInfo.description,
            authors: book.volumeInfo.authors?.join(", ") ?? book.volumeInfo.publisher,
            type: "Book",
            img: book.volumeInfo.imageLinks?.thumbnail,
        }
    },
}

module.exports = gb
