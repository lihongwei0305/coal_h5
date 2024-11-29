<template>
  <el-tree :data="data">

  </el-tree>
</template>

<script setup>
import { ElTree} from 'element-plus';
import { ref, defineProps, defineEmits } from 'vue';


const props = defineProps({
  data: Array,
  selected: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:selected']);

function handleNodeClick(nodeId) {
  emit('update:selected', nodeId);
}
</script>

<style scoped>
.tree {
  font-size: 14px;
}
</style>