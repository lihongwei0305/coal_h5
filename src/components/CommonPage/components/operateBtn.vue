<template>
  <div class="operate-btn">
    <Button class="cancel" @click="$emit('cancel')">{{leftLabel}}</Button>
    <div class="w-10px"></div>
    <Button class="confirm" @click="$emit('confirm')">{{rightLabel}}</Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";

const props = defineProps({
  leftLabel: {
    type: String,
    default: '取消',
  },
  rightLabel:{
    type: String,
    default: '确认',
  }
})

</script>

<style lang="scss" scoped>
.operate-btn {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  z-index: 999;
  bottom: 20px;
  display: flex;
  justify-content: center;
  padding: 0 30px;

  .button {
    flex: 1;
    text-align: justify;
    text-align-last: justify;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    padding: 0 50px;
    color: #fff !important;
    border-color: #fff !important;
  }

  .cancel {
    background-color: #f36302 !important;
  }

  .confirm {
    background-color: #0b78ea !important;
  }
}
</style>