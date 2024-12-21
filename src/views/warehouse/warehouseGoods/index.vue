<template>
  <CommonPage
      ref="commonPageRef"
      title="商品管理"

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
        <div class="font-semibold">{{ item.name || '' }}</div>
        <div class="fs-14">{{ item.code || '' }}</div>
      </div>
      <div class="row" v-if="item.spec">
        <span fs-14 class="spec">{{ item.spec }}</span>
      </div>
      <div class="row" v-if="item.model">
        <span fs-14 class="model">{{ item.model }}</span>
      </div>
      <div class="row">
        <span v-if="item.category?.name" fs-14>{{ item.category?.name }}</span>
        <span v-else class="fs-14 color-[#fff]" style="color: #d6d6d6">分类</span>
      </div>
      <div class="row fs-14">
        <div class="">当前库存：</div>
        <div :style="{color: item.stock == 0? 'red' : ''}">{{ item.stock }}</div>
      </div>

      <div class="row fs-14">
        <div class="">进货价：</div>
        <div>{{ item.price1 }}</div>
      </div>
      <div class="row fs-14">
        <div class="">市场价：</div>
        <div>{{ item.price2 }}</div>
      </div>

    </template>
  </CommonPage>

  <van-floating-bubble v-if="!isOperate" icon="plus" @click="$router.push('/warehouse/warehouseGoods/operate')"/>

</template>
<script setup>


import {createComponent} from "@/components/mountComponent/index.js";

window.document.title = '库房';


defineOptions({
  name: 'warehouseGoods',
})

import * as Api from '@/api/warehouseGoods.js'
import * as warehouseReceiptApi from '@/api/warehouseReceipt.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage';


import {confirmDialog} from "@/hooks/useOperateDialog.js";

const props = defineProps({
  getListBefore: Function,
  isGetStock: Boolean,
  getStockBefore: Function,
  isDisabled: Boolean,
})

const router = useRouter();
const commonPageRef = ref(null);

const isOperate = ref(false);
const showQueryPopup = ref(false);
const getListAttrs = ref({
  api: Api.list,
  params: {
    orders: [
      {
        "direction": "DESC",
        "property": "createTime"
      }
    ]
  },

  getListBefore: props?.getListBefore,
  getListAfter:async (data) => {
    if (props.isGetStock) {
      if (data.length) {
        await getStock(data.map(item => item.id), data);
      }
    }


  }



});

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
const getStock = async (goodsIds,data) => {
  let params = {
    goodsIds,
    "excludeEmpty": true,
    "shelveSummary": false,
  }
  let other = props.getStockBefore?.(params) || {};
  let {data:res} = await warehouseReceiptApi.report({
    ...params,
    ...other,
  });
  data.forEach(v => {
    res.forEach(item => {
      if (v.id === item.id) {
        v.stock = item.currNumber;
        if (props.isDisabled) {
          v.disabled = item.currNumber == 0;
        }
      }
    });
  });
};
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
  {label: '详情', type: 'primary', operate: true, onClick: handleDetail},
  {label: '删除', type: 'danger', onClick: remove},

])

const queryItems = ref([
  {label: '名称', field: 'name'},
])


onMounted(() => {
})


</script>

<style lang="scss" scoped>
.spec {
  &::after {
    position: relative;
    top: -4px;
    left: 5px;
    content: '规格';
    font-size: 8px;
    text-align: start;
    border: 1px solid #10cd86;
    color: #10cd86;
    padding: 1px;
    border-radius: 4px;
    box-sizing: border-box;
  }
}

.model {
  &::after {
    position: relative;
    top: -4px;
    left: 5px;
    content: '型号';
    font-size: 8px;
    text-align: start;
    border: 1px solid #0de0e4;
    color: #0de0e4;
    padding: 1px;
    border-radius: 4px;
    box-sizing: border-box;
  }
}


</style>

<style lang="scss">

</style>
