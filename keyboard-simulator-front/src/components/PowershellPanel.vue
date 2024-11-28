<template>
  <div class="powershell-panel p-1">
    <div class="input-group mb-3">
      <textarea
        class="form-control"
        placeholder="Text to simulate"
        v-model="inputText"
      ></textarea>
    </div>
    <div class="row justify-content-around">
      <div class="col-4 d-flex">
        <label for="delaySec" class="col-sm-8 col-form-label"
          >Delay (second)</label
        >
        <input
          type="number"
          min="0"
          class="form-control"
          id="delaySec"
          v-model="psParams.delay"
        />
      </div>
      <div class="col-4">
        <button class="btn btn-primary" @click="sendPSrequest">EXECUTE</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/js/apiBuilder'
import util from '@/js/util'

export default {
  name: 'PowershellPanel',
  props: {},
  data() {
    return {
      // 要複製的文字
      inputText: '',
      // PS指令可傳入的參數, 如果有就一個一個產生成陣列
      psParams: {
        delay: 5
      }
    }
  },
  methods: {
    // 取得版本號
    async getVersion() {
      const { data } = await axios.get('http://localhost:9527/version')
    },
    // 送出請求 (要從後端執行PowerShell)
    async sendPSrequest() {
      try {
        this.$store.commit('updateExecuteState', true)
        await navigator.clipboard.writeText(this.inputText)
        console.log(this.inputText)
        console.log(this.generateParam())
        await axios.post(
          'http://localhost:9527/runScript',
          this.generateParam()
        )
      } catch (error) {
        console.log('API: runScript error. ', error)
      } finally {
        this.$store.commit('updateExecuteState', false)
      }
    },
    generateParam() {
      return util.generateParam(this.psParams)
    }
  },
  created() {}
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
