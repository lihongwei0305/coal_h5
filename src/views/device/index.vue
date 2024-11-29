<template>
  <CommonPage
      ref="commonPageRef"
      title="设备管理"
      :Api="Api"
      :buttons="buttons"
      :popover-actions="popoverActions"
      :queryFormRef="queryFormRef"
      v-model:is-operate="isOperate"
      v-model:show-query-popup="showQueryPopup"
      :query-items="queryItems"
      v-bind="$attrs"
  >
    <template #content="{item}">

      <div class="row">
        <div>编码：</div>
        <div>{{ item.code }}</div>
      </div>
      <div class="row">
        <div>分类：</div>
        <div v-if="item.category">{{ item.category.name }}</div>
      </div>
      <div class="row">
        <div style="white-space: nowrap">厂家：</div>
        <div v-if="item.supplier" style="">{{ item.supplier.name }}</div>
      </div>
      <div class="row">
        <div>型号：</div>
        <div>{{ item.model }}</div>
      </div>
      <div class="row">
        <div>参数：</div>
        <div>{{ item.parameter }}</div>
      </div>
      <div class="row">
        <div>位置：</div>
        <div>{{ item.location }}</div>
      </div>

    </template>
  </CommonPage>
  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->
  <van-floating-bubble v-if="!isOperate" icon="plus" @click="$router.push('/device/operate')"/>
</template>
<script setup>


window.document.title = '设备'

defineOptions({
  name: 'device'
})

import * as Api from '@/api/device.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'



import {confirmDialog} from "@/hooks/useOperateDialog.js";


const router = useRouter();
const commonPageRef = ref(null);
const queryFormRef = ref(null)
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
  {label: '设备名称', field: 'name'},
  {label: '设备分类', field: 'category', type: 'dictSelect', code: 'deviceCategoryTree'},
  {label: '设备型号', field: 'model'},
  {label: '设备厂家', field: 'supplier', type: 'dictSelect', code: 'deviceSupplierDict'},
  {label: '设备位置', field: 'location'},
  {label: '归档', field: 'archiveStatus', type: 'dictSelect', code: 'archiveStatus'},
])

onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
