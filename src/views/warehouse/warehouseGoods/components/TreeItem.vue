<template>
  <div

      :class="{ 'is-expanded': item.expanded, 'is-selected': isSelected }"
      @click="toggle"
  >
    <span class="tree-item__label">
      <i v-if="item.children && item.expanded" class="el-icon-arrow-down" />
      <i v-if="item.children && !item.expanded" class="el-icon-arrow-right" />
      {{ item.label }}
    </span>
    <template v-if="item.expanded && item.children">
      <Tree
          v-for="(child, index) in item.children"
          :key="child.id"
          :data="[...item.children]"
          :selected="selected"
          @node-click="handleNodeClick"
      />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import Tree from "@/views/warehouse/warehouseGoods/components/tree.vue";

const props = defineProps({
  item: Object,
  index: Number,
  level: Number,
  selected: String
});

const isSelected = computed(() => props.selected === props.item.id);

function handleClick() {
  // 触发父组件的事件
  const event = new CustomEvent('node-click', { detail: props.item.id });
  emit(event);
}
</script>

<style scoped>
.tree-item {
  cursor: pointer;
}

.tree-item.is-expanded {
  margin-left: 20px;
}

.tree-item__label {
  display: flex;
  align-items: center;
}

.tree-item.is-selected {
  background-color: #f5f7fa;
}
</style>