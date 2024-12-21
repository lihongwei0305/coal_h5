<template>
  <div class="container">
    <Navbar :is-popover="false" :show-filter="false" title="单据录入"></Navbar>


    <div mt-15 mb-10>
      <van-form ref="formRef" :readonly="!isEdit">
        <van-cell-group inset>
          <van-field
              label="单据类型"
              v-model="state.form.receiptTypeName"
              readonly
              required
              is-link
              @click="openReceiptDialog"
          ></van-field>
          <van-field
              label="单据日期"
              v-model="state.form.receiptDate"
              readonly
              required
              is-link
              @click="handleOpenDate"
          ></van-field>
          <van-field label="单据编号" required v-model="state.form.receiptNo"
                     :rules="[{ required: true, message: '请输入单据编号' }]">
            <template #button>
              <van-button v-if="isEdit" size="small" type="primary" @click="getOrderNo" :loading="state.loading.genBtn">
                生成
              </van-button>
            </template>
          </van-field>
          <van-field label="单据事由"></van-field>
          <van-field label="制单人" required v-model="state.form.creator"
                     :rules="[{ required: true, message: '请输入制单人' }]"></van-field>
          <van-field label="备注" v-model="state.form.remarks" type="textarea" autosize></van-field>
          <van-field name="uploader" label="图片">
            <template #input>
              <van-uploader :readonly="!isEdit" :deletable="isEdit" v-model="fileList" :after-read="afterRead"
                            multiple/>
            </template>
          </van-field>
        </van-cell-group>

      </van-form>
    </div>


    <template v-for="(item,index) in state.form.detail">
      <div class="item_wrapper" @click="handleOpenDetail(item,index)">
        <div class="row">
          <div class="w-40%">商品名称</div>
          <div class="fs-14">{{ item.goodsName }}</div>
        </div>
        <div class="row">
          <div class="w-40%">规格</div>
          <div class="fs-14">{{ item.spec }}</div>
        </div>
        <div class="row">
          <div class="w-40%">型号</div>
          <div class="fs-14">{{ item.model }}</div>
        </div>
        <div class="row" v-if="state.form.receiptType === '0'">
          <div class="w-40%">供应商</div>
          <div class="fs-14">{{ item.supplierName }}</div>
        </div>
        <div class="row">
          <div class="w-40%">仓库</div>
          <div class="fs-14" v-if="item.warehouseName">{{ item.warehouseName }}</div>
          <template v-else>
            <div v-if="item.no_warehouse" class="fs-14 color-red-6">请选择仓库</div>
          </template>
        </div>
        <div class="row">
          <div class="w-40%">货架</div>
          <div class="fs-14" v-if="item.shelveName">
            <span>{{ item.shelveName }}</span>
            <span v-if="item.haveWarehouseAndshelve" class="fs-12 color-red-6">（存在同一仓库同一货架的商品）</span>
          </div>
          <template v-else>
            <div v-if="item.no_shelve" class="fs-14 color-red-6">请选择货架</div>
          </template>
        </div>

        <div grid grid-cols-3 mt-5 pb-3 style="border-bottom: 1px solid #efefef">
          <div flex flex-items-center flex-col>
            <span class="font-semibold">数量</span>
            <span fs-14>{{ item.number || 0 }}</span>
          </div>
          <div flex flex-items-center flex-col>
            <span class="font-semibold">单价</span>
            <span fs-14>{{ item.price || 0 }}</span>
          </div>
          <div flex flex-items-center flex-col>
            <span class="font-semibold">金额</span>
            <span fs-14>{{ item.amount || 0 }}</span>
          </div>
        </div>

        <div class="flex justify-end mt-5">
          <van-button v-if="isEdit" size="small" icon="minus" type="danger" @click.stop="handleDelete(item,index)"/>
        </div>

      </div>
    </template>


    <div class="flex  justify-center">
      <van-button v-if="isEdit" type="primary" size="small" @click="openGoods">
        添加{{ RECEIPT_MAP[state.form.receiptType] }}商品
      </van-button>
    </div>

    <div v-if="!noEdit && state.form.archiveStatus == 0"
         class="fixed bottom-10px w-full box-border px-15px van-safe-area-bottom">
      <van-button v-if="!isEdit" type="primary" size="small" round block @click="handleEditMode">进入编辑</van-button>
      <van-button v-else type="primary" size="small" round block @click="handleSave">保存</van-button>
    </div>

    <van-dialog v-model:show="show" title="选择单据类型" @confirm="handleConfirm_dialog" show-cancel-button>
      <van-radio-group v-model="checked">
        <van-cell-group inset>
          <van-cell title="入库单" clickable @click="checked = '0'">
            <template #right-icon>
              <van-radio name="0"/>
            </template>
          </van-cell>
          <van-cell title="出库单" clickable @click="checked = '1'">
            <template #right-icon>
              <van-radio name="1"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div fs-12 color-red-6 p-x-30px mb-10>
        <span>注：切换单据时将会清空数据</span>
      </div>
    </van-dialog>

  </div>



