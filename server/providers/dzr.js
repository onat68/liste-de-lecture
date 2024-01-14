const dzr = {
    options: {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    },
    type: 'Album',
    searchResults: [],

    albumUrl (query) {
        return `https://api.deezer.com/search/album?q=${query}&limit=15`
    },

    genreUrl (albumId) {
        return `https://api.deezer.com/genre/${albumId}`
    },

    toObj (album, genre) {
        return {
            externalId: album.id.toString(),
            title: album.title,
            albumUrl: album.link,
            img: album.cover_medium,
            authors: album.artist.name,
            type: 'Album',
            genre: genre.name
        }
    }
}

module.exports = dzr
