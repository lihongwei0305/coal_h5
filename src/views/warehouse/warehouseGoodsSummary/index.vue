<template>
  <CommonPage
      ref="commonPageRef"
      title="库存查询"
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
      <div class="row">
        <div class="font-semibold">{{ item.name || '' }}</div>
      </div>
      <div class="row justify-between">
        <div>{{ item.warehouse?.name || '' }}</div>
        <div>当前库存：{{ item.type0Number - item.type1Number }}</div>
      </div>
      <div class="row justify-between">
        <div class="">
          <div>入库数量合计：<span>{{item.type0Number}}</span></div>
        </div>
        <div class="">
          <div>出库数量合计：<span>{{item.type1Number}}</span></div>
        </div>
      </div>
      <div class="row justify-between">
        <div class="">
          <div>入库金额合计：<span>{{item.type0Amount}}</span></div>
        </div>
        <div class="">
          <div>出库金额合计：<span>{{item.type1Amount}}</span></div>
        </div>
      </div>


    </template>
  </CommonPage>

  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->

</template>
<script setup>


window.document.title = '库房';

defineOptions({
  name: 'warehouseGoodsSummary'
})

import * as Api from '@/api/warehouseGoodsSummary.js'
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
