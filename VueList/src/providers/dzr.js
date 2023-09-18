export const dzr = {
    steps: true,
    subset: 'data',
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
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
    toObj1(album, data) {
        album.genre = data.name
    },
    setUrl(query, step) {
        if (step == 0) {
            return (`dzr/search/album?q=${query}`)
        } else if (step == 1) { return `dzr/genre/${query}` }
    }
}
