import {ref} from "vue";

export function useCheckboxForList(list, isOperate, isCheckBox) {

    const checkMap = new Map();

    const isCheckAll = ref(false)
    const indeterminate = ref(false)

    const changeCheckbox = (item) => {
        if (!isOperate) return;
        if(item.disabled) return;
        if (!isCheckBox.value) {

            list.value.forEach(item => {
                item.checked = false
            })
        }

        item.checked = !item.checked
    }
    const handleCheckAllChange = (val) => {

        list.value.forEach(item => {
            item.checked = val
        })
    }
    const handleCheckItemChange = (e, item) => {
        if (e) {
            checkMap.set(item, item.id);
        } else {
            checkMap.delete(item)
        }
        isCheckAll.value = checkMap.size === list.value.length;
        indeterminate.value = checkMap.size > 0 && checkMap.size < list.value.length;
    };


    return {
        checkMap,
        indeterminate,
        isCheckAll,
        changeCheckbox,
        handleCheckAllChange,
        handleCheckItemChange,
    };
}