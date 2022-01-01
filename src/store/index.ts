import {defineStore} from "pinia"

export const useMusic = defineStore({
    id: 'music',
    state: () => {
        return {
            musicImg: [],
            musicData: [],
        }
    },
    getters: {}
})