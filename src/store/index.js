import { createPinia } from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'



const store = createPinia().use(createPersistedState({
    storage: sessionStorage
}))


export default store
