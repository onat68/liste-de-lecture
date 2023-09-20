import { reactive } from "vue";
import { types } from "./types.js";

export const typePicker = reactive({
    types: types,
    opened: false,
    currentType: types[0],
    otherTypes: types,
    open() {
        this.opened = true
    },

    setType(type) {
        this.opened = false
        this.currentType = type
    },


})