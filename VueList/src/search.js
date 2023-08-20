import { reactive } from 'vue'

export const search = reactive({
    searching: false,
    triggerSearch() {
        this.searching = true
        console.log(this.searching)
    },
    cancelSearch() {
        this.searching = false
        console.log(this.searching)
    }
})