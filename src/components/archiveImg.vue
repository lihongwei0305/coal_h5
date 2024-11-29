<template>
  <img v-if="archiveStatus == 1" style="width: 100%; height: 100%" src="@/assets/image/yiguidang.png" alt="">
  <img v-else style="width: 100%; height: 100%" src="@/assets/image/weiguidang.png" alt="">
</template>

<script setup>
defineProps({
  archiveStatus: String,
})
</script>

<style lang="scss" scoped>

</style>