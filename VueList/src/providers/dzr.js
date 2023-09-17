export const dzr = {

    searchUrl: `dzr/search/album?q=${query}`,

    genreUrl: `dzr/genre/${album.genre_id}`,

    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    }
}