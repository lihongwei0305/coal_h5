<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="getIncludes">
      <component :is="Component"/>
    </keep-alive>
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


<style scoped>


</style>
