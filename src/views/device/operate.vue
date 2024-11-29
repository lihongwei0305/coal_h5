<template>
  <div class="container">
    <div class="line">基础信息</div>
    <van-form>
      <van-cell-group inset>
        <van-field
            v-model="state.form.name"
            name="设备名称"
            label="设备名称"
            placeholder="设备名称"
        />
        <van-field
            v-model="category.name"
            readonly
            is-link
            name="设备分类"
            label="设备分类"
            placeholder="设备分类"
            @click="categoryShow = true"
        />
        <van-field
            v-model="supplier.name"
            readonly
            is-link
            name="设备厂家"
            label="设备厂家"
            placeholder="设备厂家"
            @click="supplierShow = true"
        />
        <van-field
            v-model="state.form.model"
            name="设备型号"
            label="设备型号"
            placeholder="设备型号"
        />
        <van-field
            v-model="state.form.parameter"
            name="设备参数"
            label="设备参数"
            placeholder="设备参数"
        />
        <van-field
            v-model="state.form.location"
            name="设备位置"
            label="设备位置"
            placeholder="设备位置"
        />
        <van-field
            v-model="state.form.pxarks"
            rows="2"
            autosize
            label="备注"
            type="textarea"
            placeholder="请输入备注"
        />
        <div class="pl-15">
          <div class="mtb-10">
            图片
          </div>
          <van-uploader v-model="fileList" :after-read="afterRead" multiple/>
        </div>
      </van-cell-group>
      <!--      <div style="margin: 16px;">-->
      <!--        <van-button round block type="primary" native-type="submit">-->
      <!--          提交-->
      <!--        </van-button>-->
      <!--      </div>-->
    </van-form>

    <div style="display: flex; justify-content: space-between; align-items: center">
      <div class="line" style="margin-top: 15px;">设备配件</div>
      <van-icon style="font-size: 26px; margin-right: 20px; color: #1989fa" name="add-o" @click="showPopup"/>
    </div>


    <div style="padding: 0 20px">
      <div class="list_wrapper">
        <div class="list_wrapper_item" v-for="(item,index) in state.form.parts">
          <div class="list_wrapper_item_header">
            <div class="left">
              <div class="title">{{ item.name }}</div>
            </div>
            <div class="right">
            </div>
          </div>
          <div class="list_wrapper_item_content">
            <div class="row">
              <div>编码：</div>
              <div>{{ item.code }}</div>
            </div>
            <div class="row">
              <div style="white-space: nowrap">厂家：</div>
              <div style="">{{ item.manufacturer }}</div>
            </div>
            <div class="row">
              <div>型号：</div>
              <div>{{ item.model }}</div>
            </div>
            <div class="row">
              <div>联系方式：</div>
              <div>{{ item.contact }}</div>
            </div>
            <div class="row">
              <div>备注：</div>
              <div>{{ item.pxark }}</div>
            </div>
            <div class="row buttons">
              <van-space>
                <div class="button edit" @click="handleEdit(item,index)">修改</div>
                <div class="button delete" @click="handleDelete(item,index)">删除</div>
              </van-space>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomBtn">
      <van-button round block type="primary" @click="handleSave">
        提交
      </van-button>
    </div>

  </div>


  <DictSelect v-model="category.id"
              v-model:visible="categoryShow"
              :treeData="categoryTreeData"
              @change="onChange_category"
              title="选择设备分类"
  ></DictSelect>
  <DictSelect v-model="supplier.id"
              v-model:visible="supplierShow"
              :treeData="supplierTreeData"
              @change="onChange_supplier"
              title="选择设备厂家"
  ></DictSelect>
</template>

<script setup>
import * as Api from '@/api/device.js'
import DictSelect from '@/components/DictSelect/index.vue'
import {useDictSelect} from '@/components/DictSelect/useDictSelect.js'
import {onMounted, reactive, ref} from "vue";
import {showConfirmDialog, showToast} from "vant";
import {useRouter, useRoute} from "vue-router";

import {createComponent} from "@/components/mountComponent/index.js";
import {useUpload} from '@/hooks/useUpload.js'

