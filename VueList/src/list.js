import { reactive } from 'vue'

export const list = reactive({

    responseData: {},

    getData() {
    const xhr = new XMLHttpRequest()
        xhr.open('GET', `http://localhost:3000/api/all`)
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
}
})