<template>
  <div pb-100>
    <Navbar :is-popover="false" :show-filter="false" :title="title"></Navbar>
    <van-form ref="formRef">
      <div class="line">基本信息</div>
      <van-cell-group inset>
        <van-field
            v-model="state.form.name"
            required
            name="name"
            label="名称"
            :rules="[{ required: true, message: '请输入名称' }]"
        />
        <van-field
            v-model="state.form.code"
            required
            name="code"
            label="编号"
            :rules="[{ required: true, message: '请输入编号' }]"
        />
        <van-field
            v-model="state.form.barCode"
            name="barCode"
            label="条码"
        />
        <van-field
            v-model="state.form.spec"
            name="spec"
            label="规格"
        />
        <van-field
            v-model="state.form.model"
            name="model"
            label="型号"
        />
        <van-field
            v-model="dictSelect.category.name"
            name="category"
            label="分类"
            readonly
            required
            is-link
            :rules="[{ required: true, message: '请选择分类' }]"
            @click="handleDictSelectClick('category')"

        />
        <van-field
            v-model="dictSelect.brand.name"
            name="brand"
            label="品牌"
            readonly
            is-link
            @click="handleDictSelectClick('brand')"
        />
        <van-field
            v-model="dictSelect.unit.name"
            name="unit"
            label="单位"
            readonly
            is-link
            @click="handleDictSelectClick('unit')"
        />
        <van-field
            v-model="dictSelect.defaultWarehouse.name"
            name="defaultWarehouse"
            label="默认仓库"
            readonly
            is-link
            @click="handleDictSelectClick('defaultWarehouse')"
        />
        <van-field
            v-model="dictSelect.defaultShelve.name"
            name="defaultShelve"
            label="默认货架"
            readonly
            is-link
            @click="handleDictSelectClick('defaultShelve')"
        />
        <van-field
            v-model="dictSelect.defaultSupplier.name"
            name="defaultSupplier"
            label="默认供应商"
            readonly
            is-link
            @click="handleDictSelectClick('defaultSupplier')"
        />
        <van-field
            v-model="state.form.weight"
            name="weight"
            label="重量"
        />
        <van-field
            v-model="state.form.volume"
            name="volume"
            label="体积"
        />
        <van-field
            v-model="state.form.size"
            name="size"
            label="尺寸"
        />
        <van-field
            name="status"
            label="状态"
        >
          <template #input>
            <van-radio-group v-model="state.form.status" direction="horizontal">
              <van-radio name="1">启用</van-radio>
              <van-radio name="0">禁用</van-radio>
            </van-radio-group>
          </template>

        </van-field>
        <van-field
            v-model="state.form.remarks"
            rows="1"
            type="textarea"
            autosize
            name="remarks"
            label="备注"
        />
      </van-cell-group>
      <div class="line">价格</div>
      <van-cell-group inset>
        <van-field
            v-model="state.form.price1"
            name="name"
            label="进货价"
        />
        <van-field
            v-model="state.form.price2"
            name="code"
            label="市场价"
        />

      </van-cell-group>
      <div class="line">图片</div>
      <div ml-20 mt-10>
        <van-uploader v-model="fileList" :after-read="afterRead" multiple/>
      </div>

    </van-form>
    <OperateBtn left-label="重置" right-label="保存" @cancel="operateCancel" @confirm="operateConfirm"></OperateBtn>
  </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import * as Api from '@/api/warehouseGoods.js'
import {createComponent} from "@/components/mountComponent/index.js";
import Navbar from "@/components/NavBar/navbar.vue";
import {useRouter} from "vue-router";
import OperateBtn from "@/components/CommonPage/components/operateBtn.vue";
import {useUpload} from "@/hooks/useUpload.js";

const router = useRouter()
const state = reactive({
  form: {
    status: '1',
  },

});
const formRef = ref(null);
const {fileList, afterRead, getFileList} = useUpload();
const dictSelect = reactive({
  category: {
    title: '分类',
    code: "warehouseGoodsCategoryTree",
    name: '',
  },
  brand: {
    title: '品牌',
    code: "warehouseGoodsBrandDict",
    name: '',
  },
  unit: {
    title: '单位',
    code: "warehouseGoodsUnitDict",
    name: '',
  },
  defaultWarehouse: {
    title: '默认仓库',
    code: "warehouseDict",
    name: '',
  },
  defaultShelve: {
    title: '默认货架',
    code: "warehouseShelveDict",
    name: '',
  },
  defaultSupplier: {
    title: '默认供应商',
    code: "warehouseSupplierDict",
    name: '',
  },
})

const title = computed(() => {
  let {id} = router.currentRoute.value.query;
  return `${!id ? '新增' : '编辑'}商品`
})


const handleDictSelectClick = async (field) => {
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
        selected: state.form[field],
        code: dictSelect[field].code,
        onConfirm: (data) => {
          state.form[field] = data.id;
          dictSelect[field].name = data.name;
        }
      }
    }
  })
}


const operateCancel = () => {
}
const operateConfirm = async () => {
  let valid = await formRef.value.validate();
  console.log(valid)
  let params = {
    ...state.form,
    fileIds: fileList.value.map(v => v.id),
  };
  await Api.create(params);
}


</script>

<style lang="scss" scoped>
.line {
  position: relative;
  padding-left: 10px; /* 添加内边距来推开文本 */
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0 0 10px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 5px;
    height: 14px;
    background-color: #5dd3f4;
    left: 0; /* 确保伪元素始终位于左侧 */
    top: 50%; /* 可选，如果需要垂直居中 */
    transform: translateY(-50%); /* 可选，如果需要垂直居中 */
  }
}
</style>
