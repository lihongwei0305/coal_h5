<template>
  <Navbar title='实时数据' :is-popover="false" @shaixuan="showTop = true"></Navbar>
  <div>
    <van-tabs v-model:active="state.groupActive" shrink>
      <van-tab v-for="item in state.treeData" :title="item.name" :key="item.id" :name="item.code"></van-tab>
    </van-tabs>
    <van-tabs v-model:active="state.dataActive" swipeable>
      <van-tab title="数据" name="data">
        <div v-if="state.list.length" class="box_wrapper">

          <div v-for="item in state.list" class="box_wrapper_item">
            <div class="title">{{ item.deviceName }}</div>
            <div class="row">
              <div class="label">总累计量</div>
              <div class="content"> {{ item.totalData }}</div>
              <div class="unit">t</div>
            </div>
            <div class="row">
              <div class="label">日累计量</div>
              <div class="content">{{ item.dayData }}</div>
              <div class="unit">t</div>
            </div>
            <div class="row">
              <div class="label">班累计量</div>
              <div class="content">{{ item.classData }}</div>
              <div class="unit">t</div>
            </div>
            <div class="row">
              <div class="label">瞬时流量</div>
              <div class="content">{{ item.flowData }}</div>
              <div class="unit">t/h</div>
            </div>
            <div class="row">
              <div class="label">运行状态</div>
              <div class="content">{{ item.faultInfo }}</div>
              <div class="unit"></div>
            </div>
            <div class="row">
              <div class="label">产量</div>
              <div class="content">{{ item.timeTotal }}</div>
              <div class="unit">t</div>
            </div>
            <div class="row">
              <div class="label">回收</div>
              <div class="content">{{ item.timePercent }}</div>
              <div class="unit">%</div>
            </div>

          </div>
        </div>
        <div v-else style="height:400rem; display: flex; justify-content: center; align-items: center">暂无数据</div>
      </van-tab>
      <van-tab title="图表" name="chart">

        <div v-if="Object.keys(state.echartsList).length" style="padding: 20rem 0 50rem 0">
          <div style="padding: 20rem; margin-bottom: 50rem; background-color: #fafafa">
            <echarts style="height: 380px" :options="state.echartsOptions_cl"></echarts>
          </div>

          <div style="padding: 20rem;background-color: #fafafa">
            <echarts style="height: 380px" :options="state.echartsOptions_hc"></echarts>
          </div>
        </div>

        <div v-else style="height:400rem; display: flex; justify-content: center; align-items: center">暂无数据</div>
      </van-tab>

    </van-tabs>


  </div>
  <Query ref="queryFormRef" v-model:show="showTop" @queryConfirm="queryConfirm"></Query>
  <van-floating-bubble v-model:offset="offset" @click="handleRefresh">
    <template #default>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M11.995 4a8 8 0 1 0 7.735 10h-2.081a6 6 0 1 1-5.654-8a5.92 5.92 0 0 1 4.223 1.78L13 11h7V4l-2.351 2.35A7.965 7.965 0 0 0 11.995 4Z"/>
        </svg>
      </div>
    </template>
  </van-floating-bubble>


</template>

<script setup>
import {tree} from '@/api/dictionary'
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import * as Api from '@/api/pdcDeviceRealTimeData.js';
import * as pdcDeviceDataApi from "@/api/pdcDeviceData.js";
import {groupBy} from "lodash-es";
import Echarts from "@/components/Echarts.vue";
import dayjs from "dayjs";
import Query from "@/views/pdc/components/realTimeDataQuery.vue";
import {showDialog} from "vant";
import {useRouter} from "vue-router";
import Navbar from "@/components/NavBar/navbar.vue";

const router = useRouter();
document.title = '皮带秤';

const queryFormRef = ref(null);

const offset = ref({x: -200, y: 700});
const showTop = ref(false);
const getTree = async () => {
  let {data} = await tree({
    code: 'pdcDeviceGroupDict'
  })
  state.treeData = data.tree;

  if (!state.treeData.length) {
    return showDialog({
          title: '提示',
          message: `检测到没有设备分组信息，请先去设备管理添加！`,
        }.then(() => {
          router.go(-1);
        })
    )
  }
  state.groupActive = data.tree[0].name;
}
getTree();


const getData = async () => {
  state.list = [];
  let {data} = await Api.getRealTimeReport({
    deviceGroup: state.groupActive,
    ...queryFormRef.value.getItems()
    // endTime: "2024-05-23 23:59:59",
    // startTime: "2023-04-23 00:00:00"
  }).finally();
  state.list = [...data];
}
const getReport = async () => {
  state.echartsList = [];
  let {data} = await pdcDeviceDataApi.getReport({
        deviceGroup: state.groupActive,
        ...queryFormRef.value.getItems()

        // endTime: "2024-05-23 23:59:59",
        // startTime: "2023-04-23 00:00:00"
      }
  );
  if (!data.length) return;
  state.echartsList = groupBy(data, 'deviceId');

  state.echartsOptions_cl.xAxis.data = state.echartsList[data[0].deviceId].map(v => v.tb);
  state.echartsOptions_cl.series = Object.values(groupBy(data, 'deviceId')).map(v => {
    return {
      type: 'line',
      data: v.map(v => v.diff),
      name: v[0].name

    }

  });

  state.echartsOptions_hc.xAxis.data = state.echartsList[data[0].deviceId].map(v => v.tb);
  state.echartsOptions_hc.series = Object.values(groupBy(data, 'deviceId')).map(v => {
    return {
      type: 'line',
      data: v.map(v => v.percent),
      name: v[0].name
    }

  });

}
const state = reactive({
  treeData: [],
  groupActive: '',
  dataActive: 'data',
  startTimePopupShow: false,
  endTimePopupShow: false,

  list: [],
  echartsList: [],
  echartsOptions_cl: {
    title: {
      text: '产量'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    legend: {},
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [],
    dataZoom: [
      {
        // startValue: '2014-06-01'
      },
      {
        type: 'inside'
      }
    ],
  },
  echartsOptions_hc: {
    title: {
      text: '回收'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    legend: {},
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [],
    dataZoom: [
      {
        // startValue: '2014-06-01'
      },
      {
        type: 'inside'
      }
    ],
  }
})

watch(() => [state.groupActive, state.dataActive], ([k1, k2]) => {
  if (!k1) return;
  getList();
}, {
  immediate: true
});

const queryConfirm = (data) => {
  showTop.value = false;
  getList(data);
}

const getList = () => {
  if (state.dataActive === 'data') {
    getData();
  } else {
    getReport();
  }
}

const handleRefresh = () => {
  state.dataActive === 'data' && getData();
  state.dataActive === 'chart' && getReport();

}

onMounted(() => {

})
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs--card) {
  .van-tabs__track {
    overflow-y: auto;
  }

  .van-tabs__content {
    height: 78vh;

  }
}

.box_wrapper {
  padding: 20px;

  color: white;

  &_item {
    padding: 10px;
    //border: 1px solid #9b9898;
    box-shadow: var(--el-box-shadow-dark);
    //&:not(:first-child) {
    //  margin-left: 15px;
    //}

    background-image: linear-gradient(to top, #076e6e 0%, #511997 100%);
    border-radius: 10px;
    margin-bottom: 15px;

    .title {
      margin-bottom: 10px;
      font-size: 22px;
      font-weight: 700;
    }

    .row {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 500;

      .label {
        width: 90px;
        text-align: justify;
        text-align-last: justify;
      }

      .content {
        width: 120px;
        text-align: left;
        text-wrap: nowrap;
      }

      .unit {
        width: 50px;
      }
    }


  }
}

</style>
