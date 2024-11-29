<template>
  <van-popup
      :class="classValue"
      ref="popupRef"
      round
      position="bottom"
      :style="{ height: '85%'}"
      @click-overlay="close"
      teleport="body"
      v-bind="$attrs"
  >
    <!--    <div class="wrapper">-->
    <!--      <div class="btns">-->
    <!--        <div class="button" @click=cancel>取消</div>-->
    <!--        <div class="button" @click="confirm">确认</div>-->
    <!--      </div>-->
    <!--      <div class="content">-->
    <!--      </div>-->
    <!--    </div>-->
    <component :is="component.default" v-bind="componentBind" :popupClose="close"
               :popupClass="`.${classValue}`"></component>

  </van-popup>
</template>

<script setup>
import {onMounted, provide, ref} from "vue";
import useUnmount from "@/hooks/useUnmount.js";

const emits = defineEmits(['update:show', 'cancel', 'confirm', 'close'])

const props = defineProps({
  component: Object,
  componentBind: Object,
});
const classValue = ref(`popup_${Date.now()}`)

const popupRef = ref(null);
const close = () => {
  emits('update:show', false);
  emits('close', false)
}
const cancel = () => {
  close();
}

const confirm = () => {
  emits('confirm');
  close();
}

provide('popupClose', close);
provide('inPopup', true);

defineExpose({
  close,

})
onMounted(() => {
})
useUnmount(close);

</script>

<style lang="scss" scoped>

.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  color: #1989fa;
  padding: 0 25px 0;
  font-size: 16px;

  .button {
    padding: 10px 20px
  }
}
</style>
