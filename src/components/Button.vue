<template>
  <div class="button" @click="handleClick" :class="getClass" :style="{}">
    <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor"
            d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z">
        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
                          values="0 12 12;360 12 12"></animateTransform>
      </path>
    </svg>
    <template v-if="label">{{ label }}</template>
    <slot v-else></slot>
  </div>
</template>

<script setup>

import {computed} from "vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  label: String,
  loading: Boolean,
  color: String,
  item: Object,
  type: String,

})
const getClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'primary';
    case 'warring':
      return 'warring';
    case 'danger':
      return 'danger';
    case 'success':
      return 'success';
  }
})

const handleClick = () => {
  if (props.loading) return;
  emits('click', props.item);

}
</script>

<style lang="scss" scoped>
.button {
  box-sizing: border-box;
  border-radius: 8px;
  padding: 5px 10px;
  transition: all .3s;
  border: 1px solid #000;
  color: #000;
}

.primary {
  border: 1px solid #1273df;
  color: #1273df;
}

.warring {
  border: 1px solid #ff976a;
  color: #ff976a;
}

.danger {
  border: 1px solid #ee0a24;
  color: #ee0a24;
}

.success {
  border: 1px solid #07c160;
  color: #07c160;
}
</style>