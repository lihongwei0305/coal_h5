<template>
  <CommonPage
      ref="commonPageRef"
      title="化验数据"
      :Api="Api"
      :buttons="buttons"
      :popover-actions="popoverActions"
      :getListAttrs="getListAttrs"
      v-model:is-operate="isOperate"
      v-model:show-query-popup="showQueryPopup"
      :query-items="queryItems"
      v-bind="$attrs"
  >
    <template #content="{item}">


      <div class="row" v-for="[name,values] in tableColumn">
        <div style="font-weight: 600; white-space: nowrap">{{ name }}：</div>
        <div style="display: flex;">
          <template v-if="values.length === 1">
            <div class="whitespace-nowrap">{{ item[values[0].code] }}</div>
          </template>
          <template v-else>
            <div v-for="val in values" class="flex flex-items-end ml-15">
              <div class="whitespace-nowrap font-medium">{{ val.name }}：</div>
              <div class="whitespace-nowrap">{{ item[val.code] }}</div>
            </div>
          </template>
        </div>
      </div>


      <div class="row  flex-items-end">
        <div style="font-weight: 600">化验员：</div>
        <div>{{ item.createUserName }}</div>
      </div>

      <div class="row flex-items-end">
        <div style="font-weight: 600">化验时间：</div>
        <div>{{ item.createTime }}</div>
      </div>

    </template>
  </CommonPage>
  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->
</template>
<script setup>


window.document.title = '化验'

defineOptions({
  name: 'coalanalysis'
})

import * as Api from '@/api/coalAnalysis'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'


import {confirmDialog} from "@/hooks/useOperateDialog.js";
import * as coalParameterDefApi from "@/api/coalParameterDef.js";
import {groupBy} from "lodash-es";

const router = useRouter();
const commonPageRef = ref(null);
const isOperate = ref(false);
const showQueryPopup = ref(false);
const getListAttrs = ref({
  params: {
    orders: [
      {
        "direction": "DESC",
        "property": "createTime"
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


const tableColumn = ref([]);

const getTableColumn = async () => {
  let {data: res} = await coalParameterDefApi.list({
    orders: [
      {
        direction: 'ASC',
        property: 'sortKey'
      }
    ]
  })
  res.forEach(v => {
    v.label = v.name
    v.prop = v.code
  })


  tableColumn.value = Object.entries(groupBy(res, (item) => {
    return item.parentName || item.name
  }))
      .sort(x => x[1].map(y => y.sortKey).sort()[0])
      .map(x => [x[0], x[1].sort((a, b) => a.sortKey - b.sortKey)]);


}


const queryItems = ref([
  {
    label: '煤源', field: 'coalInfo', type: 'dictSelect', code: 'coalInfoDict', formatter: (data) => {
      data.key = 'coalInfo.id'
    }
  },
  {
    label: '煤源类型', field: 'coalType', type: 'dictSelect', code: 'coal.type', formatter: (data) => {
      data.key = 'coalInfo.coalType'
    }

  },
  {
    label: '化验员', field: 'createUserId', type: 'dictSelect', code: 'userDict'
  },
  {label: '化验时间', field: 'createTime', type: 'date'},
  {label: '归档状态', field: 'archiveStatus', type: 'dictSelect', code: 'archiveStatus'},
]);

onMounted(() => {
  getTableColumn();
})


</script>

<style lang="scss" scoped>


</style>

<style lang="scss">

</style>
