<template>
  <van-popup ref="popupRef" teleport="body" style="width: 100%; padding: 0; min-width: 100%" v-bind="$attrs">
    <Qrcode></Qrcode>
  </van-popup>

</template>
<script setup>
import {reactive, ref} from 'vue'
import {defineComponent, toRefs, onMounted, onUnmounted} from 'vue'

import Qrcode from '@/views/qrcode/index.vue'
const popupRef = ref(null);
const props = defineProps({});
const emits = defineEmits(['update:show', 'close', 'scanResult'])


const close = () => {
  emits('update:show', false);
  emits('close')
}



// 添加事件监听器


onMounted(() => {


})
onUnmounted(() => {

})


</script>
<style lang="scss" scoped>

</style>
