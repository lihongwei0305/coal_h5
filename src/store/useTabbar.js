import {defineStore} from "pinia";


export const useTabbar = defineStore('tabbar', {
    state: () => ({
        active: 'workbench',
        show: true,
        tabbarKey: Date.now(),

    }),
    getters: {
        getShow:(state)=>{
            return this.show
        }
    },
    actions: {
        changeShow(payload) {
            this.show = !!payload;
            this.tabbarKey = Date.now();

        },
    },


});