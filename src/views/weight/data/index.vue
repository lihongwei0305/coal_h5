<template>
  <CommonPage
      ref="commonPageRef"
      title="磅房数据"

      :buttons="buttons"
      :popover-actions="popoverActions"
      :getListAttrs="getListAttrs"
      :queryFormRef="queryFormRef"
      v-model:is-operate="isOperate"
      v-model:showQueryPopup="showQueryPopup"
      :query-items="queryItems"
      @operateCancel="operateCancel"
      v-bind="$attrs"
  >
    <template #content="{item}">


      <template v-for="col in column">
        <div class="row">
          <div class="title">{{ col.displayName || col.name }}：</div>
          <div>{{ item[col.code] }}</div>
        </div>
      </template>
      <div class="row">
        <div class="title">关联状态：</div>
        <div :style="{color: item.isRelevanced? 'green' : 'red'}" class="cursor-pointer">
          {{ getRelevanceType(item) }}
        </div>

      </div>


    </template>

    <template v-if="customNavbar" #navbar>
      <!--      <slot name="navbar"></slot>-->
      <component :is="navbarRender"></component>
    </template>

  </CommonPage>
  <!--  <Query ref="queryFormRef" v-model:show="showTop" :items="queryItems" @queryConfirm="queryConfirm"></Query>-->
  <template v-if="_showFilterFloat">
    <van-floating-bubble icon="filter-o" @click="showTop = true" :teleport="popupClass"/>
  </template>
  <van-dialog v-model:show="showDialog" title="详情" teleport="body">
    <div style="border-top: 1px solid #efefef; border-bottom: 1px solid #efefef" h-400px overflow-auto p-x-10px p-y-5px>
      <template v-for="col in allHeaderList">
        <div flex flex-items-end>
          <div font-medium>{{ col.displayName || col.name }}：</div>
          <div>{{ current[col.code] }}</div>
        </div>
      </template>

    </div>
  </van-dialog>

</template>
<script setup>


import {formatDate} from "@/utils/date.js";

window.document.title = '磅房'

defineOptions({
  name: 'weightData'
})

import * as Api from '@/api/weightDeviceData'
import * as weightColumnConfigApi from '@/api/weightColumnConfig'
import {computed, nextTick, onActivated, onMounted, reactive, ref, watch, useSlots, useAttrs} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'

import Query from "@/components/QueryForm/query.vue";

import {confirmDialog} from "@/hooks/useOperateDialog.js";
import {groupBy, isObject} from "lodash-es";
import dayjs from "dayjs";


const props = defineProps({
  inOrder: Boolean,
  isPurchaseOrder: Boolean,
  orderId: String,
  customNavbar: Boolean,
  navbarRender: Function,
  popupClose: Function,
  popupClass: String,
  relevanceing: Boolean,
  showFilterFloat: Boolean

})

const $slots = useSlots();
const router = useRouter();
const commonPageRef = ref(null);
const queryFormRef = ref(null)
const isOperate = ref(false);
const showTop = ref(false);
const showDialog = ref(false);
const current = ref({});
const _showFilterFloat = ref(false);
const showQueryPopup = ref(false);
const getListAttrs = ref({
  api: Api.list,
  params: {
    orders: [
      {
        direction: 'DESC',
        property: 'ycgbTIme'
      },
    ]
  },
  getListBefore: (params) => {
    let {items} = params;

    if (props.isPurchaseOrder) {
      if (!items.some(v => v.key === 'purchaseOrder.id')) {
        items.push({
          key: 'purchaseOrder.id',
          opt: 'eq',
          value: props.orderId,
        });
      }

    }

    if (props.relevanceing) {
      if (!items.some(v => v.key === 'purchaseOrder')) {
        items.push({
          key: 'purchaseOrder',
          opt: 'null',
        });
      }
      if (!items.some(v => v.key === 'saleOrder')) {
        items.push({
          key: 'saleOrder',
          opt: 'null',
        });
      }

    }

    // if (props.isSaleOrder) {
    //   if (!items.some(v => v.key === 'saleOrder.id')) {
    //     items.push({
    //       key: 'saleOrder.id',
    //       opt: 'eq',
    //       value: props.operateId,
    //     });
    //   }
    // }
  },
  getListAfter: ({data}) => {
    data.forEach((item) => {
      item.isRelevanced = isObject(item.purchaseOrder) || isObject(item.saleOrder);
      item.relevanceType = getRelevanceType(item)
    })

  }
})
const remove = (item) => {
  confirmDialog('删除', {
    getList: commonPageRef.value.refreshList,
    length: 0,
    confirm: () => Api.remove({ids: [item.id]})
  });
}

