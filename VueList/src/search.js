import { reactive } from 'vue'

export const search = reactive({
    searching: false,
    searchResults: [],

    searchBook(query) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
            query
        )}&key=AIzaSyATExARtYho9ib0B_uCuN_vmS7jbA7CoBg`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                data.items.forEach((book) => {
                    let thisBook = {}
                    thisBook.id = book.id
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
                });
            })
            .catch((err) => console.error("error:" + err));
    },

    searchFilm(query) {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
            query
        )}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk",
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                for (const film of data.results) {

                    let thisFilm = {}
                    thisFilm.id = film.id
                    thisFilm.title = film.original_title;
                    thisFilm.releaseDate = film.release_date;
                    thisFilm.note = film.overview;
                    if (film.poster_path != null) {
                        thisFilm.img = `https://image.tmdb.org/t/p/w92/${film["poster_path"]}`
                    } else { thisFilm.img = 'none' };
                    thisFilm.type = 'Movie'
                    let thisFilmDetails = []
                    const url2 = `https://api.themoviedb.org/3/movie/${film.id}?append_to_response=credits`;
                    const options2 = {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk",
                        },
                    };

                    fetch(url2, options2)
                        .then((res) => res.json())
                        .then((data) => {
                            thisFilmDetails.authors = data.credits.cast[0].original_name
                            console.log(thisFilm.authors + + thisFilm.title)
                            thisFilmDetails.genre = `${data.genres[0].name}/${data.genres[1].name} -`
                        })
                    thisFilm.authors = thisFilmDetails[0]
                    this.searchResults.push(thisFilm)
                };
            }
            )
            .catch((err) => console.error("error:" + err));
    },

    searchMusic(query) {
        const url = `api/search/album?q=${query}`;
        const options = {
            method: 'GET',
            headers: {
                accept: "application/json"
            }
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                data.data.forEach((album) => {
                    let thisAlbum = {}
                    thisAlbum.id = album.id
                    thisAlbum.title = album.title
                    thisAlbum.url = album.link
                    thisAlbum.img = album.cover
                    thisAlbum.authors = album.artist.name
                    thisAlbum.type = 'Album'
                    console.log(thisAlbum)
                    this.searchResults.push(thisAlbum)
                })
            })
            .catch((err) => console.error("error:" + err));
    },

    search(query) {
        this.searching = true;
        this.searchResults = []
        this.searchMusic(query)
        this.searchBook(query)
        this.searchFilm(query)
    },

    cancelSearch() {
        setTimeout(this.searching = false, 1000)
    }


})