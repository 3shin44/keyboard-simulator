<template>
  <div class="powershell-panel p-3">
    <div class="title position-relative">
      <h2>Keyboard Simulator</h2>
      <div class="spinner-container" v-if="isLoading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div class="input-group mb-3">
      <textarea class="form-control" placeholder="Text to simulate" v-model="inputText" :disabled="isLoading"></textarea>
    </div>
    <div class="row justify-content-around">
      <div class="col-4 d-flex">
        <label for="delaySec" class="col-sm-8 col-form-label">Delay (second)</label>
        <input type="number" min="0" class="form-control" id="delaySec" :disabled="isLoading" v-model="psParams.delay">
      </div>
      <div class="col-4"><button class="btn btn-primary" :disabled="isLoading" @click="sendPSrequest">EXECUTE</button>
      </div>
    </div>

    <!-- Informations -->
    <div class="more-info mt-3">
      <button type="button" class="btn btn-outline-info" data-bs-toggle="collapse"
        data-bs-target="#collapseTab">INFO</button>

      <div class="collapse mt-1" id="collapseTab">
        <div class="card card-body">
          <div class="row">
            <div class="mb-3">
              <label for="filePath" class="form-label">PowerShell File (Auto save to localStorage)</label>
              <input class="form-control" type="text" id="filePath" v-model="psParams.path">
            </div>
          </div>
          This tool is based on article:
          <a href="https://blog.darkthread.net/blog/ps-paste-as-keystrokes/">PowerShell 小工具 - 將複製文字轉為鍵盤輸入</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from '@/js/apiBuilder'
export default {
  name: 'PowershellPanel',
  props: {

  },
  data() {
    return {
      // 打API時鎖定
      isLoading: false,
      // 要複製的文字
      inputText: "",
      // PS指令可傳入的參數, 如果有就一個一個產生成陣列
      psParams: {
        path: "",
        delay: 5
      }
    }
  },
  methods: {
    // 取得版本號
    async getVersion() {
      const { data } = await axios.get("http://localhost:9527/version")
      console.log(data)
    },
    // 送出請求 (要從後端執行PowerShell)
    async sendPSrequest() {
      try {
        this.isLoading = true
        await navigator.clipboard.writeText(this.inputText)
        await axios.post('http://localhost:9527/runScript', this.generateParam())
      } catch (error) {
        console.log("API: runScript error. ", error)
      } finally {
        this.isLoading = false
      }
    },
    // 組成指令陣列
    generateParam() {
      let cmdArray = []

      for (const [key, value] of Object.entries(this.psParams)) {
        switch (key) {
          // 一定要加在第一個
          case "path":
            cmdArray.unshift(value)
            break;

          // 延遲
          case "delay":
            cmdArray.push(`-Delay ${value}`)
            break;

          default:
            break;
        }
      }
      return cmdArray
    },
    // 檢查檔案路徑是否設定過
    checkFilePath() {
      let filePath = window.localStorage.getItem("psFilePath") || ""
      this.psParams.path = filePath
    }
  },
  watch: {
    psParams: {
      handler(newValue) {
        window.localStorage.setItem("psFilePath", newValue.path)
      },
      deep: true
    }
  },
  created() {
    this.checkFilePath()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  --> 
<style scoped>
.spinner-container {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
