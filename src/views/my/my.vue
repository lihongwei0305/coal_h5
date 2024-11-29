<template>
  <div class="page_container">
    <div class="header">
      <div class="left">
        <div class="head">
          <div>{{userStore.userInfo.name[0]}}</div>
        </div>
       <div style="">
         <div class="font-16">{{ userStore.userInfo.name }}</div>
         <div class="font-14">{{ userStore.userInfo.roles.map(v => v.name).toString() }}</div>
       </div>
      </div>
      <div class="right">
        <div class="font-20" style="font-weight: bold">{{ userStore.userInfo.organizationName }}</div>
      </div>

    </div>



  </div>
</template>

<script setup>
import {useUserStore} from '@/store/user.js'

const userStore = useUserStore();

console.log(userStore.userInfo);
</script>

<style lang="scss" scoped>
.page_container {
  height: 100%;
  background: #f5f5f5;
  .header {
    width: 100%;
    height: 80px;
    background: linear-gradient(90deg, rgba(22, 176, 255, 1) 0%, rgba(0, 108, 255, 1) 100%);
    padding: 20px 10px 0 10px;
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
    .left {
      display: flex;
      .head {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        font-weight: bold;
        width: 45.5px;
        height: 45.5px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .right{

    }
  }
}
</style>