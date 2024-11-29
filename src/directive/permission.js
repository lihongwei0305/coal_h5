import {useUserStore} from '@/store/user'

const permission = {

    mounted(el, binding, vnode, prevVnode) {
        let {value, arg} = binding;
        if (!value) {
            return;
        }
        const userStore = useUserStore();

        if (Array.isArray(value)) {
            !(userStore.menuList.some(v => value.includes(v.url))) && el.remove();

        } else {
            !(userStore.menuList.some(v => v.url === value)) && el.remove();
        }
    },
}

export default permission

