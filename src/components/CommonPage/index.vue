<template>
  <div>
    <template v-if="'navbar' in $slots">
      <slot name="navbar"></slot>
    </template>
    <template v-else>
      <Navbar v-if="showNavbar" @select="popoverSelect" :title='title' :actions="popoverActions"
              @shaixuan="handleShaiXuan" :popupClose="popupClose" v-bind="navbarBind"></Navbar>
    </template>
    <div class="container">
      <template v-if="_isOperate">
        <div class="flex justify-between px-10px pt-5px">
          <div class="font-14">当前操作：<i class="color-#0b78ea" style="font-style: inherit">{{
              currentOperate || currentSelect.text
            }}</i></div>
          <van-checkbox shape="shape" v-model="isCheckAll" :indeterminate="indeterminate"
                        @change="handleCheckAllChange">
            全选
          </van-checkbox>
        </div>

      </template>


      <div class="list_wrapper">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

          <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <template v-for="item in list" :key="item.id">
              <div class="list_wrapper_item" style="position: relative">
                <div v-if="showArchive" class="archiveStatus" :style="{backgroundColor:item.archiveStatus == 0? '#fa1e1e' : '#7fdd02'}">
                  {{ item.archiveStatusName }}
                </div>
                <div class="list_wrapper_item_content" @click="changeCheckbox(item)">
                  <slot name="content" v-bind="{item}"></slot>
                </div>
                <div class="list_wrapper_item_footer" style="display: flex; justify-content: flex-end">
                  <van-checkbox v-if="_isOperate" v-model="item.checked" checked-color="#0b78ea"
                                shape="square" @change="handleCheckItemChange($event,item)"></van-checkbox>
                  <div v-else class="buttons">
                    <van-space>
                      <template v-for="btn in buttons">
                        <Button :label="item.label" :item="item" v-bind="btn"></Button>
                      </template>
                    </van-space>
                  </div>
                </div>
              </div>
            </template>

          </van-list>

        </van-pull-refresh>

      </div>

    </div>
  </div>


  <!--  <van-floating-bubble v-if="!isOperate" icon="plus" @click="$router.push('/device/operate')"/>-->
  <OperateBtn v-if="_isOperate" @cancel="operateCancel" @confirm="operateConfirm"></OperateBtn>
  <Query ref="queryFormRef" :show="showQueryPopup" :items="queryItems"
         @click-overlay="$emit('update:showQueryPopup',false)"
         @query-confirm="handleQueryConfirm"></Query>
</template>
<script setup>


import Navbar from "@/components/NavBar/navbar.vue";


import {computed, nextTick, onActivated, onMounted, reactive, ref, useSlots} from "vue";
import {useRouter} from "vue-router";
import {showConfirmDialog, showToast} from "vant";
import {useCheckboxForList} from "@/hooks/useCheckboxForList.js";
import {confirmDialog} from '@/hooks/useOperateDialog.js'
import OperateBtn from "@/components/CommonPage/components/operateBtn.vue";
import Button from '@/components/Button.vue'
import ArchiveImg from "@/components/archiveImg.vue";
import Query from "@/components/QueryForm/query.vue";

const $slots = useSlots();
const emits = defineEmits(['update:isOperate', 'shaixuan', 'operateCancel', 'update:showQueryPopup'])
const props = defineProps({
  title: String,
  Api: Object,
  getListAttrs: Object,
  buttons: Array,
  popoverActions: Array,
  isOperate: Boolean,
  showArchive: {
    type: Boolean,
    default: true,
  },
  queryFormRef: Object,
  showNavbar: {
    type: Boolean,
    default: true,
  },
  currentOperate: String,
  customConfirm: Function,
  queryItems: Array,
  navbarBind: Object,
  popupClose: Function,
  showQueryPopup: Boolean
})

const router = useRouter();


const pageAttrs = reactive({
  pageSize: 20,
  currentPage: 1,
  totalCount: 0
});


const loading = ref(false);
const refreshing = ref(false);
const finished = ref(false);
const offset = ref({x: -10, y: 500});
const queryFormRef = ref(null);

const currentSelect = ref({});
const popoverSelect = (action) => {
  currentSelect.value = action;
  action.click();
}


const _isOperate = computed(() => {
  return props.isOperate;
})


let list = ref([]);
const {
  isCheckAll,
  checkMap,
  indeterminate,
  changeCheckbox,
  handleCheckItemChange,
  handleCheckAllChange
} = useCheckboxForList(list, _isOperate);

async function getList() {
  let params = {
    pageSize: pageAttrs.pageSize,
    pageNo: pageAttrs.currentPage - 1,
    items: queryFormRef.value?.queryItems || [],
    ...props.getListAttrs?.params || {}
  }
  props.getListAttrs?.getListBefore?.(params);
  let res = await props.Api.list(params);
  props.getListAttrs?.getListAfter?.(res);
  if (refreshing.value) {
    list.value = [...res.data];
    refreshing.value = false;
  } else {
    list.value.push(...res.data);

  }
  pageAttrs.totalCount = res.totalCount;
  if (res.data.length && pageAttrs.currentPage > 1) {
    indeterminate.value = checkMap.size > 0 && checkMap.size < list.value.length;
  }

  nextTick(() => {
    let containerEl = document.documentElement.clientHeight;
    let header = document.querySelector('.navbar').getBoundingClientRect().height;
    let list_wrapper_itemEl = document.querySelector('.list_wrapper_item')?.getBoundingClientRect().height;
    let van_pull_refreshEl = document.querySelector('.van-pull-refresh');
    let t = parseInt((containerEl - header) / list_wrapper_itemEl);
    if (!res.data.length || res.data.length <= t) {
      // van_pull_refreshEl.style.height = (list_wrapper_itemEl * (t + 1)) + 'px';
      van_pull_refreshEl.style.height = (containerEl - header) + 'px';
    } else {
      van_pull_refreshEl.style.height = '';
    }

  })

}


const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  pageAttrs.currentPage = 1;
  handleCheckAllChange(false)
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
}


const onLoad = async () => {
  await getList();
  pageAttrs.currentPage++;
  loading.value = false;
  if (list.value.length === pageAttrs.totalCount) {
    finished.value = true;
  }


}


onMounted(() => {

})

const refreshList = () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
    refreshing.value = true;
    onRefresh();
  }, 50);
}

onActivated(() => {
  if (router.currentRoute.value.meta?.isRefresh) {
    refreshList();
  }
})

const operateCancel = () => {
  emits('update:isOperate', false);
  currentSelect.value = {};
  handleCheckAllChange(false);
  emits('operateCancel')
}
const operateConfirm = () => {
  if (!checkMap.size) {
    return showToast('请选择需要操作的数据');
  }
  if (props.customConfirm) {
    props.customConfirm({
      records: checkMap,

    });
    return;
  }
  confirmDialog(currentSelect.value.text, {
    length: checkMap.size,
    confirm: () => currentSelect.value.api({ids: [...checkMap.values()]}),
    // confirmBefore: operateCancel,
  });


};


const handleShaiXuan = () => {
  emits('update:showQueryPopup', true);
}
const handleQueryConfirm = async () => {
  refreshList();
  emits('update:showQueryPopup', false);
}
defineExpose({
  refreshList
})

</script>

<style lang="scss" scoped>
.archive_img {
  background: url("@/assets/image/yiguidang.png") no-repeat 50% 50%;
}
</style>


