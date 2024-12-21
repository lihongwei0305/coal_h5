<template>
  <CommonPage
      ref="commonPageRef"
      title="单据查询"
      :buttons="buttons"
      :popover-actions="popoverActions"
      v-model:is-operate="isOperate"
      v-model:show-query-popup="showQueryPopup"
      :get-list-attrs="getListAttrs"
      :query-items="queryItems"
      :show-archive="true"
      v-bind="$attrs"
  >
    <template #content="{item}">
      <div class="flex flex-items-end">
        <div font-semibold fs-16>{{ item.receiptTypeName || '' }}</div>
        <span fs-14> 【{{ item.receiptNo }}】</span>
      </div>

      <div class="flex flex-items-end mt-5px">
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
import {showToast} from "vant";


const router = useRouter();
const commonPageRef = ref(null);

const isOperate = ref(false);
const showQueryPopup = ref(false);
const getListAttrs = ref({
  api: Api.list,
  params: {
    orders: [
      {
        direction: 'DESC',
        property: 'receiptDate',
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
const archive = (item) => {
  if (item.archiveStatus === '1') {
    return showToast('该数据已归档');
  }
  confirmDialog('归档', {
    getList: commonPageRef.value.refreshList,
    length: 0,
    confirm: () => Api.archive({ids: [item.id]})
  });
}
const unarchive = (item) => {
  confirmDialog('取消归档', {
    getList: commonPageRef.value.refreshList,
    length: 0,
    confirm: () => Api.unarchive({ids: [item.id]})
  });
}


const popoverActions = ref([
  {
    text: '删除', value: 'remove', api: Api.remove, click: () => {
      isOperate.value = true;
    }
  },
  {
    text: '归档', value: 'archive', api: Api.archive, click: () => {
      isOperate.value = true;
    }
  },
  {
    text: '取消归档', value: 'unarchive', api: Api.unarchive, click: () => {
      isOperate.value = true;
    }
  }
]);

const openReceiptEnter = async (item) => {
  await router.push({path: '/warehouse/warehouseReceiptEnter', query: {id: item.id}});
}


const buttons = ref([
  {label: '详情', type: 'primary', onClick: openReceiptEnter},
  {label: '删除', type: 'danger', onClick: remove},
  {label: '归档', type: 'archive', onClick: archive},
  {label: '取消归档', type: 'unarchive', onClick: unarchive},

])

const queryItems = ref([
  {label: '商品名称', field: 'detail.goods.id', type: "dictSelect", code: 'warehouseGoodsDict'},
  {label: '商品编号', field: 'detail.goods.code'},
  {label: '单据类型', field: 'receiptType', type: 'dictSelect', code: 'warehouse.receiptType'},
  {label: '归档状态', field: 'archiveStatus', type: 'dictSelect', code: 'archiveStatus'},
])


onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
