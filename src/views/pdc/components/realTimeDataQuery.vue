<template>
  <van-popup round position="top" :style="{ height: '45%' }" v-bind="$attrs">
    <div style="height: 100%; position: relative">
      <div class="header">
        <van-icon name="filter-o" />
        筛选
      </div>
      <div class="content">
        <van-form>
          <van-cell-group inset>
            <van-field
                v-model="queryForm.startTime"
                readonly
                is-link
                name="开始时间"
                label="开始时间"
                placeholder="开始时间"
                @click="startTimePopupShow = true"
            />
            <van-field
                v-model="queryForm.endTime"
                readonly
                is-link
                name="结束时间"
                label="结束时间"
                placeholder="结束时间"
                @click="endTimePopupShow = true"
            />

          </van-cell-group>
        </van-form>
      </div>

      <div class="footer">
        <div class="button reset" @click="handleReset">重置</div>
        <div class="button confirm" @click="handleConfirm">确认</div>
      </div>
    </div>


    <TimePopup v-model:show="startTimePopupShow" v-model:time="queryForm.startTime" startTime></TimePopup>
    <TimePopup v-model:show="endTimePopupShow" v-model:time="queryForm.endTime"></TimePopup>

  </van-popup>
</template>

<script setup>
import {ref} from "vue";

import dayjs from "dayjs";

const emits = defineEmits(['queryConfirm'])

const startTimePopupShow = ref(false)
const endTimePopupShow = ref(false);
const queryForm = ref({
  startTime: dayjs(new Date).format('YYYY-MM-DD 00:00:00'),
  endTime:dayjs(new Date).format('YYYY-MM-DD 23:59:59'),
});

const handleReset = () => {
  queryForm.value = {
    startTime: dayjs(new Date).format('YYYY-MM-DD 00:00:00'),
    endTime:dayjs(new Date).format('YYYY-MM-DD 23:59:59'),
  };

}

const getItems = () => {
  let form = {
    ...queryForm.value,
  }

  return form;
}

const handleConfirm = () => {
  let items = getItems();
  emits('queryConfirm', items)
};




defineExpose({
  getItems,

})
</script>

<style lang="scss" scoped>
.header{
  text-align: right;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 30px;
}
.content{

}
.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 15px;
  left: 0;
  box-sizing: border-box;
  padding: 0 20px 10px;

  .button {
    padding: 10px 50px;
    border-radius: 16px;
    color: #FFF;
  }

  .reset {
    background-color: #ecb90e;
  }

  .confirm {
    background-color: #1989fa;
  }
}

</style>
