export const dzr = {
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    },
    type: 'Album',

    async search(query) {
        let arr = []
        await fetch(`dzr/search/album?q=${query}`, this.options)
            .then((res) => res.json())
            .then((data) => {
                data.data.forEach(element => {
                    let item = this.toObj(element)

                    fetch(`dzr/genre/${item.externalId}`, this.options)
                        .then((res) => res.json())
                        .then((data) => {
                            item.genre = data.name
                            arr.push(item)
                        })
                        .catch((err) => console.error("error:" + err))
                });
            })
            .catch((err) => console.error("error:" + err))
            return arr
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
