<template>
  <div>
    <Popup @confirm="handleConfirm" v-bind="$attrs">
      <van-form>
        <van-cell-group inset>

          <van-field
              v-model="form.name"
              name="零件名称"
              label="零件名称"
              placeholder="零件名称"
          />
          <van-field
              v-model="form.code"
              name="零件编码"
              label="零件编码"
              placeholder="零件编码"
          />
          <van-field
              v-model="form.manufacturer" dasdsadsadsadsadsa
              name="零件厂家"
              label="零件厂家"
              placeholder="零件厂家"
          />
          <van-field
              v-model="form.model"
              name="零件型号"
              label="零件型号"
              placeholder="零件型号"
          />
          <van-field
              v-model="form.contact"
              name="联系方式"
              label="联系方式"
              placeholder="联系方式"
          />
          <van-field
              v-model="form.remark"
              rows="3"
              autosize
              label="备注"
              type="textarea"
              placeholder="请输入备注"
          />

          <div class="pl-15">
            <div class="mbt-15 font-14">
              图片
            </div>
            <van-uploader v-model="fileList" :after-read="afterRead" multiple/>
          </div>

        </van-cell-group>

      </van-form>


    </Popup>
  </div>
</template>

<script setup>
import Popup from "@/components/Popup/index.vue";
import {nextTick, onMounted, ref, unref} from "vue";
import {useUpload} from '@/hooks/useUpload.js'

const {fileList, afterRead, getFileList} = useUpload();

const emits = defineEmits(['confirm'])
const props = defineProps({
  form: Object,
  confirm: Function,
})
// const show = ref(false);
const form = ref({
  name: '',
  code: '',
  manufacturer: '',
  model: '',
  contact: '',
  remark: '',

})


onMounted(() => {
  nextTick(async () => {
    form.value = props.form;
    if (Array.isArray(props.form.fileIds) && props.form.fileIds.length) {
      fileList.value = await getFileList(props.form.fileIds);
    }

  })
})
const handleConfirm = () => {
  let data = {
    ...form.value,
    fileList: fileList.value,
    fileIds: fileList.value.map(v => v.id),
  }
  props.confirm(data)
}

</script>

<style lang="scss" scoped>

</style>
