import router from '@/router/index.js'
import store from "@/store/index.js";
import Vant from 'vant';
import 'vant/lib/index.css';

import directive from "@/directive/index.js";
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";

const plugins = {
    store,
    router,
    Vant,
    NutUI,
    directive
}


export function usePlugins(app) {

    Object.keys(plugins).forEach(v => {
        app.use(plugins[v].key ? plugins[v].key : plugins[v], plugins[v].params ? plugins[v].params : {})
    })

}


