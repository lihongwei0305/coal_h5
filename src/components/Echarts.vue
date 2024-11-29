<template>
  <div ref="echartsRef"></div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';

const echartsRef = ref(null)
let myChart = null
const emits = defineEmits(['initDown'])
const props = defineProps({
  options: {
    type: Object,
    default: {}
  }
})

onMounted(() => {
  myChart = echarts.init(echartsRef.value);
  myChart.setOption(props.options);

  emits('initDown',myChart)
})

watch(() => props.options, () => {

  myChart?.setOption(props.options);
}, {
  deep: true, immediate: false
})



</script>

<style lang="scss" scoped>

</style>
