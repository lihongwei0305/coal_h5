<template>
  <div class="container">
    <div class="line">基础信息</div>
    <van-form>
      <van-cell-group inset>
        <van-field
            v-model="device.name"
            readonly
            is-link
            name="设备"
            label="设备"
            placeholder="设备"
            @click="deviceShow = true"
        />
        <van-field
            v-model="state.form.time"
            readonly
            is-link
            name="工单时间"
            label="工单时间"
            placeholder="工单时间"
            @click="state.timePopupShow = true"
        />
        <van-field
            v-model="workOrderType.name"
            readonly
            is-link
            name="工单类型"
            label="工单类型"
            placeholder="工单类型"
            @click="workOrderTypeShow = true"
        />
        <van-field
            v-model="workOrderStatus.name"
            readonly
            is-link
            name="工单类型"
            label="工单类型"
            placeholder="工单类型"
            @click="workOrderStatusShow = true"
        />


      </van-cell-group>
      <!--      <div style="margin: 16px;">-->
      <!--        <van-button round block type="primary" native-type="submit">-->
      <!--          提交-->
      <!--        </van-button>-->
      <!--      </div>-->
    </van-form>

    <div style="display: flex; justify-content: space-between; align-items: center">
      <div class="line" style="margin-top: 15rem;">工单明细</div>
      <van-icon style="font-size: 26rem; margin-right: 20rem; color: #1989fa" name="add-o" @click="showPopup"/>
    </div>


    <div style="padding: 0 20rem">
      <div v-if="state.form.details.length" class="list_wrapper">
        <div class="list_wrapper_item" v-for="(item,index) in state.form.details">
          <div class="list_wrapper_item_header">
            <div class="left">
              <div class="title"></div>
            </div>
            <div class="right">
            </div>
          </div>
          <div class="list_wrapper_item_content">
            <div class="row">
              <div>开始时间：</div>
              <div>{{ item.startTime }}</div>
            </div>
            <div class="row">
              <div style="white-space: nowrap">结束时间：</div>
              <div style="">{{ item.endTime }}</div>
            </div>

            <div class="row">
              <div style="white-space: nowrap; align-self: baseline">内容：</div>
              <div style="word-break: break-all">{{ item.content }}</div>
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
      <div v-else>
        <div   style="text-align: center;height:350rem; padding-top: 65rem;">
          暂无数据
        </div>
      </div>
    </div>

    <div class="bottomBtn">
      <van-button round block type="primary"  @click="handleSave">
        提交
      </van-button>
    </div>

  </div>

  <!--  <Parts v-if="show" v-model:show="show" :form="state.detailForm" @confirm="handleConfirm" @open="handleOpen"></Parts>-->

  <DictSelect v-model="device.id"
              v-model:visible="deviceShow"
              :treeData="deviceTreeData"
              @change="onChange_device"
              title="选择设备"
  ></DictSelect>
  <DictSelect v-model="workOrderType.id"
              v-model:visible="workOrderTypeShow"
              :treeData="workOrderTypeTreeData"
              @change="onChange_workOrderType"
              title="选择工单类型"
  ></DictSelect>
  <DictSelect v-model="workOrderStatus.id"
              v-model:visible="workOrderStatusShow"
              :treeData="workOrderStatusTreeData"
              @change="onChange_workOrderStatus"
              title="选择工单类型"
  ></DictSelect>

  <TimePopup v-model:show="state.timePopupShow" v-model:time="state.form.time"></TimePopup>
</template>

<script setup>
import * as Api from '@/api/deviceWorkOrder.js'
import DictSelect from '@/components/DictSelect/index.vue'
import TimePopup from '@/components/TimePopup/index.vue'
import {useDictSelect} from '@/components/DictSelect/useDictSelect.js'
import {computed, onMounted, reactive, ref} from "vue";
import {showConfirmDialog, showToast} from "vant";
import {useRouter, useRoute} from "vue-router";
import * as fileApi from "@/api/file.js";
import {useCommonRequest} from '@/hooks/useCommomRequest.js'
import {createComponent} from "@/components/mountComponent/index.js";

