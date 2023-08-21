import { reactive } from 'vue'

export const list = reactive({

    responseData: {},
    xhr: new XMLHttpRequest(),

    getData() {
        this.xhr.open('GET', `http://localhost:3000/api/all`)
        this.xhr.send()
        this.xhr.responseType = 'json'
        this.xhr.onload = () => {
            if (this.xhr.readyState == 4 && this.xhr.status == 200) {
                // console.log(films)
                this.responseData = this.xhr.response.results
            } else {
                console.log(`Error: ${this.xhr.status}`)
            }
        }
    },

    sendData(data) {
        let type = data.type
        this.xhr.open("POST", `http://localhost:3000/api/${type}`);
        this.xhr.setRequestHeader("Content-Type", "application/json");
        const body = JSON.stringify(this.data);
        this.xhr.onload = () => {
            if (this.xhr.readyState == 4 && this.xhr.status == 201) {
                console.log(JSON.parse(this.xhr.responseText));
            } else {
                console.log(`Error: ${this.xhr.status}`);
            }
        };
        this.xhr.send(body);
    }
}
)