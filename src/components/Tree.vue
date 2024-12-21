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
    <van-field v-model="state.filterText" placeholder="搜索"></van-field>
    <ElTree
        ref="treeRef"
        node-key="id"
        highlight-current
        :data="state.data"
        :props="treeProps"
        :default-checked-keys="[selected]"
        :current-node-key="selected"
        :filter-node-method="filterNode"
        @node-click="nodeClick"
    >
    </ElTree>
  </div>
</template>

<script setup>
import {ElTree} from 'element-plus';
import {ref, defineProps, defineEmits, reactive, onMounted, nextTick, watch} from 'vue';
import * as dictionaryApi from '@/api/dictionary.js'
import {showLoadingToast} from "vant";
import { useMyPopup } from '@/components/myPopup/useMyPopup.js'

const { popupClose } = useMyPopup();

const emits = defineEmits(['confirm'])
const props = defineProps({
  code: String,
  title: String,
  selected: {
    type: String,
    default: ''
  },
  getTreeBefore: Function,
  data: {
    type: Array,
    default: () => []
  },

});
const treeRef = ref(null);


const treeProps ={
  label: 'name',
  value: 'id',
  children: 'children',
}

const state = reactive({
  data: [],
  treeData: {
    componentType: '1'
  },
  filterText: '',

})

const getTree = async () => {
  if (props.data.length) {
    state.data = props.data;
    return;
  }
  let {data} = await dictionaryApi.tree({
    code: props.code,
    ...props.getTreeBefore?.() || {}
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

watch(()=>state.filterText, (val) => {
  treeRef.value.filter(val)
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.name.includes(value)
}

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
