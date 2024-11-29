<template>
  <Teleport to="body">
    <nut-cascader
        :title="'请选择' + title"
        text-key="name"
        value-key="id"
        children-key="children"
        z-index="9999999"
        :options="options"
        @change="onChange"
        @path-change="onPathChange"
        @click-overlay="clickOverlay"
        v-bind="$attrs"
    ></nut-cascader>
  </Teleport>
</template>

<script setup>
import {computed, nextTick, onMounted, ref} from "vue";
import {tree} from "@/api/dictionary.js";


const emits = defineEmits(['update:visible', 'change', 'close'])


const props = defineProps({
  code: String,
  treeData: Object,
  onClose: Function,
  title: String,
})

const treeData = ref({});

const options = computed(() => {
  let tree = treeData.value?.tree || [];
  tree?.forEach(v => removeEmptyChildren(v))
  return tree
})


const onPathChange = (nodes) => {
  let cur = nodes.filter(v => Boolean(v)).at(-1);
  cur = {
    ...cur,
    name: cur.text,
    id: cur.value
  };
  emits('change', cur);
}

const close = () => {
  emits('close', false)
}

const onChange = (val, selected) => {
  if (!(Array.isArray(selected.children) && selected.children.length)) {
    props.onChange?.(selected);
    close();
  }
}

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({selectedOptions}) => {
  console.log('onFinish', selectedOptions)
  // fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};

function removeEmptyChildren(node) {
  if (node.children?.length === 0) {
    delete node.children;
  } else {
    for (let i = 0; i < node.children?.length; i++) {
      removeEmptyChildren(node.children[i]);
    }
  }
}

const getTree = async (code) => {
  let {data: res} = await tree({
    code
  })
  treeData.value = res;
};

onMounted(() => {
  nextTick(() => {
    if (props.code) {
      getTree(props.code);
    } else {
      treeData.value.tree = props.treeData;
    }
  });
})

const clickOverlay = () => {
  emits('update:visible', false);
  emits('close', false);
}
</script>

<style lang="scss" scoped>

</style>
