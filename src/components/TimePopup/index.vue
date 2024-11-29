<template>
  <div>
    <Popup v-bind="$attrs" @confirm="confirm_popup" @open="handleOpen">
      <div>
        <van-field
            v-model="date"
            readonly
            is-link
            name="日期"
            label="日期"
            placeholder="日期"
            @click="dateShow = true"
        />

        <van-field
            v-if="showTime"
            v-model="time"
            readonly
            is-link
            name="时间"
            label="时间"
            placeholder="时间"
            @click="timeShow = true"
        />
      </div>
    </Popup>


    <van-calendar teleport="body" v-model:show="dateShow" :default-date="defaultDate" switch-mode="month"
                  :show-confirm="false" @confirm="confirm"/>


    <van-popup v-model:show="timeShow" position="bottom" teleport="body">
      <van-time-picker
          v-model="currentTime"
          title="选择时间"
          :columns-type="columnsType"
          teleport="body"
          @cancel="timeShow = false"
          @confirm="confirm_time"
      />
    </van-popup>

  </div>
</template>

<script setup>
import Popup from '@/components/Popup/index.vue'
import {onMounted, ref} from "vue";
import {formatDate} from "@/utils/date.js";
import dayjs from "dayjs";

const emits = defineEmits(['confirm', 'update:time']);
const props = defineProps({
  time: String,
  startTime: Boolean,
  popupConfirm: Function,
  showTime: {
    type: Boolean,
    default: true,
  },
})
const dateShow = ref(false);
const timeShow = ref(false);
const date = ref('');
const time = ref('');
const currentTime = ref([]);
const columnsType = ['hour', 'minute', 'second'];
const defaultDate = ref([]);

// console.log(formatDate(dayjs(new Date())))
const confirm = (e) => {
  date.value = formatDate(e, 'date')
  dateShow.value = false;
}

const confirm_popup = () => {
  let t = date.value + ' ' + time.value;
  emits('update:time', t);
  props.popupConfirm?.(t)
}

const confirm_time = (e) => {
  let {selectedValues} = e
  time.value = selectedValues[0] + ':' + selectedValues[1] + ':' + selectedValues[2];
  timeShow.value = false;
}

const init = () => {
  if (props.time) {
    date.value = formatDate(props.time, 'date');
    time.value = formatDate(props.time, 'HH:mm:ss');
    currentTime.value = [dayjs(props.time).hour(), dayjs(props.time).minute(), dayjs(props.time).second()];
    defaultDate.value = new Date(props.time);
  } else {
    date.value = formatDate(dayjs(new Date()), 'date');
    if (props.startTime) {
      time.value = formatDate(dayjs(new Date()), '00:00:00');
    } else {
      time.value = formatDate(dayjs(new Date()), '23:59:59');
    }

    currentTime.value = [dayjs(new Date()).hour(), dayjs(new Date()).minute(), dayjs(new Date()).second()];
  }

}

const handleOpen = () => {
  init();
}

onMounted(() => {

})

</script>

<style lang="scss" scoped>

</style>
