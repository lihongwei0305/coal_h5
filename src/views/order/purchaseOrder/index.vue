<template>
  <CommonPage
      ref="commonPageRef"
      title="采购订单"
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
      <div class="row" style="justify-content: space-between; font-weight: 600">
        <div class="fs-16">{{ item.coalInfo?.supplierName || '' }} - {{
            item.coalInfo?.name || ''
          }}({{ item.coalInfo?.coalTypeName || '' }})
        </div>
        <div class="oval_box" :style="orderStatusStyle(item)">{{ item.orderStatusName }}</div>
      </div>
      <div class="row" style="justify-content: space-between">
        <div class="" style="width: 25%">
          <div class="font-semibold">采购数量</div>
          <div>{{ item.amount }}</div>

        </div>
        <div class="" style="width: 25%">
          <div class="font-semibold">采购单价</div>
          <div>{{ item.price }}</div>
        </div>
        <div class="" style="width: 25%">
          <div class="font-semibold">其他费用</div>
          <div>{{ item.otherFee }}</div>
        </div>
        <div class="" style="width: 25%">
          <div class="font-semibold">采购总价</div>
          <div>{{ item.total }}</div>
        </div>
      </div>
      <div class="row" style="justify-content: space-between">
        <div class="" style="width: 25%;">
          <div class="font-semibold">车数</div>
          <div>{{ item.totalCarCount }}</div>

        </div>
        <div class="" style="width: 25%;">
          <div class="font-semibold">已收货数量</div>
          <div>{{ item.receivedAmount }}</div>
        </div>
        <div class="" style="width: 25%;">
          <div class="font-semibold">未收货数量</div>
          <div>{{ item.leftAmount }}</div>
        </div>
        <div class="" style="width: 25%;">
          <div class="font-semibold">天数</div>
          <div>{{ item.dayAmount }}</div>
        </div>
      </div>


      <div class="row">
        <div class="title">含税：</div>
        <div>{{ item.includeTax ? '是' : '否' }}</div>
        <template v-if="item.includeTax">
          <div style="display: flex;align-items: center" class="ml-20">
            <div class="font-semibold">税率：</div>
            <div>{{ item.taxRate }}%</div>
          </div>
        </template>
      </div>
      <div class="row">
        <div class="title">采购时间：</div>
        <div>{{ item.startTime }}</div>
      </div>
      <div class="row">
        <div class="title">完成时间：</div>
        <div>{{ item.finishTime }}</div>
      </div>

    </template>
  </CommonPage>

  <!--  <van-floating-bubble icon="filter-o" @click="showTop = true"/>-->


</template>
<script setup lang="jsx">


window.document.title = '订单'

defineOptions({
  name: 'purchaseOrder'
})

