<template>
  <!--  <div class="container page_container">-->

  <!--   -->

  <!--  </div>-->

  <div class="wrapper_container">
    <van-sidebar v-model="active" @change="handleChange">
      <van-sidebar-item v-for="item in leftMenuList" :title="item.name"/>

    </van-sidebar>
    <div class="right_box" style="overflow: auto; height: 100vh; width: 100%; background-color: #f7f8fa">
      <div id="right">
        <div v-for="(item,index) in rightList" :ref="itemRefs.set" class="row_wrapper wrapper"
             :class="`wrapper_${index}`">
          <div class="title">{{ item.title }}</div>
          <div class="item_wrapper">
            <div v-for="item1 in item.items" class="item" v-permission="item1.permission"
                 @click="$router.push(item1.url)">
              <div class="img">
                <img v-if="item1.imgSrc" :src="item1.imgSrc" alt="">
                <component v-else :is="item1.icon"></component>
              </div>
              <div class="text">{{ item1.title }}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import Shebei from "@/assets/image/shebei.vue";
import Gongdan from '@/assets/image/gondan.vue'
import Huayan from '@/assets/image/huayan.vue'
import PdcSssj from '@/assets/image/pdc_sssj.vue'
import Daozha from "../../assets/image/daozha.vue";
import Bangfang from "@/assets/image/bangfang.vue";
import Chaobiao from "@/assets/image/chaobiao.vue";
import {nextTick, onMounted, reactive, ref, shallowRef} from "vue";
import {useUserStore} from "@/store/user.js";
import {useTemplateRefsList} from '@vueuse/core'

document.title = '工作台'

const itemRefs = useTemplateRefsList();
const active = ref(0);
const userStore = useUserStore();


const elTopsMap = new Map();
let elTopsArr = [];

const handleChange = (i) => {

  let els = document.querySelectorAll('.row_wrapper');
  let wrapper = document.querySelector('.right_box');
  wrapper.scrollTop = els[i].offsetTop;


};

const rightList = ref([
  {
    title: '化验',
    items: [{
      title: '化验数据',
      permission: '/coalanalysis/coalanalysisList',
      url: '/coalanalysis',
      icon: shallowRef(Huayan)
    }]
  },
  {
    title: '生产',
    items: [{
      title: '生产报表',
      permission: '/prod/coalWashingDailyAnalysis',
      url: '/prod/coalWashingDailyAnalysis',
      icon: shallowRef(Huayan)
    }]
  },
  {
    title: '订单',
    items: [{
      title: '采购订单',
      permission: '/order/purchaseOrder',
      url: '/order/purchaseOrder',
      imgSrc: '../../src/assets/image/cgdingdan.png',

    }, {
      title: '销售订单',
      permission: '/order/saleOrder',
      url: '/order/saleOrder',
      imgSrc: '../../src/assets/image/xsdingdan.png',
    }]
  },
  {
    title: '库房',
    items: [
      {
        title: '库存查询',
        permission: '/pdc/realTimeData',
        url: '/warehouse/warehouseGoodsSummary',
        icon: shallowRef(PdcSssj)
      },
      {
        title: '商品管理',
        permission: '/pdc/realTimeData',
        url: '/warehouse/warehouseGoods',
        icon: shallowRef(PdcSssj)
      },
      {
        title: '单据查询',
        permission: '/pdc/realTimeData',
        url: '/warehouse/warehouseReceipt',
        icon: shallowRef(PdcSssj)
      }
    ]
  },

  {
    title: '水电表',
    items: [{
      title: '抄表记录',
      permission: '/meter/meterLog',
      url: '/meter/meterLog',
      icon: shallowRef(Chaobiao)
    }]
  },
  {
    title: '设备',
    items: [
      {
        title: '设备管理',
        permission: '/device/device',
        url: '/device',
        icon: shallowRef(Shebei)
      }, {
        title: '设备工单',
        permission: '/device/workOrder',
        url: '/device/workOrder',
        icon: shallowRef(Gongdan)
      }]
  },
  {
    title: '门禁道闸',
    items: [{
      title: '道闸数据',
      permission: '/accessgate/data',
      url: '/accessgate/data',
      icon: shallowRef(Daozha)
    }, {
      title: '车辆预约',
      permission: '/accessgate/appointment',
      url: '/accessgate/appointment',
      icon: shallowRef(Huayan)
    }]
  },
  {
    title: '磅房',
    items: [{
      title: '磅房数据',
      permission: '/weight/data',
      url: '/weight/data',
      icon: shallowRef(Bangfang)
    }]
  },
  {
    title: '皮带秤',
    items: [{
      title: '实时数据',
      permission: '/pdc/realTimeData',
      url: '/pdc/realTimeData',
      icon: shallowRef(PdcSssj)
    }]
  },

]);

let hasMenu = ['/prod', '/coalanalysis', '/pdc', '/weight', '/order', '/device', '/accessgate', '/meter', '/warehouse'];
const leftMenuList = ref(userStore.menuList.filter(v => !v.parent).filter(v => hasMenu.includes(v.url)).sort((a, b) => a.sortKey - b.sortKey).map(v => {
  let name = v.name;
  if (name.endsWith('管理')) {
    name = name.replace('管理', '');
  }
  return {
    ...v,
    name,

  };
}));

onMounted(() => {
  let wrapper = document.querySelector('.right_box');
  wrapper.addEventListener('scroll', (e) => {

    let scrollTop = e.target.scrollTop;
    let target = scrollTop;

    // 计算每个元素与目标值的差的绝对值
    let differences = elTopsArr.map(num => Math.abs(num - target));

// 找到最小的差值
    let minDifference = Math.min(...differences);

// 确定具有最小差值的数组元素的索引
    let closestIndex = differences.indexOf(minDifference);

// 获取最近的值
    let closestValue = elTopsArr[closestIndex];
    active.value = elTopsMap.get(closestValue);

  });

  nextTick(() => {
    let els = document.querySelectorAll('.row_wrapper');
    els.forEach((v, i) => {
      let rect = v.getBoundingClientRect();
      let height = rect.top;
      elTopsMap.set(Number.parseInt(height), i);
    });
    elTopsArr = [...elTopsMap.keys()];
  })

});
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 10px 15px 20px;
  background-color: #f8f8f8;
  overflow: auto;
}

.wrapper {
  background-color: #fff;
  padding: 10px 0 15px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-left: 15px;
}

.item_wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-row-gap: 15px;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }

  .img {
    width: 30px;
    height: 30px;

    svg {
      height: 100%;
      width: 100%;

    }
  }

  .text {
    margin-top: 10px;
    font-size: 14px;
  }
}

.wrapper_container {
  height: 100vh;
  display: flex;

}

#right {
  height: 200vh;
}

.van-sidebar {
  width: 120px;
}
</style>
