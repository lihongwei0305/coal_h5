<template>
  <div class="container">
    <div class="item">
      <div class="title">设备</div>
      <van-cell-group inset>
        <van-field
            v-model="coalInfo.name"
            readonly
            is-link
            name="设备"
            label="设备"
            @click="coalInfoShow = true"
        />
      </van-cell-group>
    </div>
    <template v-for="[name,values] in items">
      <div class="item">
        <div class="title">{{ name }}</div>
        <van-cell-group inset>
          <van-field
              v-for="item in values"
              v-model="state.form[item.code]"
              :name="item.name"
              :label="item.name"
              type="number"
          >
            <template v-if="item.inputType == 1" #right-icon>
              <van-popover>
                <van-grid
                    square
                    clickable
                    :border="false"
                    column-num="1"
                    style="width: 80rem; height:30rem"
                >
                  <van-grid-item
                      style="padding-top: unset"
                      text="自动计算"
                  />
                </van-grid>
                <template #reference>
                  <van-icon name="warning-o"/>
                </template>
              </van-popover>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </template>

    <div class="item">
      <div class="title">备注</div>
      <van-cell-group inset>
        <van-field
            v-model="state.form.remarks"
            name="备注"
            label="备注"
            type="textarea"
        />
      </van-cell-group>
    </div>

    <div class="item">
      <div class="title">文件上传</div>
      <van-cell-group inset>
        <van-field name="uploader" label-align="top">
          <template #input>
            <van-uploader v-model="fileList" :after-read="afterRead" multiple/>
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <div class="buttons">
      <van-button v-if="!isEdit" size="small" round plain @click="handleReset" type="warning">重　置</van-button>
      <van-button size="small" round plain @click="handleCalculate">计　算</van-button>
      <van-button size="small" round plain @click="handleSave" type="primary">保　存</van-button>
    </div>

  </div>
  <QueryForm ref="queryFormRef" v-model:show="showTop" @queryConfirm="queryConfirm"></QueryForm>
  <DictSelect v-model="coalInfo.id"
              v-model:visible="coalInfoShow"
              :treeData="coalInfoTreeData"
              @change="onChange_coalInfo"
              title="选择煤源"
  ></DictSelect>
</template>

<script setup>
import {list} from '@/api/coalParameterDef'
import * as Api from '@/api/coalAnalysis';
import {computed, onMounted, reactive, ref} from "vue";
import {groupBy} from 'lodash-es'
import {useUpload} from '@/hooks/useUpload.js'
import DictSelect from "@/components/DictSelect/index.vue";
import {useDictSelect} from "@/components/DictSelect/useDictSelect.js";
import {closeToast, showLoadingToast, showToast} from "vant";
import {useRoute} from "vue-router";
import QueryForm from "@/views/coalanalysis/components/query.vue";


const route = useRoute()

const [coalInfoShow, coalInfoTreeData, coalInfo, clearCoalInfo] = useDictSelect('coalInfoDict');
const {fileList, getFileList, afterRead} = useUpload();

document.title = '化验数据录入';
const showTop = ref(false);
const items = ref([])
const getList = async () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
  })
  let {data: res} = await list({
    orders: [
      {
        direction: 'ASC',
        property: 'sortKey'
      }
    ]
  }).finally(() => {
    closeToast();
  })


  items.value = Object.entries(groupBy(res, (item) => {
    return item.parentName || item.name
  }))
      .sort(x => x[1].map(y => y.sortKey).sort()[0])
      .map(x => [x[0], x[1].sort((a, b) => a.sortKey - b.sortKey)]);
}
const state = reactive({
  form: {}
})


const onChange_coalInfo = (data, isCLose) => {
  coalInfo.value.id = [data.id];
  coalInfo.value.name = data.name;
}


const getById = async () => {
  let {data} = await Api.getById({id: route.query.id});

  if (data.coalInfo) {
    coalInfo.value.id = [data.coalInfo.id]
    coalInfo.value.name = data.coalInfo.name;
  }

  if (Array.isArray(data.fileIds) && data.fileIds.length) {
    fileList.value = await getFileList(data.fileIds);
  }

  state.form = data;
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
  await getList();
  await init()
})

const handleSave = async () => {
  // e?.preventDefault?.()
  showLoadingToast({
    message: '保存中...',
    forbidClick: true,
    loadingType: 'spinner',
  })
  let api = isEdit.value ? Api.update : Api.create;
  let {data} = await api({
    ...state.form,
    fileIds: fileList.value.map(v => v.id),
    coalInfo: coalInfo.value.id[0],

  }).finally(() => {
    closeToast();
  })
  state.id = data.id
  state.form = {...data}
  showToast('保存成功')
  // ElMessage.success((isUpdate.value ? '编辑' : '保存') + '成功')
}

const handleCalculate = async () => {
  let {coalInfo, ...rest} = state.form

  let {data: res} = await Api.calculate(rest)
  showToast('计算成功');
  state.form = res
  state.form.coalInfo = coalInfo
}

const handleReset = () => {
  state.form = {};
  clearCoalInfo();
  fileList.value = [];
  showToast('重置成功');
}

const queryConfirm = (items) => {
  showTop.value = false;
  refreshing.value = true;
  onRefresh();
}

</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  background-color: #f8f8f8;
  padding: 15px 0 100px;
}

.item {
  margin-bottom: 10px;

  .title {
    margin-left: 10px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;

  }
}

::v-deep(.buttons) {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d9ced;
  border-radius: 16px

}
</style>
