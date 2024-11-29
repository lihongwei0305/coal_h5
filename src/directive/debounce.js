// 导入lodash库
import {debounce} from 'lodash-es';
// 创建一个自定义指令v-debounce


const _debounce = {

    mounted(el, binding, vnode, prevVnode) {
        // 获取用户传入的参数，例如延迟时间、事件处理函数等
        const debouncedFn = debounce(binding.value,200);
        // // 将防抖函数赋值给元素的事件处理函数
        el.addEventListener(binding.arg, debouncedFn)
    },


    unmounted(el) {
        el.removeEventListener('input', el._v_debounce);
    },
}

export default _debounce;
