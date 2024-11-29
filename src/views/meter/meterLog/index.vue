<template>
  <CommonPage
      ref="commonPageRef"
      title="抄表记录"
      :Api="Api"
      :buttons="buttons"
      :popover-actions="popoverActions"
      :get-list-attrs="getListAttrs"
      v-model:is-operate="isOperate"
      v-model:show-query-popup="showQueryPopup"
      :show-archive="false"
      :query-items="queryItems"
      v-bind="$attrs"
  >
    <template #content="{item}">
      <div class="row">
        <div class="title">水电表：</div>
        <div>{{ item.meter?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">抄表时间：</div>
        <div>{{ item.time || '' }}</div>
      </div>
      <div class="row">
        <div class="title">抄表值：</div>
        <div>{{ item.value || 0 }}</div>
      </div>
      <div class="row">
        <div class="title">上次抄表值：</div>
        <div>{{ item.previousValue || 0 }}</div>
      </div>
      <div class="row">
        <div class="title">使用量：</div>
        <div> {{ item.usage || 0 }}</div>
      </div>
      <div class="row">
        <div class="title">数据来源：</div>
        <div>{{ item.sourceName || '' }}</div>
      </div>


    </template>
  </CommonPage>

  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->
  <van-floating-bubble v-if="!isOperate" icon="plus" @click="$router.push('/accessgate/appointment/operate')"/>
</template>
<script setup>


import {formatDate} from "@/utils/date.js";

window.document.title = '水电表'

defineOptions({
  name: 'meterLog'
})

import * as Api from '@/api/meterLog'
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
      {
        direction: 'DESC',
        property: 'createTime',
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

const queryItems = ref([
  {label: '水电表', field: 'meter', type: 'dictSelect', code: 'meterDict'},
  {label: '抄表时间', field: 'time', type: 'daterange'},
  {label: '数据来源', field: 'source', type: 'dictSelect', code: 'meter.log.source'},
  {label: '归档状态', field: 'archiveStatus', type: 'dictSelect', code: 'archiveStatus'},
])

onMounted(() => {
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
