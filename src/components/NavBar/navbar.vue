<template>
  <div class="navbar navbar_header">
    <div class="wrapper">
      <div class="left" @click="handleLeftClick">
        <van-icon name="arrow-left"/>
      </div>
      <div class="mid">{{ title }}</div>
      <div class="right">
        <div class="gongneng" v-if="isPopover">
          <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect" v-bind="popover">
            <template #reference>
              <van-icon name="arrow-down" :size="24"/>
            </template>
          </van-popover>

        </div>
        <div v-if="showFilter" class="shaixuan" @click="$emit('shaixuan')">
          <van-icon name="filter-o" size="24"/>
        </div>
      </div>
    </div>

  </div>


</template>

<script setup>
import {useRouter} from 'vue-router'
import {inject, ref} from "vue";


const router = useRouter();

const emits = defineEmits(["update:select", 'select', 'shaixuan']);
const props = defineProps({
  title: String,
  popover: Object,
  isPopover: {
    type: Boolean,
    default: true,
  },
  actions: Array,
  showFilter:{
    type: Boolean,
    default: true,

  }
})

const showPopover = ref(false);

const popupClose = inject("popupClose");
const inPopup = inject("inPopup");

// 通过 actions 属性来定义菜单选项

const selectAction = ref('');

const onSelect = (action) => {
  emits('select', action);
};
const handleLeftClick = () => {
  if (inPopup) {
    popupClose();
  } else {
    router.back();

  }

};
defineExpose({
  selectAction,
})

</script>

<style lang="scss" scoped>
.navbar_header {
  box-sizing: border-box;
  background-color: #008dff;
  position: sticky;
  width: 100%;
  inset: 0;
  z-index: 999;
  height: 38px;
  color: #fff;


  .wrapper {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      width: 40px;
      height: 100%;
      font-size: 24px;
      font-weight: bold;
      text-align: right;
      line-height: 38px;
      position: absolute;
    }

    .mid {
      width: 100%;
      font-size: 16px;
      text-align: center;
    }

    .right {
      position: absolute;
      right: 0;
      display: flex;
      height: 100%;

      .gongneng {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
      }

      .shaixuan {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
      }
    }
  }


}
</style>