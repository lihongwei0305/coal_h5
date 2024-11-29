<template>
  <CommonPage
      ref="commonPageRef"
      title="道闸数据"
      :Api="Api"
      :buttons="buttons"
      :popover-actions="popoverActions"
      v-model:is-operate="isOperate"
      v-model:show-query-popup="showQueryPopup"
      :get-list-attrs="getListAttrs"
      :query-items="queryItems"
      v-bind="$attrs"
  >
    <template #content="{item}">
      <div class="row">
        <div class="title">车牌号：</div>
        <div>{{ item.plateNo || '' }}</div>
      </div>
      <div class="row">
        <div class="title">停车场名称：</div>
        <div>{{ item.parkName || '' }}</div>
      </div>
      <div class="row">
        <div class="title">出入口：</div>
        <div>{{ item.gateName || '' }}</div>
      </div>
      <div class="row">
        <div class="title">车道名称：</div>
        <div>{{ item.laneName || '' }}</div>
      </div>
      <div class="row">
        <div class="title">设备名称：</div>
        <div>{{ item.device?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">通行时间：</div>
        <div>{{ item.passTime || '' }}</div>
      </div>


    </template>
  </CommonPage>

  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->

</template>
<script setup>


window.document.title = '门禁道闸'

defineOptions({
  name: 'accessgateData'
})

import * as Api from '@/api/acDeviceData.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'



import {confirmDialog} from "@/hooks/useOperateDialog.js";


const router = useRouter();
const commonPageRef = ref(null);

const isOperate = ref(false);
const showQueryPopup = ref(false);
const getListAttrs = ref({
  params: {
    orders: [
      {
        direction: 'DESC',
        property: 'passTime',
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


const popoverActions = ref([
  {
    text: '删除', value: 'remove', api: Api.remove, click: () => {
      isOperate.value = true;
    }
  }
]);

const buttons = ref([
  {label: '删除', color: 'red', onClick: remove},

])

const queryItems = ref([
  {label: '设备', field: 'device',type:"dictSelect", code: 'acDeviceDict'},
  {label: '车牌号', field: 'plateNo'},
  {label: '通行时间', field: 'passTime', type: 'daterange'},
])


onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
