<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition name="go">
          <keep-alive :include="getIncludes">
            <component :is="Component" :key="$route.meta.key"></component>
          </keep-alive>
      </transition>
    </template>
  </router-view>

  <template v-if="show">
    <van-tabbar v-model="active" route>
      <!--      <van-tabbar-item replace to="/" name="home" icon="home-o">首页</van-tabbar-item>-->
      <van-tabbar-item replace to="/workbench" name="workbench" icon="apps-o">工作台</van-tabbar-item>
      <van-tabbar-item replace to="/my" name="my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </template>
</template>
<script setup>
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import {useKeepAlive} from '@/store/keepAlive.js';
import {useTabbar} from '@/store/useTabbar.js'
import {useRouter, useRoute} from 'vue-router'

const router = useRouter();
const route = ref({});

import VConsole from "vconsole";


const vConsole = new VConsole();

const {getIncludes} = useKeepAlive();


const tabbar = useTabbar();
const {active} = tabbar;
let show = ref(true);
tabbar.$subscribe((mutation, state) => {
  show.value = state.show;
  if (state.show) {
    document.querySelector('.page_container')?.removeEventListener('scroll', handleScroll)
    setTimeout(() => {
      let el = document.querySelector('.page_container');
      let tabbar = document.querySelector('.van-tabbar');
      let height = tabbar?.getBoundingClientRect()?.height;
      // el.style.paddingBottom = `${height}px`
      if (el) {
        el.style.height = `calc(100vh - ${height + 'px'})`;

        el?.addEventListener('scroll', handleScroll);
      }

    }, 300);
  }
})

const handleScroll = () => {
  let scrollTop = window.pageXOffset || document.querySelector('.page_container').scrollTop;
  if (scrollTop <= 0) {
    window.scrollTo(0, 1);
  }
  let windowHeight = window.innerHeight;
  let docHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= docHeight) {
    window.scrollTo(0, docHeight - windowHeight - 1);
  }
}

let state = reactive({
  size: {}
})


onMounted(() => {
  nextTick(() => {

  })

});
</script>


<style scoped lang="scss">
//页面最终/最初的状态：屏幕正中间
.go-enter-to,
.go-leave-from {
  //transform: translate3d(0, 0, 0);
  opacity: 1;
}

//动画持续时间
.go-enter-active,
.go-leave-active {
  transition: all 0.1s;
}

//离去动画，表示离去页面最终的css：屏幕左侧
.go-leave-to {
  //transform: translate3d(-100%, 0, 0);
  opacity: 0;
}

//进入动画，表示进入页面，初始的状态：屏幕右侧
.go-enter-from {
  opacity: 1;
  //transform: translate3d(100%, 0, 0);
}


</style>
