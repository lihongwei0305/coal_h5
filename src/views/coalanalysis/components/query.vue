<template>
  <van-popup round position="top" :style="{ height: '45%' }" v-bind="$attrs">
    <div style="height: 100%; position: relative">
      <div class="header">
        <van-icon name="filter-o" />
        筛选
      </div>
      <div class="content">
        <van-form>
          <van-cell-group inset>
            <van-field
                v-model="coalInfo.name"
                readonly
                is-link
                name="煤源"
                label="煤源"
                placeholder="煤源"
                @click="coalInfoShow = true"
            />
            <van-field
                v-model="createUserId.name"
                readonly
                is-link
                name="化验员"
                label="化验员"
                placeholder="化验员"
                @click="createUserIdShow = true"
            />

          </van-cell-group>
        </van-form>
      </div>

      <div class="footer">
        <div class="button reset" @click="handleReset">重置</div>
        <div class="button confirm" @click="handleConfirm">确认</div>
      </div>
    </div>


    <DictSelect v-model="coalInfo.id"
                v-model:visible="coalInfoShow"
                :treeData="coalInfoTreeData"
                @change="onChange_coalInfo"
                title="选择煤源"
    ></DictSelect>
    <DictSelect v-model="createUserId.id"
                v-model:visible="createUserIdShow"
                :treeData="createUserIdTreeData"
                @change="onChange_createUserId"
                title="选择工单类型"
    ></DictSelect>


  </van-popup>
</template>

<script setup>
import {ref} from "vue";
import DictSelect from "@/components/DictSelect/index.vue";
import {useDictSelect} from "@/components/DictSelect/useDictSelect.js";

const emits = defineEmits(['queryConfirm'])

const [coalInfoShow, coalInfoTreeData, coalInfo, clearCoalInfo] = useDictSelect('coalInfoDict');
const [createUserIdShow, createUserIdTreeData, createUserId, clearCreateUserId] = useDictSelect('userDict');


const queryForm = ref({});

const handleReset = () => {
  queryForm.value = {};
  clearCoalInfo();
  clearCreateUserId();

}

const getItems = () => {
  let form = {
    ...queryForm.value,
    coalInfo: coalInfo.value.id[0],
    createUserId: createUserId.value.id[0],
    // orderStatus:workOrderStatus.value.id[0]

  }
  return Object.entries(form).filter(([key, value]) => Boolean(value)).map(([key, value]) => {
    let opt;
    switch (key) {
      case 'coalInfo':
      case 'createUserId':
      case 'orderStatus':
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
}

const handleConfirm = () => {
  let items = getItems();
  emits('queryConfirm', items)
};


const onChange_coalInfo = (data, isCLose) => {
  coalInfo.value.id = [data.id];
  coalInfo.value.name = data.name;
}


const onChange_createUserId = (data) => {
  createUserId.value.id = [data.id];
  createUserId.value.name = data.name;

}


defineExpose({
  getItems,

})
</script>

<style lang="scss" scoped>
.header{
  text-align: right;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 30px;
}
.content{

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
