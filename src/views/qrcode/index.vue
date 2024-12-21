<template>
  <div class="scanCode">
    <div class="container1">
      <div class="qrcode">
        <div id="reader"></div>
      </div>
    </div>
    <div class="btn">
      <div class="left-back">
        <van-icon name="arrow-left" @click="close"/>
      </div>
      <div class="left-back">

        <van-icon name="arrow-down" @click="stop"/>
      </div>
      <div class="left-back">
        <van-icon name="arrow-up" @click="start"/>
      </div>
      <div class="right-file">
        <!--          <van-uploader v-model="fileList" :preview-image="false" :after-read="dealSelectFiles">-->
        <!--            <van-icon name="photo-o"/>-->
        <!--          </van-uploader>-->
      </div>
    </div>
  </div>

</template>
<script setup>
import {reactive, ref} from 'vue'
import {defineComponent, toRefs, onMounted, onUnmounted} from 'vue'
import {Html5Qrcode} from 'html5-qrcode'
import {showLoadingToast, showToast} from 'vant'
import emitter from "@/utils/mitt.js";

const popupRef = ref(null);
const props = defineProps({});
const emits = defineEmits(['update:show', 'close', 'scanResult'])


const state = reactive({
  html5QrCode: null,
  fileList: [],
});

const close = () => {
  emits('update:show', false);
  emits('close');

  emitter.emit('scan','12321')

}

const start = () => {
  state.html5QrCode?.start(
      {facingMode: 'environment'},
      {
        fps: 1,
        qrbox: {width: 250, height: 250}
      },
      (decodedText, decodedResult) => {
        emits('scanResult', {
          text: decodedText,
          stop,
          start,
        })
      }
  )
      .catch((err) => {
        console.log('扫码错误信息', err)
        let msg = ''
        // 错误信息处理仅供参考，具体描述自定义
        if (typeof err == 'string') {
          msg = '二维码识别失败！'
        } else {
          if (err.name == 'NotAllowedError') {
            msg = '您需要授予相机访问权限！'
          }
          if (err.name == 'NotFoundError') {
            msg = '这个设备上没有摄像头！'
          }
          if (err.name == 'NotSupportedError') {
            msg = '摄像头访问只支持在安全的上下文中，如https或localhost！'
          }
          if (err.name == 'NotReadableError') {
            msg = '相机被占用！'
          }
          if (err.name == 'OverconstrainedError') {
            msg = '安装摄像头不合适！'
          }
          if (err.name == 'StreamApiNotSupportedError') {
            msg = '此浏览器不支持流API！'
          }
        }
        showToast(msg);
      })
}
const getCameras = () => {
  let toast = showLoadingToast({
    duration: 0,
    message: '加载中...'
  })
  Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          state.html5QrCode = new Html5Qrcode('reader')
          start()
        }
      })
      .catch((err) => {

        showToast({
          message: '摄像头无访问权限！',
          duration: 3000
        })

      }).finally(() => {
    toast.close()
  });
};
const stop = () => {
  state.html5QrCode?.stop()
      .then((ignore) => {
        console.log('停止扫码', ignore)
      })
      .catch((err) => {
        console.log(err)
        showToast('停止扫码失败')
      })
}
const dealSelectFiles = () => {
  try {
    window.qrcode.callback = (result) => {
      showToast('成功了，结果是：' + result)
    }
    // get select files.
    let file = state.fileList[0].file
    var reader = new FileReader()
    reader.onload = (function () {
      return function (e) {
        window.qrcode.decode(e.target.result)
      }
    })(file)
    reader.readAsDataURL(file)
  } catch (error) {
    showToast({
      message: '图片识别失败！',
      duration: 3000
    })
  }
}


// 监听页面显示
function onVisibilityChange() {
  if (document.visibilityState === 'visible') {
    // 在这里执行页面显示时的逻辑
    start();
  } else if (document.visibilityState === 'hidden') {
    stop();
    // 在这里执行页面隐藏时的逻辑
  }
}

// 添加事件监听器


onMounted(() => {
  getCameras();
  document.addEventListener('visibilitychange', onVisibilityChange, false);

})
onUnmounted(() => {
  //扫描设备是否在运行
  if (state.html5QrCode?.isScanning) {
    stop()
  }
  document.removeEventListener('visibilitychange', onVisibilityChange, false);
})


</script>
<style lang="scss" scoped>
.scanCode {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0);
}

.container1 {
  height: 90vh;
  position: relative;
  width: 100%;
}

.qrcode {
  width: 100%;
  height: 100%;
}

#reader {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.btn {
  flex: 1;
  padding: 3vw;
  display: flex;
  justify-content: space-around;
  color: #fff;
  font-size: 8vw;
  align-items: flex-start;
}
</style>
