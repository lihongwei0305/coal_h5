<template>
  <div class="container">
    <div class="line">车辆预约</div>
    <van-form @submit="handleSave">
      <van-cell-group inset>
        <van-field
            v-model="device.name"
            readonly
            is-link
            name="device"
            label="设备"
            placeholder="设备"
            required
            @click="deviceShow = true"
            :rules="[{ required: true, message: '请输入设备' }]"
        />
        <van-field
            v-model="state.form.plateNo"
            required
            name="plateNo"
            label="车牌号"
            placeholder="车牌号"
            :rules="[{ required: true, message: '请输入车牌号' }]"
        />
        <div class="pl-15">
          <div class="mtb-10">
            预约时间
          </div>
          <van-field
              v-model="state.form.startTime"
              readonly
              is-link
              name="startTime"
              label="开始时间"
              placeholder="开始时间"
              @click="startTimePopupShow = true"
              :rules="[{ required: true, message: '请选择开始时间' }]"
          />
          <van-field
              v-model="state.form.endTime"
              readonly
              is-link
              name="endTime"
              label="结束时间"
              placeholder="结束时间"
              @click="endTimePopupShow = true"
              :rules="[{ required: true, message: '请选择结束时间' }]"
          />
        </div>

        <van-field
            v-model="state.form.driverName"
            name="driverName"
            label="姓名"
            placeholder="姓名"
        />
        <van-field
            v-model="state.form.driverPhone"
            name="driverPhone"
            label="联系电话"
            placeholder="联系电话"
        />
        <van-field
            v-model="state.form.reason"
            rows="2"
            autosize
            name="reason"
            label="事由"
            type="textarea"
            placeholder="请输入事由"
        />
      </van-cell-group>
      <div class="bottomBtn">
        <van-button round block type="primary" native-type="submit">
          确认
        </van-button>
      </div>
    </van-form>


  </div>


  <DictSelect v-model="device.id"
              v-model:visible="deviceShow"
              :treeData="deviceTreeData"
              @change="onChange_device"
              title="选择设备"
  ></DictSelect>
  <TimePopup v-model:show="startTimePopupShow" v-model:time="state.form.startTime" startTime></TimePopup>
  <TimePopup v-model:show="endTimePopupShow" v-model:time="state.form.endTime"></TimePopup>
</template>

<script setup>
import * as Api from '@/api/acAppointment.js'
import DictSelect from '@/components/DictSelect/index.vue'
import {useDictSelect} from '@/components/DictSelect/useDictSelect.js'
import {onMounted, reactive, ref} from "vue";
import {showConfirmDialog, showToast} from "vant";
import {useRouter, useRoute} from "vue-router";

import {createComponent} from "@/components/mountComponent/index.js";


const router = useRouter();
const route = useRoute();

import {useList} from '@/hooks/useList.js'


window.document.title = '车辆预约'

const startTimePopupShow = ref(false)
const endTimePopupShow = ref(false);
const [deviceShow, deviceTreeData, device, clearDevice] = useDictSelect('acDeviceDict');

const {addMeta} = useList();
const plateNo = ref('');
const state = reactive({
  pageData: {},
  form: {},
  data: {},
})


const onChange_device = (data) => {
  device.value.id = [data.id];
  device.value.name = data.name;
}
const getById = async () => {
  let {data} = await Api.getById({id: route.query.id});

  if (data.device) {
    device.value.id = [data.device.id]
    device.value.name = data.device.name;
  }

  state.form = data;
}

const handleSave = async (values) => {
  let form = {
    ...state.form,
    ...values,
    device: device.value.id[0] || '',
  };
  let api = route.query.type === 'edit' ? Api.update : Api.create;
  await api(form);
  showToast(`${route.query.type === 'edit' ? '编辑' : '保存'}成功`);
  addMeta('accessgateAppointment', {
    isRefresh: true,
  })
}


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


</script>

<style lang="scss" scoped>
.container {
  background-color: #f8f8f8;
  padding-top: 10px;
  height: 100vh;
  box-sizing: border-box;
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
