<template>
  <CommonPage
      ref="commonPageRef"
      title="单据查询"
      :Api="Api"
      :buttons="buttons"
      :popover-actions="popoverActions"
      v-model:is-operate="isOperate"
      v-model:show-query-popup="showQueryPopup"
      :get-list-attrs="getListAttrs"
      :query-items="queryItems"
      :show-archive="false"
      v-bind="$attrs"
  >
    <template #content="{item}">
      <div class="flex flex-items-end">
        <div font-semibold>编号：</div>
        <div>{{ item.receiptNo || '' }}</div>
      </div>
      <div class="flex flex-items-end">
        <div font-semibold>类型：</div>
        <div>{{ item.receiptTypeName || '' }}</div>
      </div>

      <div class="flex flex-items-end">
        <div font-semibold>日期：</div>
        <div>{{ item.receiptDate }}</div>
      </div>
      <div class="row justify-between">
        <div flex flex-col items-center>
          <span font-semibold>商品数量</span>
          <span>{{ item.detail?.length || 0 }}</span>
        </div>
        <div flex flex-col items-center>
          <span font-semibold>数量合计</span>
          <span>{{ item.number }}</span>
        </div>
        <div flex flex-col items-center>
          <span font-semibold>金额合计</span>
          <span>{{ item.amount }}</span>
        </div>
      </div>
      <div class="flex">
        <div font-semibold>制单人：</div>
        <div>{{ item.creator }}</div>
      </div>
      <div class="flex">
        <div font-semibold>备注：</div>
        <div>{{ item.remarks }}</div>
      </div>

    </template>
  </CommonPage>

  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->

</template>
<script setup>


window.document.title = '库房';

defineOptions({
  name: 'warehouseReceipt'
})

import * as Api from '@/api/warehouseReceipt.js'
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
      // {
      //   direction: 'DESC',
      //   property: 'passTime',
      // }
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
  {label: '设备', field: 'device', type: "dictSelect", code: 'acDeviceDict'},
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
