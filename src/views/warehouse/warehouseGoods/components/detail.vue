<template>
  <div class="py-10px px-15px">
    <div class="line">基本信息</div>
    <div>
      <div class="row">
        <div class="title">名称</div>
        <div class="value">{{ currentRow.name }}</div>
      </div>
      <div class="row">
        <div class="title">编号</div>
        <div class="value">{{ currentRow.code }}</div>
      </div>
      <div class="row">
        <div class="title">条码</div>
        <div class="value">{{ currentRow.barCode }}</div>
      </div>

      <div class="row">
        <div class="title">规格</div>
        <div class="value">{{ currentRow.spec }}</div>
      </div>
      <div class="row">
        <div class="title">型号</div>
        <div class="value">{{ currentRow.model }}</div>
      </div>
      <div class="row">
        <div class="title">分类</div>
        <div class="value">{{ currentRow.category?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">品牌</div>
        <div class="value">{{ currentRow.brand?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">单位</div>
        <div class="value">{{ currentRow.unit?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">默认仓库</div>
        <div class="value">{{ currentRow.defaultWarehouse?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">默认货架</div>
        <div class="value">{{ currentRow.defaultShelve?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">默认供应商</div>
        <div class="value">{{ currentRow.supplier?.name || '' }}</div>
      </div>
      <div class="row">
        <div class="title">重量</div>
        <div class="value">{{ currentRow.weight }}</div>
      </div>
      <div class="row">
        <div class="title">体积</div>
        <div class="value">{{ currentRow.volume }}</div>
      </div>
      <div class="row">
        <div class="title">尺寸</div>
        <div class="value">{{ currentRow.size }}</div>
      </div>
      <div class="row">
        <div class="title">状态</div>
        <div class="value">{{ currentRow.status === '1' ? '启用' : '停用' }}</div>
      </div>
    </div>
    <div class="line mt-10px">价格</div>
    <div>
      <div class="row">
        <div class="title">进货价</div>
        <div class="value">{{ currentRow.price1 }}</div>
      </div>
      <div class="row">
        <div class="title">市场价</div>
        <div class="value">{{ currentRow.price2 }}</div>
      </div>
    </div>
    <div class="line mt-10px">保质期</div>
    <div>
      <div class="row">
        <div class="title">是否启用</div>
        <div class="value">{{ currentRow.enableShelfLife ? '是' : '否' }}</div>
      </div>
      <div class="row" v-if="currentRow.enableShelfLife">
        <div class="title">保质期</div>
        <div class="value">{{ currentRow.shelfLife }}</div>
      </div>
    </div>
    <div class="line mt-10px">图片</div>

    <div class="img_wrapper">
      <van-image
          v-for="(item,index) in state.fileList"
          width="100"
          height="100"
          fit="contain"
          :src="item.publicUrl"
          @click="handleOpenPreview(index)"
      />
    </div>

  </div>


</template>

<script setup>
import {nextTick, onMounted, onUnmounted, reactive} from "vue";
import {useUpload} from "@/hooks/useUpload.js";
import {showImagePreview} from "vant";

const props = defineProps({
  currentRow: Object
})
const {getFileList} = useUpload();

const state = reactive({
  fileList: [],
  images: [],
})




const handleOpenPreview = (index)=>{
  showImagePreview({
    images: state.images,
    startPosition: index,
  });

}

onMounted(() => {
  nextTick(async () => {
    if (Array.isArray(props.currentRow.fileIds) && props.currentRow.fileIds.length) {
      state.fileList = await getFileList(props.currentRow.fileIds);
      state.images = state.fileList.map(v => v.publicUrl);
    }
  })

})

onUnmounted(() => {
})
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  padding-left: 10px; /* 添加内边距来推开文本 */
  font-size: 16px;
  font-weight: bold;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 5px;
    height: 14px;
    background-color: #5dd3f4;
    left: 0; /* 确保伪元素始终位于左侧 */
    top: 50%; /* 可选，如果需要垂直居中 */
    transform: translateY(-50%); /* 可选，如果需要垂直居中 */
  }
}


.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 14px;

  .title {
    color: #2c2f3b;
  }

  .value {
    color: #000;
  }
}
.img_wrapper {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 25px;
}

</style>