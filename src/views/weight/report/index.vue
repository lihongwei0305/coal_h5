<template>
  <div class="container">
    <van-tabs v-model:active="state.active" sticky swipeable @change="changeTabs">
      <van-tab v-for="item in state.tabsList" :title="item.name" :key="item.id" :name="item.id">
        <div class="list_wrapper">
          <van-pull-refresh :style="{height: !state.list.length ? '95vh' : ''}" v-model="refreshing"
                            @refresh="onRefresh">

            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
              <div class="list_wrapper_item" v-for="item in state.list">
                <!--                <div class="list_wrapper_item_header">-->
                <!--                  <div class="left">-->
                <!--                    <div class="title">{{ item.device?.name }}</div>-->
                <!--                    <div class="tag">工单</div>-->
                <!--                  </div>-->
                <!--                  <div class="right">-->
                <!--                    <div class="title">{{ item.archiveStatusName }}</div>-->
                <!--                  </div>-->
                <!--                </div>-->
                <div class="list_wrapper_item_content">
                  <div class="row">
                    <div class="title">时间：</div>
                    <div>{{ formatTime(item.time, curJSON.timeDimension) }}</div>
                  </div>
                  <template v-for="col in state.cols">
<!--                    <div class="row" v-if="col.prop in curJSON">-->
<!--                      <div class="title">{{ col.label }}：</div>-->
<!--                      <div>{{ item[col.prop] }}</div>-->
<!--                    </div>-->
                    <div class="row" v-if="curJSON.reportFields.includes(col.prop)">
                      <div class="title">{{ col.label }}：</div>
                      <div>{{ item[col.prop] }}</div>
                    </div>
                    <div class="row" v-if="curJSON.fieldInfos.map(v=> v.value).includes(col.value)">
                      <div class="title">{{ col.label }}：</div>
                      <div>{{ item[col.prop] }}</div>
                    </div>
                  </template>

                </div>
                <!--                <div class="list_wrapper_item_footer">-->
                <!--                  <div class="buttons">-->
                <!--                    <van-space>-->
                <!--                      <div class="button edit" @click="handleEdit(item)">修改</div>-->
                <!--                      <div class="button delete" @click="handleDelete(item)">删除</div>-->
                <!--                    </van-space>-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
            </van-list>

          </van-pull-refresh>

        </div>
      </van-tab>
    </van-tabs>


  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import * as weightDeviceDataReportApi from '@/api/weightDeviceDataReport.js'
import * as weightDeviceDataApi from '@/api/weightDeviceData'
import {useRouter} from "vue-router";
import {formatDate} from "@/utils/date.js";
import dayjs from "dayjs";

const router = useRouter();

const queryFormRef = ref(null)

const pageAttrs = reactive({
  pageSize: 20,
  currentPage: 1,
  totalCount: 0
});
const showTop = ref(false);
const loading = ref(false);
const refreshing = ref(false);
const finished = ref(false);
const offset = ref({x: -10, y: 500});

const state = reactive({
  tabsList: [],
  active: '',
  list: [],

  cols: [
    {prop: 'plateNo', label: '车牌号',},
    {prop: 'sendOrganization', label: '发货单位',},
    {prop: 'receiveOrganization', label: '收货单位',},
    {prop: 'goods', label: '货名',},
    {prop: 'specification', label: '规格',},
    {prop: 'mzUser', label: '毛重司磅员',},
    {prop: 'pzUser', label: '皮重司磅员',},
    {prop: 'weighType', label: '过磅类型',},
    {prop: 'idcount', label: '数量',value:'id_count'},
  ]
})
const getReportList = async () => {
  let {data} = await weightDeviceDataReportApi.list({
    currentPage: 0,
    pageSize: 99999,
  })
  state.tabsList = data
}

