import {nextTick, onMounted, ref} from "vue";
import {tree} from "@/api/dictionary.js";

export function useDictSelect(code) {
    const show = ref(false);
    const treeData = ref({});
    const state = ref({
        id: [],
        name: ''
    });

    const getTree = async () => {
        let {data: res} = await tree({
            code
        })
        treeData.value = res;
    };

    const clear = () => {
        state.value.id = [];
        state.value.name = "";
    }

    onMounted(async () => {
        if (code) {
            await getTree(code);
        }
    })

    return [
        show,
        treeData,
        state,
        clear
    ]

}