const {getFileList} = useCommonRequest();

const router = useRouter();
const route = useRoute();

window.document.title = '新增设备工单'

const [deviceShow, deviceTreeData, device] = useDictSelect('deviceDict');
const [workOrderTypeShow, workOrderTypeTreeData, workOrderType] = useDictSelect('device.workOrder.type');
const [workOrderStatusShow, workOrderStatusTreeData, workOrderStatus] = useDictSelect('device.workOrder.status');


const show = ref(false);

const state = reactive({
  pageData: {},
  form: {
    parts: [],
    details: [],

  },
  data: {},
  timeShow: false,
  timePopupShow: false,
  detailForm: {},
  currentIndex: '',

})

const showPopup = async () => {
  // show.value = true;

  await createComponent({
    component: await import('@/views/workOrder/components/parts.vue'),
    params: {
      show: true,
      confirm: (data) => {
        state.form.details.push(data);
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
        state.form.details.splice(index, 1)
      })
      .catch(() => {
        // on cancel
      });
}


const getById = async () => {
  let {data} = await Api.getById({id: route.query.id});

  if (data.device) {
    device.value.id = [data.device.id]
    device.value.name = data.device.name;
  }

  workOrderType.value.id = [data.type];
  workOrderType.value.name = data.typeName;

  workOrderStatus.value.id = [data.orderStatus];
  workOrderStatus.value.name = data.orderStatusName;

  // if (Array.isArray(purchaseOrder.details) && purchaseOrder.details.length) {
  //   for (const v of purchaseOrder.details) {
  //     v.fileIds.length && (v.fileList = await getFileList(v.fileIds))
  //   }
  // }


  state.form = data;
}

const handleSave = async () => {
  let form = state.form;
  form.device = device.value.id?.[0] || '';
  form.type = workOrderType.value.id?.[0] || '';
  form.typeName = workOrderType.value.name;

  form.orderStatus = workOrderStatusShow.value.id?.[0] || '';
  form.orderStatusName = workOrderStatusShow.value.name;

  let api = isEdit.value ? Api.update : Api.create;

  await api(state.form);
  showToast('提交成功')
}


const onChange_device = (data, isCLose) => {
  device.value.id = [data.id];
  device.value.name = data.name;
}

const onChange_workOrderType = (data, isCLose) => {
  workOrderType.value.id = [data.id];
  workOrderType.value.name = data.name;

}
const onChange_workOrderStatus = (data, isCLose) => {
  workOrderStatus.value.id = [data.id];
  workOrderStatus.value.name = data.name;

}

const isEdit = computed(() => {
  return route.query.type === 'edit';

})

const init = async () => {
  state.pageData = route.query;
  let {type, id = ''} = route.query;
  if (type === 'edit') {
    await getById();
  }
}

onMounted(async () => {
  await init();
})


const handleEdit = async (item, index) => {
  await createComponent({
    component: await import('@/views/workOrder/components/parts.vue'),
    params: {
      show: true,
      form: item,
      confirm: (data) => {
        state.form.details[state.currentIndex] = data;
      }
    }
  })
  state.currentIndex = index
}
const handleOpen = () => {
  console.log('handleOpen')
}
const fileList = ref([]);

const afterRead = async (file) => {
  file.status = 'uploading';
  file.message = '上传中...';


  let {data} = await fileApi.upload({
    file: file.file,
    name: file.file.name,
    dir: '',
  }).catch(v => {
    file.status = 'failed';
    file.message = '上传失败';
  })
  file.status = 'done';
  file.id = data.id

  // setTimeout(() => {
  //   file.status = 'failed';
  //   file.message = '上传失败';
  // }, 1000);
};


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
        align-items: center;
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

.empty {
  width: 100px;

  height: 200px;

  svg {
    width: 100%;

    height: 100%;
  }
}
</style>