import * as Api from '@/api/purchaseOrder.js'
import {computed, nextTick, onActivated, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CommonPage from '@/components/CommonPage'



import {confirmDialog} from "@/hooks/useOperateDialog.js";
import Button from "@/components/Button.vue";
import {createComponent} from "@/components/mountComponent/index.js";


const show = ref(false);

const router = useRouter();
const commonPageRef = ref(null);

const isOperate = ref(false);
const showTop = ref(false);
const weightDataRef = ref(null);

const popupKey = ref(Date.now());
const showQueryPopup = ref(false);
const state = reactive({
  current: {},

})

const getListAttrs = ref({
  params: {
    orders: [
      {
        direction: 'DESC',
        property: 'startTime',
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

const relevance = async (row) => {
  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      component: await import('@/views/weight/data/index.vue'),
      componentBind: {
        navbarBind: {
          title: '关联磅房数据',
          isPopover: false,
          leftClick: () => {
            console.log('21321')
          },

        },
        isOperate: true,
        relevanceing: true,
        currentOperate: '关联',
        customConfirm: ({records}) => {
          confirmDialog('关联', {
            length: records.size,
            confirm: () => Api.updateWeightData(
                {
                  id: row.id,
                  optType: '1',
                  weightDataList: [...records.values()],
                }
            ),
            // confirmBefore: operateCancel,
          });
        }
      }
    }
  })

}

const detail = async (row) => {

  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      component: await import('@/views/weight/data/index.vue'),
      componentBind: {
        inOrder: true,
        isPurchaseOrder: true,
        orderId: row.id,
        customNavbar: true,
        showFilterFloat: true,
        navbarRender: () => (
            <>

              <div class="list_wrapper" style="padding-bottom: 10px">
                <div class="list_wrapper_item" style="margin-bottom: 0">
                  <div class="flex justify-between font-semibold">
                    <div class="fs-16">{row.coalInfo?.supplierName || ''} - {
                        row.coalInfo?.name || ''
                    }({row.coalInfo?.coalTypeName || ''})
                    </div>
                    <div class="oval_box"
                         style={orderStatusStyle(row)}>{row.orderStatusName}</div>
                  </div>
                  <div class="flex justify-between">
                    <div class="" style="width: 25%">
                      <div class="font-semibold">采购数量</div>
                      <div>{row.amount}</div>

                    </div>
                    <div class="" style="width: 25%">
                      <div class="font-semibold">采购单价</div>
                      <div>{row.price}</div>
                    </div>
                    <div class="" style="width: 25%">
                      <div class="font-semibold">其他费用</div>
                      <div>{row.otherFee}</div>
                    </div>
                    <div class="" style="width: 25%">
                      <div class="font-semibold">采购总价</div>
                      <div>{row.total}</div>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <div class="" style="width: 25%;">
                      <div class="font-semibold">车数</div>
                      <div>{row.totalCarCount}</div>

                    </div>
                    <div class="" style="width: 25%;">
                      <div class="font-semibold">已收货数量</div>
                      <div>{row.receivedAmount}</div>
                    </div>
                    <div class="" style="width: 25%;">
                      <div class="font-semibold">未收货数量</div>
                      <div>{row.leftAmount}</div>
                    </div>
                    <div class="" style="width: 25%;">
                      <div class="font-semibold">天数</div>
                      <div>{row.dayAmount}</div>
                    </div>
                  </div>


                  <div class="flex">
                    <div class="title">含税：</div>
                    <div>{row.includeTax ? '是' : '否'}</div>
                    <div>
                      {
                        row.includeTax ?
                            <div style="display: flex; align-items: center" className="ml-20">
                              <div className="font-semibold">税率：</div>
                              <div>{row.taxRate}%</div>
                            </div> : ''
                      }
                    </div>
                  </div>
                  <div class="flex">
                    <div class="title">采购时间：</div>
                    <div>{row.startTime}</div>
                  </div>
                  <div class="flex">
                    <div class="title">完成时间：</div>
                    <div>{row.startTime}</div>
                  </div>
                </div>
              </div>

              <div style="background-color: #f3f1f1"
                   class="flex justify-between flex-items-center box-border p-x-10px pt-10 h-30px">
                <div class="font-14 font-semibold">已下为已关联数据：</div>
                <Button label="关联" color="#79bbff" onClick={() => relevance(row)} class="font-12"></Button>
              </div>
            </>
        )
      }
    }
  })

  // state.current = {...row};
  // show.value = true;
};


const popoverActions = ref([
  {
    text: '删除', value: 'remove', api: Api.remove, click: () => {
      isOperate.value = true;
    }
  }
]);


const buttons = ref([
  {label: '详情', color: 'green', onClick: detail},
  {label: '删除', color: 'red', onClick: remove},

])

const orderStatusStyle = (row) => {
  let backgroundColor;
  switch (row.orderStatus) {
    case '0':
      backgroundColor = 'blue';
      break;
    case '1':
      backgroundColor = '#e6a23c';
      break;
    case '2':
      backgroundColor = 'green';
      break;
    case '3':
      backgroundColor = 'red';
      break;
  }

  return {
    backgroundColor,
  }

}

const queryItems = ref([
  {label: '供应商', field: 'supplier', type: 'dictSelect', code: 'supplierDict'},
  {label: '煤源类型', field: 'coalType', type: 'dictSelect', code: 'coal.type'},
  {label: '煤源信息', field: 'product', type: 'dictSelect', code: 'coalInfoDict'},
  {label: '订单状态', field: 'orderStatus', type: 'dictSelect', code: 'purchaseOrder.status'},
  {label: '采购时间', field: 'startTime', type: 'daterange'},
  {label: '归档', field: 'archiveStatus', type: 'dictSelect', code: 'archiveStatus'},
])


onMounted(() => {
})
const handlePopupOpened = () => {
  console.log('handlePopupOpened')
  // weightDataRef.value.queryFormRef.queryForm = {};
  // popupKey.value = Date.now();
}
const handlePopupClose = () => {
  state.current = {};
}
</script>

<style lang="scss" scoped>

.row {
  display: flex;
}

.title {
  font-weight: 600;
}
</style>

<style lang="scss">

</style>
