<template>
  <CommonPage
      ref="commonPageRef"
      title="生产报表"
      :buttons="buttons"
      :popover-actions="popoverActions"
      v-model:is-operate="isOperate"
      v-model:show-query-popup="showQueryPopup"
      :get-list-attrs="getListAttrs"
      :query-items="queryItems"
      v-bind="$attrs"
  >
    <template #content="{item}">
      <div class="flex justify-between flex-items-end">
        <div class="font-16 font-semibold">{{ item.name }}</div>
        <div class="font-14">{{ item.date }}</div>
      </div>
      <div class="flex mt-8">
        <div class="flex w-50% flex-items-end">
          <div class="font-14 font-medium">初始读数：</div>
          <div>{{ item.initTotalNumber }}</div>
        </div>
        <div class="flex w-50% flex-items-end">
          <div class="font-14 font-medium">入洗原煤：</div>
          <div>{{ item.remark1 }}</div>
        </div>
      </div>
      <div class="font-14 flex justify-around mb-5 mt-10">
        <div class="">
          <div class="font-medium">洗出精煤</div>
          <div>{{ item.remark2 || '无' }}</div>
        </div>
        <div class="">
          <div class="font-medium">洗出矸石</div>
          <div>{{ item.remark8 || '无' }}</div>
        </div>
        <div class="">
          <div class="font-medium">洗出中煤</div>
          <div>{{ item.remark6 || '无' }}</div>
        </div>
        <div class="">
          <div class="font-medium">洗出尾煤</div>
          <div>{{ item.remark10 || '无' }}</div>
        </div>
      </div>
      <div class="font-14 flex justify-around mb-10">
        <div class="">
          <div class="font-medium">精煤回收</div>
          <div>{{ item.remark3 || '无' }}</div>
        </div>

        <div class="">
          <div class="font-medium">矸石回收</div>
          <div>{{ item.remark9 || '无' }}</div>
        </div>
        <div class="">
          <div class="font-medium">中煤回收</div>
          <div>{{ item.remark7 || '无' }}</div>
        </div>

        <div class="">
          <div class="font-medium">尾煤回收</div>
          <div>{{ item.remark11 || '无' }}</div>
        </div>
      </div>
      <div class="flex">
        <div class="flex w-50% flex-items-end">
          <div class="font-14 font-medium">目标灰：</div>
          <div>{{ item.ddp1Min }}</div>
        </div>
        <div class="flex w-50% flex-items-end">
          <div class="font-14 font-medium">目标硫：</div>
          <div>{{ item.ddp2Min }}</div>
        </div>

      </div>
      <div class="row">
        <div class="font-14 font-medium">运行时长：</div>
        <div>{{ item.runHours }}</div>
      </div>
    </template>
  </CommonPage>
  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->
</template>
<script setup>


window.document.title = '生产'

defineOptions({
  name: 'coalWashingDailyAnalysis'
})

import * as Api from '@/api/coalWashingDailyAnalysis.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'


import {confirmDialog} from "@/hooks/useOperateDialog.js";


const router = useRouter();
const commonPageRef = ref(null);
const isOperate = ref(false);
const showQueryPopup = ref(false)

const getListAttrs = ref({
  api: Api.list,
  params: {
    orders: [
      {
        direction: 'DESC',
        property: 'date',
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

const queryConfirm = () => {
  showTop.value = false;
  commonPageRef.value.refreshList();
}

const queryItems = ref([
  {label: '供应商', field: 'supplier', type: 'dictSelect', code: 'supplierDict'},
  {label: '煤源类型', field: 'coalType', type: 'dictSelect', code: 'coal.type'},
  {label: '煤源', field: 'coalInfo', type: 'dictSelect', code: 'coalInfoDict'},
  {label: '订单状态', field: 'orderStatus', type: 'dictSelect', code: 'purchaseOrder.status'},
  {label: '预约时间', field: 'beginTime', type: 'daterange', isEnd: true},
  {label: '归档状态', field: 'archiveStatus', type: 'dictSelect', code: 'archiveStatus'},
])


onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
