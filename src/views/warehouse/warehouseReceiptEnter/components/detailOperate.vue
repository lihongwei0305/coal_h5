<template>
  <div class="container">
    <van-form ref="formRef" :readonly="!isEdit">
      <van-cell-group inset>
        <van-field disabled label="商品名称" readonly v-model="form.goodsName"></van-field>
        <van-field disabled label="规格" readonly v-model="form.spec"></van-field>
        <van-field disabled label="型号" readonly v-model="form.model"></van-field>
        <van-field disabled label="单位" readonly v-model="form.unitName"></van-field>
        <van-field
            v-if="receiptType === '0'"
            v-model="dictSelect.supplier.name"
            name="supplier"
            label="供应商"
            readonly
            is-link
            @click="handleDictSelectClick_supplier('supplier')"

        />
        <van-field
            v-model="dictSelect.warehouse.name"
            name="warehouse"
            :label="WAREHOUSE_MAP[receiptType]"
            readonly
            required
            is-link
            :rules="[{ required: true, message: `请选择${WAREHOUSE_MAP[receiptType]}`}]"
            @click="handleDictSelectClick_warehouse('warehouse')"

        />
        <van-field
            v-model="dictSelect.shelve.name"
            name="shelve"
            label="货架"
            readonly
            required
            is-link
            :rules="[{ required: true, message: '请选择货架' }]"
            @click="handleDictSelectClick_shelve('shelve')"

        />
        <van-field disabled label="当前库存" readonly v-model="form.stock"></van-field>
        <van-field
            :label="NUMBER_MAP[receiptType]"
            v-model="form.number"
            type="number"
            required
            @change="handleChange"
            :rules="[{ required: true, message: `请输入${NUMBER_MAP[receiptType]}`}]"
        ></van-field>
        <van-field
            :label="PRICE_MAP[receiptType]"
            v-model="form.price"
            type="number"
            required
            @change="handleChange"
            :rules="[{ required: true, message: `请输入${PRICE_MAP[receiptType]}`}]"
        ></van-field>
        <van-field :label="AMOUNT_MAP[receiptType]" v-model="form.amount" type="number"></van-field>
        <van-field label="备注" v-model="form.remarks" type="textarea" autosize></van-field>
      </van-cell-group>
    </van-form>

    <div mx-15px mt-10>
      <van-button :disabled="!isEdit" type="primary" size="small" block @click="handleConfirm">确认</van-button>
    </div>

  </div>
</template>

<script setup>
import {nextTick, onMounted, reactive, ref} from "vue";
import {createComponent} from "@/components/mountComponent/index.js";
import {showToast} from "vant";
import * as Api from '@/api/warehouseReceipt.js'
import Decimal from "decimal.js";
import {useMyPopup} from '@/components/myPopup/useMyPopup.js'

const {popupClose} = useMyPopup();
import {AMOUNT_MAP, NUMBER_MAP, PRICE_MAP, WAREHOUSE_MAP} from "@/views/warehouse/warehouseReceiptEnter/config.js";
import {groupBy, uniqBy} from "lodash-es";

const emits = defineEmits(['confirm'])
const props = defineProps({
  current: {
    type: Object,
    default: () => {
    }
  },
  time: String,
  receiptType: String,
  currGoods: Array,
  isEdit: Boolean,
});

const formRef = ref(null);


const form = reactive({});

const state = reactive({
  warehouseList: [],
  shelveList: [],
});

const dictSelect = reactive({

  warehouse: {
    title: '仓库',
    code: "warehouseDict",
    name: '',
  },
  shelve: {
    title: '货架',
    code: "warehouseShelveDict",
    name: '',
  },
  supplier: {
    title: '供应商',
    code: "warehouseSupplierDict",
    name: '',
  },
})
const handleDictSelectClick_supplier = async (field) => {
  if (!props.isEdit) return;
  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      style: {
        height: '60%',
      },
      component: await import('@/components/Tree.vue'),
      componentBind: {
        title: dictSelect[field].title,
        selected: form[field],
        code: dictSelect[field].code,
        onConfirm: (data) => {
          form[field] = data.id;
          form[field + 'Name'] = data.name;
          dictSelect[field].name = data.name;
        },
      }
    }
  });
}
const handleDictSelectClick_warehouse = async (field) => {
  if (!props.isEdit) return;
  if (props.receiptType != 0) {
    let t = uniqBy(props.currGoods, 'warehouseId');
    state.warehouseList = t.map(v => {
      return {
        name: v.warehouseName,
        id: v.warehouseId
      }
    });
  }
  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      style: {
        height: '60%',
      },
      component: await import('@/components/Tree.vue'),
      componentBind: {
        title: dictSelect[field].title,
        selected: form[field],
        code: dictSelect[field].code,
        data: state.warehouseList,
        onConfirm: (data) => {
          form[field] = data.id;
          form[field + 'Name'] = data.name;
          dictSelect[field].name = data.name;
          form.stock = 0;
          form.shelve = '';
          form.shelveName = '';
          dictSelect['shelve'].name = '';
        },
      }
    }
  });
}
const handleDictSelectClick_shelve = async (field) => {
  if (!props.isEdit) return;
  if (!form.warehouse) {
    return showToast('请先选择仓库');
  }

  if (props.receiptType != 0) {
    let t = groupBy(props.currGoods, 'warehouseId');
    state.shelveList = t[form.warehouse].map(v => {
      return {
        name: v.shelveName,
        id: v.shelveId
      }
    });
  }


  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      style: {
        height: '60%',
      },
      component: await import('@/components/Tree.vue'),
      componentBind: {
        title: dictSelect[field].title,
        selected: form[field],
        code: dictSelect[field].code,
        data: state.shelveList,
        onConfirm: (data) => {
          form[field] = data.id;
          form[field + 'Name'] = data.name;
          dictSelect[field].name = data.name;
          getStock();
        },
        getTreeBefore: () => {
          if (props.receiptType === '0') {
            return {
              params: {
                items: [
                  {
                    "key": "warehouse",
                    "opt": "eq",
                    "value": form.warehouse,
                  }
                ]
              }
            }

          }
        }
      }
    }
  });
};

const getStock = async () => {
  let {data} = await Api.report({
    includeSum: false,
    endTime: props.time,
    goodsIds: [props.current.goods],
    warehouseIds: [form.warehouse],
    shelveIds: [form.shelve],
  });
  form.stock = data[0]?.currNumber || 0;
}

const handleConfirm = async () => {
  await formRef.value.validate();
  emits('confirm', form);
  popupClose();
};

const handleChange = () => {

  if (!form.number || !form.price) return;
  form.amount = Decimal.mul(form.number || 0, form.price || 0).toFixed(2);
}

onMounted(() => {
  nextTick(() => {
    Object.entries(props.current).forEach(([k, v]) => {
      form[k] = v;
    });
    form.unitName = form.unit?.name || '';
    dictSelect.warehouse.name = form.warehouseName || '';
    dictSelect.shelve.name = form.shelveName || '';


  });
})
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
  min-height: 90vh;
}

.disabled {
  background-color: #f5f7fa !important;
}
</style>