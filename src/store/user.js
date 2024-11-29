import {defineStore} from 'pinia'
import {clearCache, resources} from '@/api/user.js'
import * as loginApi from '@/api/login'

export const useUserStore = defineStore("user", {
    state: () => ({
        userInfo: {},
        resources: [],
    }),


    actions: {
        async login(payload) {
            let {data: loginData} = await loginApi.login(payload)
            // let {purchaseOrder: organizationData} = await organizationApi.getById({id: loginData.organizationId})
            this.userInfo = loginData

            // this.userInfo.organizationName = organizationData.name
            await this.setResources();

        },

        async logout() {
            await loginApi.logout();
            this.$reset()
        },

        async setResources(isClear) {
            if (isClear) {
                await clearCache();
            }
            let {data} = await resources();
            this.resources = data.filter(v => v.type !== '3')
        },

    },


    getters: {
        buttonPermission() {
            return this.resources.filter(v => v.type === '1').map(v => v.code)
        },
        menuList() {
            return this.resources.filter(v => v.type !== '1')
        },
    },

    persist: true,

});


