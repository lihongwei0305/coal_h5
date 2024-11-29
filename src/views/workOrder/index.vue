<template>
  <CommonPage
      ref="commonPageRef"
      title="设备工单"
      :Api="Api"
      :buttons="buttons"
      :popover-actions="popoverActions"
      v-model:is-operate="isOperate"
      :show-archive="false"
      v-model:show-query-popup="showQueryPopup"
      :query-items="queryItems"
  >
    <template #content="{item}">
      <div class="row">
        <div>设备：</div>
        <div>{{ item.device?.name || '' }}</div>
      </div>


      <div class="row">
        <div>工单类型：</div>
        <div>{{ item.typeName }}</div>
      </div>
      <div class="row">
        <div>工单状态：</div>
        <div>{{ item.orderStatusName }}</div>
      </div>
      <div class="row">
        <div>工单时间：</div>
        <div>{{ item.time }}</div>
      </div>

    </template>
  </CommonPage>
  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->
  <van-floating-bubble v-if="!isOperate" icon="plus" @click="$router.push('/workOrder/operate')"/>
</template>
<script setup>


window.document.title = '设备'

defineOptions({
  name: 'workOrder'
})

import * as Api from '@/api/deviceWorkOrder.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'



import {confirmDialog} from "@/hooks/useOperateDialog.js";


const router = useRouter();
const commonPageRef = ref(null);

const isOperate = ref(false);
const showQueryPopup = ref(false);

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
  {label: '设备', field: 'device', type: 'dictSelect', code: 'deviceDict'},
  {label: '工单类型', field: 'workOrderType', type: 'dictSelect', code: 'device.workOrder.type'},
  {label: '工单状态', field: 'workOrderStatus', type: 'dictSelect', code: 'device.workOrder.status'},

])


onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