</template>

<script setup>


import emitter from "@/utils/mitt.js";

defineOptions({
  name: 'warehouseReceiptEnter',
})

import * as Api from '@/api/warehouseReceipt.js'
import {computed, nextTick, onMounted, reactive, ref} from "vue";
import Navbar from "@/components/NavBar/navbar.vue";
import {createComponent} from "@/components/mountComponent/index.js";
import {formatDate} from "@/utils/date.js";
import dayjs from "dayjs";
import {showConfirmDialog, showToast} from "vant";
import * as orderNoRuleApi from "@/api/orderNoRule.js";
import {useUserStore} from '@/store/user.js';
import {RECEIPT_MAP} from "@/views/warehouse/warehouseReceiptEnter/config.js";
import {groupBy} from "lodash-es";
import {useUpload} from "@/hooks/useUpload.js";

import {onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router'
import {useKeepAlive} from "@/store/keepAlive.js";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const {fileList, afterRead, getFileList} = useUpload();
const formRef = ref(null);
const show = ref(false);

const checked = ref('0');
const receiptTypeMap = {
  0: '入库单',
  1: '出库单',
}

const state = reactive({

  form: {
    receiptDate: formatDate(dayjs(), 'time'),
    detail: [],
    creator: userStore.userInfo.name,
    receiptType: "0",
    receiptTypeName: receiptTypeMap[0],
    archiveStatus: '0',
  },

  loading: {
    genBtn: false
  },
  goodsMap: {},


});

const noEdit = computed(() => {
  let {noEdit = false} = route.query;
  return noEdit;
});


const handleConfirm_dialog = (e) => {
  if (state.form.receiptType == checked.value) return;
  reset();
};


const reset = () => {
  state.form = {
    receiptDate: formatDate(dayjs(), 'time'),
    detail: [],
    receiptType: checked.value,
    receiptTypeName: receiptTypeMap[checked.value],
    creator: userStore.userInfo.name,
  };

}

const handleOpenDetail = async (item, index) => {
  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      component: await import('@/views/warehouse/warehouseReceiptEnter/components/detailOperate.vue'),
      componentBind: {
        receiptType: state.form.receiptType,
        current: item,
        time: state.form?.receiptDate || '',
        currGoods: state.goodsMap[item.goods],
        isEdit: isEdit.value,
        onConfirm: (data) => {
          state.form.detail[index] = data;
          checkEqualShelve(data)
        },
      }
    }
  })

};
const handleDelete = (item, index) => {
  showConfirmDialog({
    title: '提示',
    message:
        '确认删除吗？',
  })
      .then(() => {
        state.form.detail.splice(index, 1);
      })
      .catch(() => {
        // on cancel
      });

};
const openGoods = async () => {
  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      component: await import('@/views/warehouse/warehouseGoods/index.vue'),
      componentBind: {
        navbarBind: {
          title: `选择${RECEIPT_MAP[checked.value]}商品`,
          isPopover: false,
          showLeftIcon: false,
        },
        isOperate: true,
        currentOperate: '选择商品',
        selectMode: 'radio',
        isGetStock: true,
        isDisabled: !['0'].includes(state.form.receiptType),
        getListBefore: async (params) => {

          if (state.form.receiptType != 0) {
            let goodsIds = await getHaveStock();
            params.items.push({
              key: 'id', 'opt': 'in', value: goodsIds
            })
          }
        },
        customConfirm: async ({records, close}) => {
          let record = records[0];
          let p = {
            goods: record.id,
            goodsName: record.name,
            spec: record.spec,
            model: record.model,
          }
          state.form.detail.push(p);
          close();
          await getAllAmount([record.id]);
          await nextTick(() => {
            let containerElHeight = document.querySelector('.container')?.getBoundingClientRect()?.height || 0;
            window.scrollTo(0, containerElHeight)
          })

        }
      }
    }
  })

};

const handleOpenDate = async () => {
  if (!isEdit.value) return;
  await createComponent({
    component: await import('@/components/dateTimePopup/index.vue'),
    params: {
      show: true,
      title: '单据日期',
      time: state.form?.receiptDate || '',
      popupConfirm: (t) => {
        state.form.receiptDate = t;
      }
    }
  });
};

