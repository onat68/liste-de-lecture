export const dzr = {
    query: '',
    searchUrl: `dzr/search/album?q=${this.query}`,

    subset: 'data',
    genreUrl: `dzr/genre/${this.query.genre_id}`,
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
    }
}