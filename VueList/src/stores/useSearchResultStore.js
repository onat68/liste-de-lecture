import { defineStore } from 'pinia'
import dzr from '../providers/dzr'
import gb from '../providers/gb'
import tmdb from '../providers/tmdb'

export const useCounterStore = defineStore('useSearchResults', {
    state: () => ({
        results: [],
        movies: [],
        books: []
    }),

    getters: {
        getResults(state) { return state.results }
    },

    actions: {
        search(provider, query) {
            this.getData(provider.url, query)
            if (provider == tmdb) {
                this.movies.forEach(movie => { this.getData(provider.creditsGenreUrl, movie.id) })
            } else if (provider == dzr) {
                this.albums.forEach(album => { this.getData(provider.genreUrl, album) })
            }
        },

        getData(provider, query) {
            provider.query = query
            fetch(url, provider.options)
                .then((res) => res.json())
                .then((data) => { this.parseResponse(step, data, provider) }
                )
                .catch((err) => console.error("error:" + err))
        },


        parseResponse(step, data, provider) {
            if (provider == tmdb) {
                let subset = data[tmdb.dataSubset]
                subset.forEach((item) => { this.movieToObj(item, step, data) })
            } else if (provider == gb) {
                data.forEach((item) => { this.bookToObj(item) })
            }
        },

        movieToObj(item, step, data) {
            if (step == 0) {
                let thisMovie = {}

                thisMovie.externalId = item.id
                thisMovie.title = item.original_title;
                thisMovie.releaseDate = item.release_date;
                thisMovie.note = item.overview;
                thisMovie.genre = ''
                thisMovie.authors = ''
                if (item.poster_path != null) {
                    thisMovie.img = `https://image.tmdb.org/t/p/w92/${item["poster_path"]}`
                } else { thisMovie.img = 'none' }

                thisMovie.type = 'Movie'
                this.movies.push(thisMovie)
                this.results.push(thisMovie)
            } else if (step == 1) {
                item.authors = data.credits.crew[0].original_name
                item.genre = data.genres[0].name
            }
        },

        bookToObj(item) {
            let thisBook = {}

            thisBook.externalId = item.id
            thisBook.title = item.volumeInfo.title;
            thisBook.releaseDate = item.volumeInfo.publishedDate;
            thisBook.note = item.volumeInfo.description;

            if (item.volumeInfo.authors != undefined) {
                thisBook.authors = item.volumeInfo.authors.join(', ')
            } else { thisBook.authors = item.volumeInfo.publisher }
            thisBook.type = 'Book'
            item.volumeInfo.imageLinks != undefined
                ? (thisBook.img = item.volumeInfo.imageLinks.thumbnail)
                : (thisBook.img = "none");

            this.books.push(thisBook)
            this.results.push(thisBook)
        },
    }
})