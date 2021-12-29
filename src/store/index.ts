import {defineStore} from "pinia"

export const useMusic = defineStore({
    id: 'music',
    state: () => {
        return {
            musicUrl: [],
            musicImg: []
        }
    },
    getters: {}
})