<template>
  <div>
    <Popup  @confirm="handleConfirm" v-bind="$attrs">
      <van-form>
        <van-cell-group inset>

          <van-field
              v-model="form.startTime"
              readonly
              is-link
              name="开始时间"
              label="开始时间"
              placeholder="开始时间"
              @click="startTimePopupShow = true"
          />
          <van-field
              v-model="form.endTime"
              readonly
              is-link
              name="结束时间"
              label="结束时间"
              placeholder="结束时间"
              @click="endTimePopupShow = true"
          />

          <van-field
              v-model="form.content"
              autosize
              label="备注"
              type="textarea"
              placeholder="请输入备注"
          />
          <div class="pl-15">
            <div class="mbt-10">
              图片
            </div>
            <van-uploader v-model="form.fileList" :after-read="afterRead" multiple/>
          </div>
        </van-cell-group>

      </van-form>


    </Popup>


  </div>
</template>

<script setup>
import Popup from "@/components/Popup/index.vue";
import {nextTick, onMounted, ref, unref, watch} from "vue";
import * as fileApi from "@/api/file.js";
import { useCommonRequest } from '@/hooks/useCommomRequest.js'

const {getFileList} = useCommonRequest();

const emits = defineEmits(['confirm'])
const props = defineProps({
  form: Object,
  confirm: Function,


})
// const show = ref(false);
const startTimePopupShow = ref(false);
const endTimePopupShow = ref(false);
const form = ref({
  startTime: '',
  endTime: '',
  content: '',
  fileList: [],

})


watch(() => props.form, () => {
  // console.log(props.form);
  // form.value = {...props.form}
})

const handleConfirm = () => {
  form.value.fileIds = form.value.fileList.map(v => v.id)
  props.confirm(form.value)
};

onMounted(async () => {
  nextTick(async () => {
    form.value = {...props.form};
    form.value.fileList = await getFileList(props.form?.fileIds || [])
  })
})

const afterRead = async (file) => {
  file.status = 'uploading';
  file.message = '上传中...';


  let {data} = await fileApi.upload({
    file: file.file,
    name: file.file.name,
    dir: '',
  }).catch(v => {
    file.status = 'failed';
    file.message = '上传失败';
  })
  file.status = 'done';
  file.id = data.id

  // setTimeout(() => {
  //   file.status = 'failed';
  //   file.message = '上传失败';
  // }, 1000);
};

</script>

<style lang="scss" scoped>

</style>
