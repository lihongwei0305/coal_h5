import {ref} from "vue";

export function useOperate() {


    const state = ref({});

    function init(data) {
        for (const dataKey in data) {
            state.value[dataKey] = data[dataKey];
        }
    }


    return{
        state,

    }

}