const router = useRouter();
const route = useRoute();
const {fileList, afterRead, getFileList} = useUpload();
import {useList} from '@/hooks/useList.js'


window.document.title = '新增设备'

const [categoryShow, categoryTreeData, category] = useDictSelect('deviceCategoryTree');
const [supplierShow, supplierTreeData, supplier] = useDictSelect('deviceSupplierDict');

const {addMeta} = useList();


const state = reactive({
  pageData: {},
  form: {
    parts: [],
  },
  data: {},
  fileList: [],
  currentIndex: ''
})

const showPopup = async () => {
  await createComponent({
    component: await import('@/views/device/components/parts.vue'),
    params: {
      show: true,
      form: {},
      confirm: (data) => {
        state.form.parts.push(data)
      }
    }
  })
};


const handleDelete = (item, index) => {
  showConfirmDialog({
    title: '删除',
    message:
        '确定删除该数据吗?',
  })
      .then(() => {
        // on confirm
        state.form.parts.splice(index, 1)
      })
      .catch(() => {
        // on cancel
      });
}


const getById = async () => {
  let {data} = await Api.getById({id: route.query.id});

  if (data.category) {
    category.value.id = [data.category.id]
    category.value.name = data.category.name;
  }

  if (data.supplier) {
    supplier.value.id = [data.supplier.id];
    supplier.value.name = data.supplier.name;
  }

  if (Array.isArray(data.fileIds) && data.fileIds.length) {
    fileList.value = await getFileList(data.fileIds);
  }

  state.form = data;
}

const handleSave = async () => {
  let form = state.form;
  form.category = category.value.id?.[0] || '';
  form.supplier = supplier.value.id?.[0] || '';
  await Api.create(state.form);
  showToast('提交成功');
  addMeta('device',{
    isRefresh: true,
  })
}


const onChange_category = (data, isCLose) => {
  category.value.id = [data.id];
  category.value.name = data.name;
}

const onChange_supplier = (data, isCLose) => {
  supplier.value.id = [data.id];
  supplier.value.name = data.name;

}


const init = async () => {
  state.pageData = route.query;
  let {type, id = ''} = route.query;
  if (type === 'edit') {
    await getById();
  }
}

const handleEdit = async (item, index) => {
  await createComponent({
    component: await import('@/views/device/components/parts.vue'),
    params: {
      show: true,
      form: item,
      confirm: (data) => {
        state.form.parts[state.currentIndex] = data;
      }
    }
  })
  state.currentIndex = index
}

onMounted(async () => {
  await init();
})


</script>

<style lang="scss" scoped>
.container {
  background-color: #f8f8f8;
  padding-top: 10px;
  box-sizing: border-box;
  height: 100vh;
}

.line {
  position: relative;
  margin-left: 20px;
  margin-bottom: 10px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 600;

  &:before {
    content: ' ';
    position: absolute;
    bottom: 2px;
    left: 0;
    display: block;
    width: 4px;
    height: 18px;
    background-color: #1dbfae;
  }
}

.bottomBtn {
  width: 90%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.list_wrapper {
  &_item {
    margin-bottom: 10px;
    padding: 5px 10px;
    background-color: #FFF;
    border-radius: 8px;

    &_header {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      font-weight: 600;

      .left {
        display: flex;

        .title {
          margin-right: 5px;
        }

        .tag {
          border: 1px solid #1eccda;
          color: #1eccda;
          border-radius: 4px;
          font-size: 12px;
          padding: 2px;
        }
      }

    }

    &_content {
      .row {
        padding: 3px 0;
        display: flex;
      }

      .buttons {
        justify-content: flex-end;

        .button {
          border: 1px solid #1eccda;
          border-radius: 8px;
          padding: 5px 10px;
          color: #0b78ea;
        }

        .edit {

          color: #1989fa !important;
          border: 1px solid #1989fa !important;
        }

        .delete {
          color: #ee0a24 !important;
          border: 1px solid #ee0a24 !important;
        }
      }
    }
  }
}

</style>
