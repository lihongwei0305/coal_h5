import {inject} from "vue";

export function useMyPopup() {

    const popupClose = inject("popupClose",null)

    const inPopup = inject("inPopup",null)

    return {
        popupClose,
        inPopup,
    }

}