<template>
  <van-popup round position="top" :style="{ height: '45%' }" v-bind="$attrs">
    <div style="height: 100%; position: relative">
      <div class="header">
        <van-icon name="filter-o"/>
        筛选
      </div>
      <div class="content">
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
                v-model="queryForm.name"
                name="车牌号"
                label="车牌号"
                placeholder="车牌号"
            />
            <van-field
                v-model="queryForm.driverName"
                name="driverName"
                label="姓名"
                placeholder="姓名"
            />
            <van-field
                v-model="appointmentStatus.name"
                readonly
                is-link
                name="appointmentStatus"
                label="预约状态"
                placeholder="预约状态"
                @click="appointmentStatusShow = true"
            />

          </van-cell-group>
        </van-form>
      </div>

      <div class="footer">
        <div class="button reset" @click="handleReset">重置</div>
        <div class="button confirm" @click="handleConfirm">确认</div>
      </div>
    </div>


    <DictSelect v-model="device.id"
                v-model:visible="deviceShow"
                :treeData="deviceTreeData"
                @change="onChange_device"
                title="选择设备"
    ></DictSelect>

    <DictSelect v-model="appointmentStatus.id"
                v-model:visible="appointmentStatusShow"
                :treeData="appointmentStatusTreeData"
                @change="onChange_appointmentStatus"
                title="选择预约状态"
    ></DictSelect>


  </van-popup>
</template>

<script setup>
import {ref} from "vue";
import DictSelect from "@/components/DictSelect/index.vue";
import {useDictSelect} from "@/components/DictSelect/useDictSelect.js";


const emits = defineEmits(['queryConfirm'])

const [deviceShow, deviceTreeData, device, clearDevice] = useDictSelect('acDeviceDict');
const [appointmentStatusShow, appointmentStatusTreeData, appointmentStatus, clearAppointment] = useDictSelect('appointment.status');


const queryForm = ref({});

const handleReset = () => {
  queryForm.value = {};
  clearDevice();
  clearAppointment();

}

const getItems = () => {
  let form = {
    ...queryForm.value,
    device: device.value.id[0],
    appointmentStatus: appointmentStatus.value.id[0],

  }
  let items = Object.entries(form).filter(([key, value]) => Boolean(value)).map(([key, value]) => {
    let opt;
    switch (key) {
      case 'device':
      case 'appointmentStatus':
        opt = 'eq';
        break;
      default:
        opt = 'like';
        break;
    }

    return {
      key,
      opt,
      value,
    }
  })
  return items;
}

const handleConfirm = () => {
  let items = getItems();
  emits('queryConfirm', items)
};



const onChange_device = (data) => {
  device.value.id = [data.id];
  device.value.name = data.name;
}
const onChange_appointmentStatus = (data)=>{
  appointmentStatus.value.id = [data.id];
  appointmentStatus.value.name = data.name;
}

defineExpose({
  getItems,

})
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 30px;
}

.content {

}

.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 15px;
  left: 0;
  box-sizing: border-box;
  padding: 0 20px 10px;

  .button {
    padding: 10px 50px;
    border-radius: 16px;
    color: #FFF;
  }

  .reset {
    background-color: #ecb90e;
  }

  .confirm {
    background-color: #1989fa;
  }
}

</style>