async function getList() {
  let cur = state.tabsList.find(v => v.id === state.active) || {};
  let params = {
    pageSize: pageAttrs.pageSize,
    pageNo: pageAttrs.currentPage - 1,
  };
  if (cur.jsonConfig) {
    let config = JSON.parse(cur.jsonConfig) || {}
    console.log(config)
    if (Array.isArray(config.daterange)) {
      let range = format_time(config.timeDimension, config.daterange)
      range?.[0] && (params.startTime = range[0]);
      range?.[1] && (params.endTime = range[1]);
    }
    params = {...params, ...config};
  }
  delete params.daterange

  let res = await weightDeviceDataApi.report(params);
  if (pageAttrs.currentPage == 1 && !res.data.length) {
    state.list = [];
  }
  if (refreshing.value) {
    state.list = res.data;
    refreshing.value = false;
  } else {
    state.list.push(...res.data);
  }
  pageAttrs.totalCount = res.totalCount
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  pageAttrs.currentPage = 1;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
}


const onLoad = async () => {
  await getList();
  pageAttrs.currentPage++;


  loading.value = false;
  if (state.list.length === pageAttrs.totalCount) {
    finished.value = true;
  }


}
const currentTab = computed(() => {
  return state.tabsList.find(v => v.id === state.active);
});
const curJSON = computed(() => {
  return JSON.parse(state.tabsList.find(v => v.id === state.active).jsonConfig)
})
const changeTabs = async (e) => {
  state.list = [];
  onRefresh();
}
const formatTime = (time, timeDimension) => {
  let c = {
    'year': 'YYYY',
    'month': 'YYYY-MM',
    'day': 'YYYY-MM-DD',
    'hour': 'YYYY-MM-DD HH:mm:ss'
  }
  return formatDate(time, c[timeDimension])
};

const format_time = (type, date = [dayjs(), dayjs()]) => {
  let range = [];
  switch (type) {

    case 'month':
      range = [
        formatDate(date[0], 'YYYY-MM-01 00:00:00'),
        formatDate(date[1], `YYYY-MM-${dayjs(date[1]).daysInMonth()} 23:59:59`),
      ];
      break;
    case 'year':
      range = [
        formatDate(date[0], 'YYYY-01-01 00:00:00'),
        formatDate(date[1], 'YYYY-12-31 23:59:59'),
      ];
      break;
    default:
      range = [
        formatDate(date[0], 'YYYY-MM-DD 00:00:00'),
        formatDate(date[1], 'YYYY-MM-DD 23:59:59'),
      ];

  }

  return range;
}

const getFieldInfos = () => {
  let code1 = [
    {prop: 'mz', label: '毛重'},
    {prop: 'pz', label: '皮重'},
    {prop: 'jz', label: '净重'},
    {prop: 'kz', label: '扣重'},
    {prop: 'sz', label: '实重'}
  ];
  let code2 = [
    {prop: 'sum', label: '合计'},
    {prop: 'avg', label: '平均值'},
    {prop: 'max', label: '最大值'},
    {prop: 'min', label: '最小值'}];

  let code3 = [];
  code1.forEach(v => code2.forEach(y => {
    code3.push({prop: v.prop + y.prop, label: v.label + y.label, value: v.prop + '_' + y.prop});
  }))
  state.cols = [...state.cols, ...code3];
  console.log(state.cols)
}


onMounted(() => {
  getFieldInfos();
  getReportList();
})

</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  background-color: #f8f8f8;
}

.list_wrapper {
  &_item {
    margin: 10px 10px;
    padding: 10px 10px;
    background-color: #FFF;
    border-radius: 8px;

    &_header {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      font-weight: 600;

      .left {
        display: flex;

        .title {
          margin-right: 5px;
        }

        .tag {
          border: 1px solid #1eccda;
          color: #1eccda;
          border-radius: 4px;
          font-size: 12px;
          padding: 2px;
        }
      }

    }

    &_content {
      .row {
        padding: 3px 0;
        display: flex;
        align-items: center;

        .title {
          font-weight: 800;
          font-size: 16px;
        }
      }
    }
  }
}
</style>