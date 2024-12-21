<template>
  <div class="navbar navbar_header">
    <div class="wrapper">
      <div v-if="showLeft" class="left" @click="handleLeftClick">
        <van-icon v-if="showLeftIcon" name="arrow-left"/>
        <span v-else class="fs-14 font-normal">{{ leftText }}</span>
      </div>
      <div class="mid">{{ title }}</div>
      <div class="right">
        <div class="scan" @click="openScan">
          <van-icon name="scan" size="24"/>
        </div>
        <div class="gongneng" v-if="isPopover && Object.keys(actions).length">
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

  <!--  <scan v-if="scanShow" v-model:show="scanShow"></scan>-->

</template>

<script setup>
import {useRouter} from 'vue-router'
import {ref} from "vue";

import {useMyPopup} from '@/components/myPopup/useMyPopup.js';
import Scan from "@/components/Scan/index.vue";
import {createComponent} from "@/components/mountComponent/index.js";

const router = useRouter();

const {popupClose, inPopup} = useMyPopup();


const emits = defineEmits(["update:select", 'select', 'shaixuan']);
const props = defineProps({
  title: String,
  popover: Object,
  isPopover: {
    type: Boolean,
    default: true,
  },
  actions: Array,
  showFilter: {
    type: Boolean,
    default: true,
  },
  showLeft: {
    type: Boolean,
    default: true,
  },
  showLeftIcon: {
    type: Boolean,
    default: true,
  },
  leftText: {
    type: String,
    default: '返回',
  }
})

const showPopover = ref(false);
const scanShow = ref(false);

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

const openScan = async () => {
  await router.push('/qrcode');
  // await createComponent({
  //   component: await import('@/components/Scan/index.vue'),
  //   params: {
  //     show: true,
  //     onScanResult: (data) => {
  //       console.log('data', data);
  //     },
  //
  //   }
  // })


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

      .scan {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
      }
    }
  }


}
</style>