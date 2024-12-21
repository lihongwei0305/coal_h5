<template>
  <van-popup
      round
      position="bottom"
      :style="{ height: '70%'}"
      @click-overlay="close"
      teleport="body"
      v-bind="$attrs"
  >
    <div class="wrapper">
      <div class="btns" v-if="showHeaderButtons">
        <div class="button" @click=cancel>取消</div>
        <div class="button" @click="confirm">确认</div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>

  </van-popup>
</template>

<script setup>

import useUnmount from "@/hooks/useUnmount.js";

const props = defineProps({
  showHeaderButtons: {
    type: Boolean,
    default: true
  },

});


const emits = defineEmits(['update:show', 'cancel', 'confirm', 'close'])
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
useUnmount(close);


defineExpose({
  cancel,
  confirm,
})

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
