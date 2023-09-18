export const dzr = {
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    },

    search(query) {
        let arr = []

        fetch(`dzr/search/album?q=${query}`, this.options)
            .then((res) => res.json())
            .then((data) => {
                arr = data.data.map(element => {
                    this.toObj(element)

                    fetch(`dzr/genre/${element.id}`, this.options)
                        .then((res) => res.json())
                        .then((data) => {
                            element.genre = data.name
                        })
                        .catch((err) => console.error("error:" + err))
                });
                return arr
            })
            .catch((err) => console.error("error:" + err))
    },

    toObj(album) {
        let thisAlbum = {}

        thisAlbum.externalId = album.id
        thisAlbum.title = album.title
        thisAlbum.albumUrl = album.link
        thisAlbum.img = album.cover
        thisAlbum.authors = album.artist.name
        thisAlbum.type = 'Album'
        thisAlbum.genre = ''

        return thisAlbum
    },
}
