export const gb = {
    url: `gb/v1/volumes?q=${encodeURI(
        query
    )}&key=AIzaSyATExARtYho9ib0B_uCuN_vmS7jbA7CoBg`,

    options: {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    }
}