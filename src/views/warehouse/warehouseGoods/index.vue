<template>
  <CommonPage
      ref="commonPageRef"
      title="商品管理"
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
      <div class="row">
        <div>{{ item.code }}</div>
      </div>
      <div class="row">
        <div>{{ item.category?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">进货价：</div>
        <div>{{ item.price1 }}</div>
      </div>
      <div class="row">
        <div class="title">市场价：</div>
        <div>{{ item.price2 }}</div>
      </div>

    </template>
  </CommonPage>

    <van-floating-bubble icon="plus" @click="$router.push('/warehouse/warehouseGoods/operate')"/>

</template>
<script setup>


import {createComponent} from "@/components/mountComponent/index.js";

window.document.title = '库房';


defineOptions({
  name: 'warehouseGoods',
})

import * as Api from '@/api/warehouseGoods.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage';


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
  {label: '详情', type: 'primary',  onClick: handleDetail},
  {label: '删除', type:'danger', onClick: remove},

])

const queryItems = ref([
  {label: '名称', field: 'name'},
])


onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
