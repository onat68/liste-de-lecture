import { useSearchResults } from '../stores/useSearchResultStore.js'
const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk" 

export const tmdb = {
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbToken}`
        },
    },
    type: 'Movie',

    search(query) {
        const search = useSearchResults()
        fetch(`tmdb/search/movie?query=${encodeURI(query)}`, this.options)
            .then((res) => res.json())
            .then((data) => {
                data.results.forEach(element => {
                    fetch(`tmdb/movie/${element.id}?append_to_response=credits`, this.options)
                        .then((res) => res.json())
                        .then((data1) => {
                            let item = this.toObj(element, data1)
                            search.addResult(item)
                        })
                        .catch((err) => console.error("error:" + err))
                });
            })
            .catch((err) => console.error("error:" + err))
    },

    toObj(element, data1) {
        let item = {}

        item.externalId = element.id
        item.title = element.original_title;
        item.releaseDate = element.release_date;
        item.note = element.overview;
        item.genre = ''
        item.authors = ''
        item.type = 'Movie'
        item.authors = data1?.credits?.crew[0]?.original_name
        item.genre = data1?.genres[0]?.name

        if (element.poster_path != null) {
            item.img = `https://image.tmdb.org/t/p/w92/${data1["poster_path"]}`
        } else { item.img = 'none' }

        return (item)
    },
}
