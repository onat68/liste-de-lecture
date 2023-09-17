import { reactive } from "vue";
import { types } from "./types.js";

export const typePicker = reactive({
    types: types,
    opened: false,
    currentType: types[0],
    otherTypes: [],

    open() {
        this.otherTypes = types.filter((type) => {
            type != this.currentType
        })
        this.opened = true
    },

    setType(type) {
        this.currentType = type
        this.opened = false
    },


})