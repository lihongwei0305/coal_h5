import {defineStore} from 'pinia'


export const useRouterParams = defineStore("routerParams", {
    state: () => ({
        params: {}
    }),


    actions: {
        addParams(payload) {
            this.params = payload
        },

        getParams() {
            return this.params
        },

        removeParams() {
            this.params = {}
        }


    },

    persist: true,

});


