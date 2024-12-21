<template>
  <div>
    <Popup ref="popupRef" @confirm="confirm_popup" @open="handleOpen" :show-header-buttons="false" v-bind="$attrs">

      <van-picker-group
          :title="title"
          :tabs="['开始时间', '结束时间']"
          @confirm="onConfirm"
          @cancel="onCancel"
      >

        <van-calendar
            switch-mode="year-month"
            :show-title="false"
            :poppable="false"
            :show-confirm="false"

            :default-date="state.startTime"
            @confirm="handleConfirm_start"
        />

        <van-calendar
            switch-mode="year-month"
            :show-title="false"
            :poppable="false"
            :show-confirm="false"
            :default-date="state.endTime"

            @confirm="handleConfirm_end"
        />

      </van-picker-group>
    </Popup>


  </div>
</template>

<script setup>
import Popup from '@/components/Popup/index.vue'
import {onMounted, reactive, ref} from "vue";
import {formatDate} from "@/utils/date.js";
import dayjs from "dayjs";
import {showToast} from "vant";

const emits = defineEmits(['confirm', 'update:time']);
const props = defineProps({
  title: String,
  time: Array,
  popupConfirm: Function,
});
const popupRef = ref(null);

const state = reactive({
  startTime: null,
  endTime: null,
})

const confirm_popup = () => {
  console.log('confirm_popup')
  let t = [formatDate(state.startTime, 'YYYY-MM-DD'), formatDate(state.endTime, 'YYYY-MM-DD')];
  props.popupConfirm?.(t)
}


const onConfirm = () => {
  if (!state.startTime) {
    return showToast('请选择开始时间');
  }
  if (!state.endTime) {
    return showToast('请选择结束时间');
  }
  let startTime = formatDate(state.startTime, 'date');
  let endTime = formatDate(state.endTime, 'date');
  console.log(dayjs(endTime).diff(startTime))
  if (dayjs(endTime).diff(startTime) < 0) {
    return showToast('开始时间应比结束时间大');
  }
  popupRef.value.confirm();
};

const onCancel = () => {
  popupRef.value.cancel();
};


const handleConfirm_start = (e) => {
  state.startTime = e;
};
const handleConfirm_end = (e) => {
  state.endTime = e;
};
const init = () => {
  if (props.time.length) {
    state.startTime = new Date(props.time[0]);
    state.endTime = new Date(props.time[1]);
  } else {
    state.startTime = new Date();
    state.endTime = new Date();
  }


}

const handleOpen = () => {
  init();
}

onMounted(() => {

})

</script>

<style lang="scss" scoped>
.van-calendar{
  height: 450px;
}
</style>