const detail = (row) => {
  current.value = row;
  showDialog.value = true;
}

watch(() => showDialog.value, () => {
  if (!showDialog.value) {
    current.value = {};
  }
})


const popoverActions = ref([
  {
    text: '删除', value: 'remove', api: Api.remove, click: () => {
      isOperate.value = true;
    }
  },

]);

const buttons = ref([
  {label: '详情', color: 'red', onClick: detail},
  {label: '删除', color: 'red', onClick: remove},

])

const queryConfirm = () => {
  showTop.value = false;
  commonPageRef.value.refreshList();
}

const column = ref([]);
const allHeaderList = ref([]);
const getHeaderList = async () => {
  let {data: res} = await weightColumnConfigApi.list({
    orders: [
      {
        direction: 'DESC',
        property: 'status'
      },
      {
        direction: 'ASC',
        property: 'sortKey'
      }
    ]
  });
  column.value = res.filter(v => ['flowNumber', 'plateNo', 'weighType', 'sendOrganization', 'receiveOrganization', 'ycgbTIme', 'ecgbTime'].includes(v.code));
  allHeaderList.value = res.filter(v => v.status === '1');


}

const getRelevanceType = (row) => {
  if (isObject(row.purchaseOrder) || isObject(row.saleOrder)) {
    row.isPurchaseOrder = isObject(row.purchaseOrder);
    row.isSaleOrder = isObject(row.saleOrder);
    return '已关联'
  }
  return '未关联';
}


const operateCancel = () => {
  props.popupClose();
}

onMounted(() => {
  getHeaderList();

  if (props.inOrder) {

  } else if (props.relevanceing) {
    queryItems.value.forEach(v => {
      if (v.field === 'weighType') {
        v.initValue = {
          id: "PO",
          name: "PO",
        }
      }
      if (v.field === 'ycgbTIme') {
        v.initValue = [
          formatDate(dayjs(), 'YYYY-MM-DD'),
          formatDate(dayjs(), `YYYY-MM-${dayjs(formatDate(dayjs(), 'YYYY-MM')).daysInMonth()}`)
        ];
      }
      if (v.field === 'archiveStatus') {
        v.initValue = {
          id: '1',
          name: '已归档'
        }

      }
    })
  } else {
    let ycgbTIme = queryItems.value.find(v => v.field === 'ycgbTIme');
    ycgbTIme.initValue = [
      formatDate(dayjs(), 'YYYY-MM-DD'),
      formatDate(dayjs(), `YYYY-MM-${dayjs(formatDate(dayjs(), 'YYYY-MM')).daysInMonth()}`)
    ];

  }


  nextTick(() => {
    if (props.showFilterFloat) {
      _showFilterFloat.value = props.showFilterFloat;
    }
  })

});

const queryItems = ref([
  {label: '流水号', field: 'flowNumber'},
  {label: '车号', field: 'plateNo'},
  {
    label: '过磅类型', field: 'weighType', type: 'dictSelect', treeData: [
      {id: 'PO', name: 'PO'},
      {id: 'SO', name: 'SO'}
    ]
  },

  {label: '发货单位', field: 'sendOrganization'},
  {label: '收货单位', field: 'receiveOrganization'},
  {label: '货名', field: 'goods'},
  {label: '一次过磅时间', field: 'ycgbTIme', type: 'daterange', isEnd: true},
  {label: '二次过磅时间', field: 'ecgbTime', type: 'daterange', isEnd: true,},
  {label: '归档状态', field: 'archiveStatus', type: 'dictSelect', code: 'archiveStatus'},
])


defineExpose({
  queryFormRef,
  popupRef: props.popupRef,
})
</script>

<style lang="scss" scoped>


</style>

<style lang="scss">
.van-dialog__header {
  padding-top: 10px !important;
  padding-bottom: 5px !important;
}
</style>