const getAllAmount = async (goodsIds) => {
  // let goodsIds = detail.map(v => v.goods).filter(Boolean);
  let {data} = await Api.report({
    includeSum: false,
    shelveSummary: true,
    endTime: formatDate(dayjs(state.form.receiptDate).subtract(1, 'second'), 'time'),
    goodsIds,

  });
  data = data.filter(v => v.currNumber);

  let t = groupBy(data, (item) => {
    return item.id
  });
  Object.entries(t).forEach(([k, v]) => {
    state.goodsMap[k] = v;
  });


  // detail.forEach(v => {
  //   if (v.goods) {
  //     let haveGoods = data.some(y => y.id === v.goods);
  //     if (haveGoods) {
  //       let haveStock = data.some(y => y.id === v.goods && y.warehouseId === v.warehouse && y.shelveId === v.shelve);
  //       if (haveStock) {
  //         let cur = data.find(y => y.id === v.goods && y.warehouseId === v.warehouse && y.shelveId === v.shelve);
  //         v.stock = cur.currNumber;
  //       }
  //       v.noStock = false;
  //     } else {
  //       clearStock(v)
  //     }
  //   }
  // })
};


const getHaveStock = async () => {
  let params = {
    "excludeEmpty": true,
    "shelveSummary": false,
    includeSum: false
  }
  let {data} = await Api.report({
    ...params,
  });
  return [...new Set(data.map(v => v.id))];
};
const openReceiptDialog = () => {
  if (!isEdit.value) return;
  show.value = true;

}

const getOrderNo = async () => {
  let code;

  if (state.form.receiptType === '0') {
    code = 'KF_RKD';
  } else if (state.form.receiptType === '1') {
    code = 'KF_CKD';
  } else if (state.form.receiptType === '2') {
    code = 'KF_PDD';
  }

  state.loading.genBtn = true;
  let {data} = await orderNoRuleApi.genOrderNo({
    ruleCode: code,
    time: state.form.receiptDate
  }).finally(() => state.loading.genBtn = false);
  state.form['receiptNo'] = data;
};


const checkEqualShelve = (row) => {
  if (!row.goods || !row.warehouse || !row.shelve) return;
  let visibleData = state.form.detail;
  let eq = visibleData.filter(v => v.goods === row.goods && v.warehouse === row.warehouse && v.shelve === row.shelve);
  row.haveWarehouseAndshelve = eq.length >= 2
}

const checkAllDetail = () => {
  let errMsg;
  state.form.detail.forEach((v, i) => {
    if (!v.warehouse) {
      v.no_warehouse = true;
      errMsg = `第${i + 1}行【${v.goodsName}】的仓库为空`
      showToast(errMsg);
      throw errMsg
    }
    if (!v.shelve) {
      v.no_shelve = true;
      errMsg = `第${i + 1}行【${v.goodsName}】的货架为空`
      showToast(errMsg);
      throw errMsg
    }

    if (v.haveWarehouseAndshelve) {
      errMsg = `第${i + 1}行【${v.goodsName}】存在同一仓库同一货架的商品`
      showToast(errMsg);
      throw errMsg;
    }
  })
}


const handleSave = async () => {
  await formRef.value.validate();
  checkAllDetail();
  await Api.create(state.form)

};


const isEdit = ref(true);
const getById = async () => {
  isEdit.value = true;
  let {id = ''} = route.query || {};
  if (!id) return;
  isEdit.value = false;
  let {data} = await Api.getById({id});

  state.form = data;
  state.form.detail = data.detail.map(v => {
    return {
      ...v,
      goods: v.goods?.id || '',
      goodsName: v.goods?.name || '',
      spec: v.goods?.spec || '',
      model: v.goods?.model || '',
      unit: v.goods?.unit?.name || '',
      warehouse: v.warehouse?.id || '',
      warehouseName: v.warehouse?.name || '',
      shelve: v.shelve?.id || '',
      shelveName: v.shelve?.name || '',
      supplier: v.supplier?.id || '',
      supplierName: v.supplier?.name || '',
    }
  });
  if (Array.isArray(data.fileIds) && data.fileIds.length) {
    fileList.value = await getFileList(data.fileIds);
  }

};

const handleEditMode = () => {
  isEdit.value = true;
}

onMounted(() => {
  nextTick(() => {
    getById();
  });

  emitter.on('scan',(data)=>{
    console.log('data',data)
  })


});


onBeforeRouteLeave((to, from, next) => {
  if (to.path === '/qrcode') {
    from.meta.keepAlive = true;
  } else {
    // from.meta.key = Date.now();
    from.meta.keepAlive = false;
  }
  // console.log(from)
  next();
})

onBeforeRouteUpdate(() => {
  console.log('onBeforeRouteUpdate')
})
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 80px;
  min-height: 100vh;
}

::v-deep(.van-cell-group--inset) {
  margin: 0 15px !important;
}

.item_wrapper {
  font-size: 14px;
  margin: 10px 15px;
  padding: 8px 10px;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #fff;
}

.row {
  display: flex;
  margin-bottom: 2px;
  align-items: flex-end;
  padding-bottom: 2px;
  border-bottom: 1px solid #f4f4f4;

  :first-child {
    font-weight: 500;
  }
}
</style>