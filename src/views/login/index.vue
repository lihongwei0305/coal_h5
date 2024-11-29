<template>
  <div class="container">
    <div class="header">
      欢迎登录
    </div>
    <van-form>
      <van-cell-group inset>
        <van-field
            v-model="state.form.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
        />
        <van-field
            v-model="state.form.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
        />
        <div style="display: flex">
          <van-field
              v-model="state.form.captcha"
              name="验证码"
              label="验证码"
              placeholder="验证码"
              type="tel"
          />
          <img @click="genCaptcha" style="width: 110px;height: 40px" :src="state.captcha.base64">
        </div>
      </van-cell-group>
      <div class="m-16px">
        <van-button round block type="primary"  @click="login">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import * as loginApi from "@/api/login.js";
import {useUserStore} from "@/store/user.js";
import {useRouter} from "vue-router";
import {closeToast, showFailToast, showLoadingToast} from "vant";


document.title = '登录';

const router = useRouter()
const userStore = useUserStore()
const state = reactive({
  form: {
    username: '',
    password: '',
    captchaId: '',
    captcha: '',
  },
  captcha: {},
  loading: {
    img: false,
    loginBtn: false
  },
})

onMounted(() => {
  if (!import.meta.env.PROD) {
    state.form.username = 'adminuser'
    state.form.password = 'abc@123'
  }
  genCaptcha()
  document.title = '管理系统';

})
const genCaptcha = async () => {
  if (state.loading.img) {
    return;
  }
  state.loading.img = true;
  let {data} = await loginApi.genCaptcha().finally(() => state.loading.img = false)
  state.captcha = data;
}

const login = async (e) => {
  e.preventDefault();
  if (!state.form.username) {
    return  showFailToast('请输入用户名');
  }
  if (!state.form.password) {
    return  showFailToast('请输入密码');
  }
  // if (!state.form.captcha) {
  //   return  showFailToast('请输入验证码');
  // }
  let toast =  showLoadingToast({
    message: '登录中...',
    forbidClick: true,
    loadingType: 'spinner',
  });
  await userStore.login({
    ...state.form,
    captchaId: state.captcha.id
  }).finally(() => closeToast())

  await router.push('/')

}


</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
  background-color: #FFF;
}

.header {
  padding: 60px;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 5px;
}

</style>
