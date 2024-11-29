import {createApp} from "vue";
import {usePlugins} from "@/utils/usePlugins.js";
import {showLoadingToast, closeToast} from "vant";


export async function createComponent(params) {
    showLoadingToast({
        message: '加载中...',
        loadingType: 'spinner',

    })
    let component = await import('/src/components/mountComponent/mountComp.vue');
    let div = document.createElement('div')
    document.body.appendChild(div)
    let app = createApp(component.default, {
        remove: unmount,
        ...params
    });
    usePlugins(app)
    app.mount(div)

    closeToast();


    function unmount() {
        app.unmount();
        div.remove();
    }

}
