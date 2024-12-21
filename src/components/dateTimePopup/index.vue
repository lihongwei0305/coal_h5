<template>
  <div>
    <Popup ref="popupRef" @confirm="confirm_popup" @open="handleOpen" :show-header-buttons="false" v-bind="$attrs">

      <van-picker-group
          :title="title"
          :tabs="['选择日期', '选择时间']"
          @confirm="onConfirm"
          @cancel="onCancel"
      >

        <van-calendar
            switch-mode="year-month"
            :show-title="false"
            :poppable="false"
            :show-confirm="false"
            :default-date="state.date"
            @confirm="handleConfirm_start"
        />
        <van-time-picker
            v-model="state.time"
            title="选择时间"
            :columns-type="['hour', 'minute', 'second']"
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
  time: String,
  popupConfirm: Function,
});
const popupRef = ref(null);

const state = reactive({
  date: null,
  time: null,
})

const confirm_popup = () => {
  let date = formatDate(state.date, 'date') + ` ${state.time.join(':')}`;
  props.popupConfirm(date);

}


const onConfirm = () => {
  if (!state.date) {
    return showToast('请选择日期');
  }
  if (!state.time) {
    return showToast('请选择时间');
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
  if (props.time) {
    let date = formatDate(props.time, 'YYYY-MM-DD');
    let time = formatDate(props.time, 'HH:mm:ss');
    state.date = new Date(date);
    state.time = time.split(':');
  } else {
    state.date = new Date();
    state.time = (formatDate(dayjs(), 'HH:mm:ss')).split(":");
  }


}

const handleOpen = () => {
  init();
}

onMounted(() => {

})

</script>

<style lang="scss" scoped>
.van-calendar {
  height: 450px;
}
</style>
