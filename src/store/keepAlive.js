import {defineStore} from "pinia";
import {ref} from "vue";

export const useKeepAlive = defineStore('keepAlive', {
    state: () => ({
        includes: [],
        excludes: [],

    }),

    actions: {
        setIncludes(type, name) {
            let index = this.includes.findIndex(v => v === name);
            let isIn = index >= 0;
            switch (type) {
                case 'add':
                    if (!isIn) {
                        console.log(name)
                        this.includes.push(name);
                    }
                    break;

                case 'remove':
                    if (isIn) {
                        this.includes.splice(index, 1);
                    }
                    break;

            }
        },

    },

    getters: {
        getIncludes() {
            return this.includes;
        },
    }
})

