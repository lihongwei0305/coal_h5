<template>
 <div style="position: relative;">
   <van-popup round position="top" :style="{ maxHeight: '65%' }" v-bind="$attrs">
     <div style="height: 100%;">
       <div class="header">
         <van-icon name="filter-o"/>
         筛选
       </div>
       <div class="content">
         <van-form>
           <van-cell-group inset>


             <van-field
                 v-model="supplier.name"
                 readonly
                 is-link
                 name="supplier"
                 label="供应商"
                 placeholder="供应商"
                 @click="supplierShow = true"
             />

             <van-field
                 v-model="coalType.name"
                 readonly
                 is-link
                 name="coalType"
                 label="煤源类型"
                 placeholder="煤源类型"
                 @click="coalTypeShow = true"
             />

             <van-field
                 v-model="coalInfo.name"
                 readonly
                 is-link
                 name="coalInfo"
                 label="煤源名称"
                 placeholder="煤源名称"
                 @click="coalInfoShow = true"
             />
             <van-field
                 v-model="orderStatus.name"
                 readonly
                 is-link
                 name="orderStatus"
                 label="订单状态"
                 placeholder="订单状态"
                 @click="orderStatusShow = true"
             />
             <!--            <van-field-->
             <!--                v-model="queryForm.name"-->
             <!--                name="车牌号"-->
             <!--                label="车牌号"-->
             <!--                placeholder="车牌号"-->
             <!--            />-->
             <div class="pl-15">
               <div class="mtb-10">
                 预约时间
               </div>
               <van-field
                   v-model="queryForm.beginTime"
                   readonly
                   is-link
                   name="beginTime"
                   label="开始时间"
                   placeholder="开始时间"
                   @click="startTimePopupShow = true"
                   :rules="[{ required: true, message: '请选择开始时间' }]"
               />
               <van-field
                   v-model="queryForm.endTime"
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
                 v-model="archiveStatus.name"
                 readonly
                 is-link
                 name="archiveStatus"
                 label="归档状态"
                 placeholder="归档状态"
                 @click="archiveStatusShow = true"
             />

           </van-cell-group>
         </van-form>
       </div>
       <div class="footer">
         <div class="button reset" @click="handleReset">重置</div>
         <div class="button confirm" @click="handleConfirm">确认</div>
       </div>
     </div>


     <DictSelect v-model="coalType.id"
                 v-model:visible="coalTypeShow"
                 :treeData="coalTypeTreeData"
                 @change="onChange_coalType"
                 title="选择煤源类型"
     ></DictSelect>

     <DictSelect v-model="supplier.id"
                 v-model:visible="supplierShow"
                 :treeData="supplierTreeData"
                 @change="onChange_supplier"
                 title="选择供应商"
     ></DictSelect>

     <DictSelect v-model="coalType.id"
                 v-model:visible="coalTypeShow"
                 :treeData="coalTypeTreeData"
                 @change="onChange_coalType"
                 title="选择煤源类型"
     ></DictSelect>

     <DictSelect v-model="coalInfo.id"
                 v-model:visible="coalInfoShow"
                 :treeData="coalInfoTreeData"
                 @change="onChange_coalInfo"
                 title="选择煤源名称"
     ></DictSelect>
     <DictSelect v-model="orderStatus.id"
                 v-model:visible="orderStatusShow"
                 :treeData="orderStatusTreeData"
                 @change="onChange_orderStatus"
                 title="选择订单状态"
     ></DictSelect>

     <DictSelect v-model="archiveStatus.id"
                 v-model:visible="archiveStatusShow"
                 :treeData="archiveStatusTreeData"
                 @change="onChange_archiveStatus"
                 title="选择归档状态"
     ></DictSelect>

     <TimePopup v-model:show="startTimePopupShow" v-model:time="queryForm.beginTime" startTime></TimePopup>
     <TimePopup v-model:show="endTimePopupShow" v-model:time="queryForm.endTime"></TimePopup>

   </van-popup>
 </div>
</template>

<script setup>
import {ref} from "vue";
import DictSelect from "@/components/DictSelect/index.vue";
import {useDictSelect} from "@/components/DictSelect/useDictSelect.js";


const emits = defineEmits(['queryConfirm'])

const [archiveStatusShow, archiveStatusTreeData, archiveStatus, clear_archiveStatus] = useDictSelect('archiveStatus');
const [supplierShow, supplierTreeData, supplier, clear_supplier] = useDictSelect('supplierDict');
const [coalTypeShow, coalTypeTreeData, coalType, clear_coalType] = useDictSelect('coal.type');
const [coalInfoShow, coalInfoTreeData, coalInfo, clear_coalInfo] = useDictSelect('coalInfoDict');
const [orderStatusShow, orderStatusTreeData, orderStatus, clear_orderStatus] = useDictSelect('purchaseOrder.status');
const startTimePopupShow = ref(false)
const endTimePopupShow = ref(false);

const queryForm = ref({});

const handleReset = () => {
  queryForm.value = {};
  clear_archiveStatus();
  clear_supplier();
  clear_coalType();
  clear_coalInfo();
  clear_orderStatus();
}

const getItems = () => {
  let form = {
    ...queryForm.value,
    supplier: supplier.value.id[0],
    coalType: coalType.value.id[0],
    coalInfo: coalInfo.value.id[0],
    orderStatus: orderStatus.value.id[0],
    archiveStatus: archiveStatus.value.id[0],

  }
  let items = Object.entries(form).filter(([key, value]) => Boolean(value)).map(([key, value]) => {
    let opt;
    switch (key) {
      case 'supplier':
        opt = 'eq';
        key = 'coalInfo.supplier.id'
        break;
      case 'coalType':
        opt = 'eq';
        key = 'coalInfo.coalType'
        break;
      case 'coalInfo':
        opt = 'eq';
        key = 'coalInfo.id'
        break;
      case 'orderStatus':
      case 'archiveStatus':
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
  if (form.beginTime && form.endTime) {
    let startTime = {
      key: 'startTime',
      opt: 'between',
      min: form.beginTime,
      max: form.endTime,
    };
    items.push(startTime)
  }
  items = items.filter(v => !['beginTime', 'endTime'].includes(v.key))
  return items;
}

const handleConfirm = () => {
  let items = getItems();
  emits('queryConfirm', items)
};

const setStartTime = (items) => {
  let startTime = {
    key: 'startTime',
    opt: 'between',
    min: items.find(v => v.key === 'startTime')?.value || '',
    max: items.find(v => v.key === 'endTime')?.value || '',
  }
  if (startTime.min || startTime.max) {
    items.push(startTime);
  }


}

const onChange_supplier = (data) => {
  supplier.value.id = [data.id];
  supplier.value.name = data.name;
}
const onChange_coalType = (data) => {
  coalType.value.id = [data.id];
  coalType.value.name = data.name;
}
const onChange_coalInfo = (data) => {
  coalInfo.value.id = [data.id];
  coalInfo.value.name = data.name;
}
const onChange_orderStatus = (data) => {
  orderStatus.value.id = [data.id];
  orderStatus.value.name = data.name;
}
const onChange_archiveStatus = (data) => {
  archiveStatus.value.id = [data.id];
  archiveStatus.value.name = data.name;
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
  box-sizing: border-box;
  overflow: auto;
  height: 350px;
  padding-bottom: 50px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 20px 10px;

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
