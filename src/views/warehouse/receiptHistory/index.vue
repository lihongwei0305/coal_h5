<template>
  <CommonPage
      ref="commonPageRef"
      title="单据记录"
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
      <div class="row justify-between font-semibold">
        <div fs-16>{{ item.receiptTypeName }}
          <span fs-14>【{{ item.receipt?.receiptNo }}】</span>
        </div>

      </div>
      <div>{{ item.receipt?.receiptDate }}</div>
      <div class="flex fs-16">
        <div class="w-50%">{{ item.warehouse.name }}</div>
        <div class="w-50%">{{ item.shelve.name }}</div>
      </div>
      <div class="last_row">
        <div class="flex flex-col flex-items-center">
          <div font-semibold>数量</div>
          <div>{{ item.number }}</div>
        </div>
        <div class="flex flex-col flex-items-center">
          <div font-semibold>单价</div>
          <div>{{ item.price }}</div>
        </div>
        <div class="flex flex-col flex-items-center">
          <div font-semibold>金额</div>
          <div>{{ item.amount }}</div>
        </div>
      </div>


    </template>
  </CommonPage>
</template>
<script setup>


import {createComponent} from "@/components/mountComponent/index.js";

window.document.title = '';


import * as Api from '@/api/warehouseReceiptDetail.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {onBeforeRouteLeave, onBeforeRouteUpdate, useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage';


import {confirmDialog} from "@/hooks/useOperateDialog.js";
import {useKeepAlive} from "@/store/keepAlive.js";


const router = useRouter();
const commonPageRef = ref(null);

defineOptions({
  name: 'receiptHistory'
})

const props = defineProps({
  goods: String,
  warehouse: String,

})

const isOperate = ref(false);
const showQueryPopup = ref(false);
const getListAttrs = ref({
  api: Api.list,
  params: {
    orders: [
      {
        "direction": "DESC",
        "property": "receipt.receiptDate"
      }
    ]
  },
  getListBefore: (params) => {

  }
});

const handleDetail = async (item) => {
  await router.push({path: '/warehouse/warehouseReceiptEnter', query: {id: item.receipt.id,noEdit:true}});

};

const remove = (item) => {
  confirmDialog('删除', {
    getList: commonPageRef.value.refreshList,
    length: 0,
    confirm: () => Api.remove({ids: [item.id]})
  });
}


const popoverActions = ref([]);

const buttons = ref([
  {label: '详情', type: 'primary', onClick: handleDetail},
  // {label: '删除', type: 'danger', onClick: remove},

])

const queryItems = ref([
  {label: '商品', field: 'goods', opt: 'eq', isQuery: false, initValue: props.goods},
  {label: '仓库', field: 'warehouse', opt: 'eq', isQuery: false, initValue: props.warehouse},
  {label: '单据类型', field: 'receiptType', type: 'dictSelect', code: 'warehouse.receiptType'},
  {label: '单据编号', field: 'receipt.receiptNo'},
  {label: '制单人', field: 'receipt.creator'},
])


onMounted(() => {
})

const keepAliveStore = useKeepAlive();

onBeforeRouteLeave((to, from, next) => {

  if (to.path === '/warehouse/warehouseGoodsSummary') {
    from.meta.keepAlive = false;
    keepAliveStore.setIncludes('remove', from.name);

  } else {
    from.meta.keepAlive = true;
    keepAliveStore.setIncludes('add', from.name);

  }
  next();

})

onBeforeRouteUpdate((to, from, next) => {
  console.log('onBeforeRouteUpdate')
})

</script>

<style lang="scss" scoped>

.last_row {
  font-size: 16px;
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
