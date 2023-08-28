import { reactive } from 'vue'

export const list = reactive({

    responseData: {},


    getData() {
        const xhr = new XMLHttpRequest()
        
        xhr.open('GET', `db/all`)
        xhr.send()
        xhr.responseType = 'json'
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // console.log(films)
                this.responseData = xhr.response.results
            } else {
                console.log(`Error: ${xhr.status}`)
            }
        }
    },

    sendData(data) {
        const xhr = new XMLHttpRequest()

        let target
        if (data.type == 'Book') {
            target = 'books'
        } else if (data.type == 'Movie') {
            target = 'films'
        } else if (data.type == 'Album') { target = 'albums' }
        xhr.open("POST", `db/${target}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        const body = JSON.stringify(data);
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 201) {
                console.log(JSON.parse(xhr.responseText));
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send(body);
    }
}
)