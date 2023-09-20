import { useSearchResults } from "../stores/useSearchResultStore";

export const gb = {

    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    },
    type: 'Book',

    search(query) {
        const search = useSearchResults()
        fetch(`gb/v1/volumes?q=${encodeURI(query)}&key=AIzaSyATExARtYho9ib0B_uCuN_vmS7jbA7CoBg`, this.options)
            .then((res) => res.json())
            .then((data) => {
                data.items.forEach(element => {
                    let item = this.toObj(element)
                    console.log(element)
                    search.addResult(item)
                });
            })
            .catch((err) => console.error("error:" + err))
    },

    toObj(element) {
        let item = {}
        item.externalId = element.id
        item.title = element.volumeInfo.title;
        item.releaseDate = element.volumeInfo.publishedDate;
        item.note = element.volumeInfo.description;

        if (element.volumeInfo.authors != undefined) {
            item.authors = element.volumeInfo.authors.join(', ')
        } else { item.authors = element.volumeInfo.publisher }
        item.type = 'Book'
        element.volumeInfo.imageLinks != undefined
            ? (item.img = element.volumeInfo.imageLinks.thumbnail)
            : (item.img = "none");

        return item
    },
}