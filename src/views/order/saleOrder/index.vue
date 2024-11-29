<template>
  <CommonPage
      ref="commonPageRef"
      title="销售订单"
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
      <div class="row" style="justify-content: space-between; font-weight: 600; align-items: center">
        <div class="fs-16">{{ item.supplier?.name || '' }} - {{
            item.productInfo?.name || ''
          }}({{ item.productInfo.coalTypeName || '' }})
        </div>
        <div class="oval_box" :style="orderStatusStyle(item)">{{ item.orderStatusName }}</div>
      </div>
      <div class="row" style="justify-content: space-between">
        <div class="" style="width: 25%">
          <div class="font-semibold">采购数量</div>
          <div>{{ item.amount }}</div>

        </div>
        <div class="" style="width: 25%">
          <div class="font-semibold">采购单价</div>
          <div>{{ item.price }}</div>
        </div>
        <div class="" style="width: 25%">
          <div class="font-semibold">其他费用</div>
          <div>{{ item.otherFee }}</div>
        </div>
        <div class="" style="width: 25%">
          <div class="font-semibold">采购总价</div>
          <div>{{ item.total }}</div>
        </div>
      </div>
      <div class="row" style="justify-content: space-between">
        <div class="" style="width: 25%;">
          <div class="font-semibold">车数</div>
          <div>{{ item.totalCarCount }}</div>

        </div>
        <div class="" style="width: 25%;">
          <div class="font-semibold">已收货数量</div>
          <div>{{ item.receivedAmount }}</div>
        </div>
        <div class="" style="width: 25%;">
          <div class="font-semibold">未收货数量</div>
          <div>{{ item.leftAmount }}</div>
        </div>
        <div class="" style="width: 25%;">
          <div class="font-semibold">天数</div>
          <div>{{ item.dayAmount }}</div>
        </div>
      </div>


      <div class="row">
        <div class="title">含税：</div>
        <div>{{ item.includeTax ? '是' : '否' }}</div>
        <template v-if="item.includeTax">
          <div style="display: flex;align-items: center" class="ml-20">
            <div class="font-semibold">税率：</div>
            <div>{{ item.taxRate }}%</div>
          </div>
        </template>
      </div>
      <div class="row">
        <div class="title">采购时间：</div>
        <div>{{ item.startTime }}</div>
      </div>
      <div class="row">
        <div class="title">完成时间：</div>
        <div>{{ item.finishTime }}</div>
      </div>

    </template>
  </CommonPage>

  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->
</template>
<script setup>


window.document.title = '订单'

defineOptions({
  name: 'saleOrder'
})

import * as Api from '@/api/saleOrder.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'



import {confirmDialog} from "@/hooks/useOperateDialog.js";


const router = useRouter();
const commonPageRef = ref(null);

const isOperate = ref(false);
const showQueryPopup = ref(false);
const getListAttrs = ref({
  params:{
    orders:[
      {
        direction: 'DESC',
        property: 'startTime',
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



const orderStatusStyle = computed(() => {
  let backgroundColor;
  return (row) => {
    switch (row.orderStatus) {
      case '0':
        backgroundColor = 'blue';
        break;
      case '1':
        backgroundColor = '#e6a23c';
        break;
      case '2':
        backgroundColor = 'green';
        break;
      case '3':
        backgroundColor = 'red';
        break;
    }


    return {
      backgroundColor,
    }
  }
})


const queryItems = ref([
  {label: '客户信息', field: 'supplier', type: 'dictSelect', code: 'supplierDict'},
  {label: '煤源类型', field: 'coalType', type: 'dictSelect', code: 'coal.type'},
  {label: '产品信息', field: 'coalInfo', type: 'dictSelect', code: 'productDict'},
  {label: '订单状态', field: 'orderStatus', type: 'dictSelect', code: 'saleOrder.status'},
  {label: '销售时间', field: 'startTime', type: 'daterange'},
  {label: '归档', field: 'archiveStatus', type: 'dictSelect', code: 'archiveStatus'},
])

onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
