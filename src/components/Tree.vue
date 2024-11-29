<template>
  <div class="header">
    <div v-if="state.treeData.componentType !== '1'" style="color: #000" class="width-80 text-center" @click="onCancel">
      取消
    </div>
    <div class="w-full fs-14 text-center">请选择{{ title }}</div>
    <div v-if="state.treeData.componentType !== '1'" style="color: #0b78ea" class="width-80 text-center"
         @click="onConfirm">确认
    </div>
  </div>

  <div class="tree_wrapper">
    <El-tree ref="treeRef" node-key="id" :data="state.data" :props="treeProps" :default-checked-keys="[selected]"
             :current-node-key="selected" highlight-current @node-click="nodeClick">

    </El-tree>
  </div>
</template>

<script setup>
import {ElTree} from 'element-plus';
import {ref, defineProps, defineEmits, reactive, onMounted, nextTick, inject} from 'vue';
import * as dictionaryApi from '@/api/dictionary.js'
import {showLoadingToast} from "vant";

const emits = defineEmits(['confirm'])
const props = defineProps({
  code: String,
  title: String,
  selected: {
    type: String,
    default: ''
  }
});
const treeRef = ref(null);


const popupClose = inject("popupClose");

const treeProps = ref({
  label: 'name',
  value: 'id',
  children: 'children',
})

const state = reactive({
  data: [],
  treeData: {
    componentType: '1'
  },

})

const getTree = async () => {
  let {data} = await dictionaryApi.tree({
    code: props.code,
  });
  state.treeData = data;
  state.data = data.tree;
}


const nodeClick = (node) => {
  let {componentType = '1'} = state.treeData || {};
  if (componentType === '1') {
    onConfirm();
  }
};

const onCancel = () => {
  popupClose();
};
const onConfirm = () => {
  let currentNode = treeRef.value.getCurrentNode();
  emits('confirm', currentNode);
  popupClose();
};

onMounted(() => {
  nextTick(async () => {
    const loading = showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0,

    });
    await getTree().finally(() => loading.close());
  })
})

</script>

<style scoped lang="scss">
$height: 45px;
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  background: #faf5f5;
  height: $height;
  font-size: 16px;
}

.tree_wrapper {
  height: calc(100% - $height);
  overflow: auto;
}

::v-deep(.el-tree-node) {
  padding: 5px 0;

  .el-tree-node__label {
    font-size: 16px;
  }

}


</style>
