import { reactive } from 'vue'
import { tmdbToken } from './private/encryptBearerTokens.js'

// class ItemObject {
//     constructor(data, type) {
//         this.data = data
//         this.id = data.id
//         this.title = data.title
//         this.type = type
//     }
// }


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
        thisAlbum.albumUrl = album.link
        thisAlbum.img = album.cover
        thisAlbum.authors = album.artist.name
        thisAlbum.type = 'Album'
        thisAlbum.genre = ''

        const genreUrl = `dzr/genre/${album.genre_id}`;
        fetch(genreUrl, this.basicGet)
            .then((res) => res.json())
            .then((secondaryData) => {
                thisAlbum.genre = secondaryData.name
                this.searchResults.push(thisAlbum)
            })
            .catch((err) => console.error("error:" + err))

    },

    bookToObj(book) {
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

        this.searchResults.push(thisBook)
    },

    movieToObj(movie) {
        let thisMovie = {}

        thisMovie.externalId = movie.id
        thisMovie.title = movie.original_title;
        thisMovie.releaseDate = movie.release_date;
        thisMovie.note = movie.overview;
        thisMovie.genre = ''
        thisMovie.authors = ''
        if (movie.poster_path != null) {
            thisMovie.img = `https://image.tmdb.org/t/p/w92/${movie["poster_path"]}`
        } else { thisMovie.img = 'none' }

        thisMovie.type = 'Movie'

        const creditsAndGenreUrl = `tmdb/movie/${movie.id}?append_to_response=credits`;

        fetch(creditsAndGenreUrl, this.movieGet)
            .then((res) => res.json())
            .then((secondaryData) => {
                thisMovie.authors = secondaryData.credits.crew[0].original_name
                thisMovie.genre = secondaryData.genres[0].name
                this.searchResults.push(thisMovie)
            })
            .catch((err) => console.error("error:" + err))


    },

    parseResponseMovies(data) {
        let movies = data.results
        movies.forEach((movie) => {
            this.movieToObj(movie)

        })
    },

    parseResponseAlbums(data) {
        let albums = data.data
        albums.forEach(album => {
            this.albumToObj(album)
        })
    },

    parseResponseBooks(data) {
        let books = data.items
        books.forEach((book) => {
            this.bookToObj(book)
        })
    },

    searchBook(query) {
        const url = `gb/v1/volumes?q=${encodeURI(
            query
        )}&key=AIzaSyATExARtYho9ib0B_uCuN_vmS7jbA7CoBg`;

        fetch(url, this.basicGet)
            .then((res) => res.json())
            .then((data) => {
                this.parseResponseBooks(data)
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
                this.parseResponseMovies(data)
            }
            )
            .catch((err) => console.error("error:" + err))
    },

    searchAlbum(query) {
        const url = `dzr/search/album?q=${query}`;

        fetch(url, this.basicGet)
            .then((res) => res.json())
            .then((data) => {
                this.parseResponseAlbums(data)
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



