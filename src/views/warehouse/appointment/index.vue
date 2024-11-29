<template>
  <CommonPage
      ref="commonPageRef"
      title="车辆预约"
      :Api="Api"
      :buttons="buttons"
      :popover-actions="popoverActions"
      :get-list-attrs="getListAttrs"
      v-model:is-operate="isOperate"
      v-model:show-query-popup="showQueryPopup"
      :query-items="queryItems"
      v-bind="$attrs"
  >
    <template #content="{item}">
      <div class="row">
        <div class="title">车牌号：</div>
        <div>{{ item.plateNo || '' }}</div>
      </div>
      <div class="row">
        <div class="title">姓名：</div>
        <div>{{ item.driverName || '' }}</div>
      </div>
      <div class="row">
        <div class="title">联系电话：</div>
        <div>{{ item.driverPhone || '' }}</div>
      </div>
      <div class="row">
        <div class="title">预约时间：</div>
        <div>{{ formatDate(item.startTime, 'date') + ' - ' + formatDate(item.endTime, 'date') }}</div>
      </div>
      <div class="row">
        <div class="title">预约状态：</div>
        <div
            :style="{'color': item.appointmentStatus == 0 ? 'rgb(83, 134, 236)' : item.appointmentStatus == 1 ? 'rgb(255, 99, 132)' : 'rgb(255, 159, 64)'}">
          {{ item.appointmentStatusName || '' }}
        </div>
      </div>
      <div class="row">
        <div class="title">事由：</div>
        <div>{{ item.reason || '' }}</div>
      </div>


    </template>
  </CommonPage>

  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->
  <van-floating-bubble v-if="!isOperate" icon="plus" @click="$router.push('/accessgate/appointment/operate')"/>
</template>
<script setup>


import {formatDate} from "@/utils/date.js";

window.document.title = '门禁道闸'

defineOptions({
  name: 'accessgateAppointment'
})

import * as Api from '@/api/acAppointment'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'


import {confirmDialog} from "@/hooks/useOperateDialog.js";


const router = useRouter();
const commonPageRef = ref(null);
const queryFormRef = ref(null)
const isOperate = ref(false);
const showQueryPopup = ref(false);


const getListAttrs = ref({
  params: {
    orders: [
      {
        direction: 'DESC',
        property: 'createTime',
      }
    ]
  }
})

const remove = (item) => {
  confirmDialog('删除', {
    getList: commonPageRef.value.refreshList,
    length: 0,
    confirm: () => Api.remove({ids: [item.id]})
  });
}
const edit = (item) => {
  router.push(`/accessgate/appointment/operate?type=edit&id=${item.id}`)
}

const popoverActions = ref([
  {
    text: '删除', value: 'remove', api: Api.remove, click: () => {
      isOperate.value = true;
    }
  }
]);

const buttons = ref([
  {label: '编辑', color: '#d18807', onClick: edit},
  {label: '删除', color: 'red', onClick: remove},

])

const queryItems = ref([
  {label: '设备', field: 'device', type: 'dictSelect', code: 'acDeviceDict'},
  {label: '车牌号', field: 'plateNo'},
  {label: '姓名', field: 'driverName'},
  {label: '预约状态', field: 'appointmentStatus', type: 'dictSelect', code: 'appointment.status'},
])

onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
