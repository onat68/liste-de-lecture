import { useSearchResults } from "../stores/useSearchResultStore";

export const dzr = {
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    },
    type: 'Album',

    search(query) {
        const search = useSearchResults()
        fetch(`dzr/search/album?q=${query}`, this.options)
            .then((res) => res.json())
            .then((data) => {
                data.data.forEach(element => {
                    fetch(`dzr/genre/${element.genre_id}`, this.options)
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
        item.title = element.title
        item.albumUrl = element.link
        item.img = element.cover_medium
        item.authors = element.artist.name
        item.type = 'Album'
        item.genre = ''
        item.genre = data1.name

        return item
    },
}
