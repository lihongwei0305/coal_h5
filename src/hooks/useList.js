import {onActivated} from "vue";
import {useRouter} from 'vue-router'

export function useList() {
    const router = useRouter();


    const addMeta = (name,meta) => {
        let routes = router.getRoutes();
        let cur = routes.find(v => v.name === name);
        cur.meta = {
            ...cur?.meta || {},
            ...meta,
        }
    }


    // onActivated(() => {
    //     if (router.currentRoute.value.meta?.isRefresh) {
    //         setTimeout(() => {
    //             window.scrollTo(0, 0);
    //             refreshing.value = true;
    //             onRefresh();
    //         }, 50);
    //     }
    // })

    return {
        addMeta,

    }

}
