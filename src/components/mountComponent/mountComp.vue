<template>
  <div>
    <component :is="component.default" v-bind="state.bind" @closed="closed" @close="close"></component>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";


const props = defineProps({
  component: Object,
  params: Object,
  remove: Function,

})

let state = reactive({
  bind:{},
})

onMounted(() => {
  state.bind = {...props.params};
})

const close = () => {
  state.bind.show = false;
  state.bind.visible = false;
}
const closed = () => {
  props.remove()

}


</script>

<style lang="scss" scoped>

</style>
