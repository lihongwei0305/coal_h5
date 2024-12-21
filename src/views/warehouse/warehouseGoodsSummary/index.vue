<template>
  <CommonPage
      ref="commonPageRef"
      title="库存查询"
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
      <div class="row justify-between">
        <div class="font-semibold fs-16">{{ item.name || '' }}</div>
        <div>{{ item.code }}</div>
      </div>

      <div class="row justify-between">
        <div class="">
          <div><span>{{ item.categoryName }}</span></div>
        </div>

      </div>
      <div class="row justify-between">
        <div class="">
          <div>仓库：<span>{{ item.warehouseName }}</span></div>
        </div>
        <div v-if="item.shelveId" class="">
          <div>货架：<span>{{ item.shelveName }}</span></div>
        </div>
      </div>


      <div flex justify-between fs-14 mb-10px>
        <div class="kc_item">
          <div font-medium>当前库存</div>
          <div>
            <div>数量：{{ item.currNumber }}</div>
            <div>单价：{{ item.currPrice }}</div>
            <div>金额：{{ item.currAmount }}</div>
          </div>
        </div>
        <div class="kc_item">
          <div font-medium>上期结存</div>
          <div>
            <div>数量：{{ item.prevNumber }}</div>
            <div>单价：{{ item.prevPrice }}</div>
            <div>金额：{{ item.prevAmount }}</div>
          </div>
        </div>

      </div>

      <div flex justify-between fs-14>
        <div class="kc_item">
          <div font-medium>本期收入</div>
          <div>
            <div>数量：{{ item.type0Number }}</div>
            <div>单价：{{ item.type0Price }}</div>
            <div>金额：{{ item.type0Amount }}</div>
          </div>
        </div>
        <div class="kc_item">
          <div font-medium>本期发出</div>
          <div>
            <div>数量：{{ item.type1Number }}</div>
            <div>单价：{{ item.type1Price }}</div>
            <div>金额：{{ item.type1Amount }}</div>
          </div>
        </div>

      </div>


    </template>

    <template #query_excludeEmpty="{queryForm,item}">
      <van-field name="checkbox" :label="item.label">
        <template #input>
          <van-checkbox v-model="queryForm.excludeEmpty" shape="square"/>
        </template>
      </van-field>
    </template>
    <template #query_shelveSummary="{queryForm,item}">
      <van-field name="checkbox" :label="item.label">
        <template #input>
          <van-checkbox v-model="queryForm.shelveSummary" shape="square"/>
        </template>
      </van-field>
    </template>

  </CommonPage>

  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->

</template>
<script setup>


import {createComponent} from "@/components/mountComponent/index.js";

window.document.title = '库房';

defineOptions({
  name: 'warehouseGoodsSummary'
})

import * as warehouseReceiptApi from '@/api/warehouseReceipt.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'


import {confirmDialog} from "@/hooks/useOperateDialog.js";


const router = useRouter();
const commonPageRef = ref(null);

const isOperate = ref(false);
const showQueryPopup = ref(false);
const getListAttrs = ref({
  api: warehouseReceiptApi.report,
  params: {
    includeSum: false,
    orders: [
      // {
      //   direction: 'DESC',
      //   property: 'passTime',
      // }
    ]
  },

  getListBefore: (params) => {
    let {items} = params;
    console.log(items)
    let timeItem = items.find(v => v.key === 'time');
    if (timeItem) {
      params.startTime = timeItem.min;
      params.endTime = timeItem.max;
    }
    let name = items.find(v => v.key === 'name');
    if (name) {
      params.goodsName = name.value;
    }
    let code = items.find(v => v.key === 'code');
    if (code) {
      params.code = code.value;
    }
    let barCode = items.find(v => v.key === 'barCode');
    if (barCode) {
      params.barCode = barCode.value;
    }

    let categoryName = items.find(v => v.key === 'categoryName');
    if (categoryName) {
      params.categoryIds = categoryName.value;
    }
    let warehouseName = items.find(v => v.key === 'warehouseName');
    if (warehouseName) {
      // params.warehouseIds = JSON.parse(warehouseName.value);
      params.warehouseIds = [warehouseName.value];
    }
    let supplierName = items.find(v => v.key === 'supplierName');
    if (supplierName) {
      // params.supplierIds = JSON.parse(supplierName.value);
      params.supplierIds = [supplierName.value];
    }
    let brandName = items.find(v => v.key === 'brandName');
    if (brandName) {
      // params.brandIds = JSON.parse(brandName.value);
      params.brandIds = [brandName.value];
    }
    let shelveName = items.find(v => v.key === 'shelveName');
    if (shelveName) {
      params.shelveIds = shelveName.value;
    }

    //
    params.excludeEmpty = items.some(v => v.key === 'excludeEmpty');
    params.shelveSummary = items.some(v => v.key === 'shelveSummary');
    delete params.items

  }

})
const remove = (item) => {
  confirmDialog('删除', {
    getList: commonPageRef.value.refreshList,
    length: 0,
    confirm: () => warehouseReceiptApi.remove({ids: [item.id]})
  });
}


const popoverActions = ref([

]);

const handleDetail = async (row) => {
  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      component: await import('@/views/warehouse/warehouseGoods/components/detail.vue'),
      componentBind: {
        currentRow: row,
      }
    }
  })

};

const toHistory = (row) => {
  router.push({name: 'receiptHistory', params: {goods: row.id, warehouse: row.warehouseId}})
};

const buttons = ref([
  {label: '商品详情', type: 'primary', onClick: handleDetail},
  {label: '单据记录', type: 'primary', onClick: toHistory}
  // {label: '删除', color: 'red', onClick: remove},

])

const queryItems = ref([
  {label: '时间范围', field: 'time', type: 'daterange'},
  {label: '商品名称', field: 'name'},
  {label: '商品编号', field: 'code'},
  {label: '仓库', field: 'warehouseName', type: 'dictSelect', code: 'warehouseDict'},
  {label: '不包含零库存', field: 'excludeEmpty', type: 'slots', initValue: true},
  {label: '按货架汇总', field: 'shelveSummary', type: 'slots'},
])


onMounted(() => {
})


</script>

<style lang="scss" scoped>
.kc_item {
  width: 48%;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 3px 8px;
  border: 1px dashed #8ddefd;
}
</style>


