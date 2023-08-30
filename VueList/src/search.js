import { reactive } from 'vue'
import { tmdbToken } from './private/encryptBearerTokens.js'


export const search = reactive({
    searchResults: [],
    searching: false,

    basicGet: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    },



    movieGet: {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbToken}`
        },
    },


    albumToObj(album) {
        let thisAlbum = {}

        thisAlbum.externalId = album.id
        thisAlbum.title = album.title
        thisAlbum.url = album.link
        thisAlbum.img = album.cover
        thisAlbum.authors = album.artist.name
        thisAlbum.type = 'Album'

        const genreUrl = `api/genre/${album.genre_id}`;
        fetch(genreUrl, this.basicGet)
            .then((res) => res.json())
            .then((secondaryData) => {
                thisAlbum.genre = secondaryData.name
            })
            .catch((err) => console.error("error:" + err))

        this.searchResults.push(thisAlbum)
    },

    bookToObj(book) {
        let thisBook = {}
        thisBook.externalId = book.id
        thisBook.title = book.volumeInfo.title;
        thisBook.releaseDate = book.volumeInfo.publishedDate;
        thisBook.note = book.volumeInfo.description;

        if (book.volumeInfo.authors != undefined) {
            thisBook.author = book.volumeInfo.authors.join(', ')
        } else { thisBook.author = book.volumeInfo.publisher }
        thisBook.type = 'Book'
        book.volumeInfo.imageLinks != undefined
            ? (thisBook.img = book.volumeInfo.imageLinks.thumbnail)
            : (thisBook.img = "none");

        this.searchResults.push(thisBook)
    },

    movieToObj(movie) {
        let thisMovie = {}

        thisMovie.externalId = movie.id
        thisMovie.title = movie.original_title;
        thisMovie.releaseDate = movie.release_date;
        thisMovie.note = movie.overview;

        if (movie.poster_path != null) {
            thisMovie.img = `https://image.tmdb.org/t/p/w92/${movie["poster_path"]}`
        } else { thisMovie.img = 'none' }

        thisMovie.type = 'Movie'

        const creditsAndGenreUrl = `tmdb/movie/${movie.id}?append_to_response=credits`;

        fetch(creditsAndGenreUrl, this.movieGet)
            .then((res) => res.json())
            .then((secondaryData) => {
                thisMovie.authors = secondaryData.credits.cast[0].original_name
                thisMovie.genre = secondaryData.genres[0].name
            })
            .catch((err) => console.error("error:" + err))

        this.searchResults.push(thisMovie)

    },

    parseResponse(data) {
        if (this.type === 'Album') {
            let albums = data.data
            albums.forEach(album => {
                this.albumToObj(album)
            })
        }
        else if (this.type === 'Book') {
            let books = data.items
            books.forEach((book) => {
                this.bookToObj(book)
            })
        }
        else if (this.type === 'Movie') {
            let movies = data.results
            movies.forEach((movie) => {
                this.movieToObj(movie)
            })
        }
    },

    searchBook(query) {
        const url = `gb/v1/volumes?q=${encodeURI(
            query
        )}&key=AIzaSyATExARtYho9ib0B_uCuN_vmS7jbA7CoBg`;

        fetch(url, this.basicGet)
            .then((res) => res.json())
            .then((data) => {
                this.parseResponse(data)
            }
            )
            .catch((err) => console.error("error:" + err))
    },

    searchMovie(query) {
        const url = `tmdb/search/movie?query=${encodeURI(
            query
        )}`;

        fetch(url, this.movieGet)
            .then((res) => res.json())
            .then((data) => {
                this.parseResponse(data)
            }
            )
            .catch((err) => console.error("error:" + err))
    },

    searchAlbum(query) {
        const url = `dzr/search/album?q=${query}`;

        fetch(url, this.basicGet)
            .then((res) => res.json())
            .then((data) => {
                this.parseResponse(data)
            }
            )
            .catch((err) => console.error("error:" + err))
    },

    search(query, type) {
        this.type = type
        this.searchResults = []
        this.searching = true
        if (type === 'All') {
            this.searchAlbum(query)
            this.searchBook(query)
            this.searchMovie(query)
        }
        else if (type === 'Album') {
            this.searchAlbum(query)
        }
        if (type === 'Book') {
            this.searchBook(query)
        }
        if (type === 'Movie') {
            this.searchMovie(query)
        }
    },

    cancelSearch() {
        this.searching = false, 1000
    },

})