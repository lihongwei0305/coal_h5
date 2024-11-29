import router from "@/router/index.js";

export default function useUnmount(close) {

    router.beforeEach((to, from, next) => {
        close();
        next();
    })


}