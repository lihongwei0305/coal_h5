<template>
  <div class="operate-btn">
    <Button class="cancel" @click="$emit('cancel')">返回</Button>
    <div class="w-10px"></div>
    <Button class="confirm" @click="$emit('confirm')">确认</Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";
</script>

<style lang="scss" scoped>
.operate-btn {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  z-index: 99999;
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