<template>
  <div class="multi-line p-1">
    <MultiInput class="mb-2" ref="multiInputDOM" />

    <div class="row justify-content-around mt-3">
      <div class="col-4 d-flex">
        <label for="multiDelaySec" class="col-sm-8 col-form-label"
          >Delay (second)</label
        >
        <input
          type="number"
          min="0"
          class="form-control"
          id="multiDelaySec"
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
import MultiInput from '@/components/MultiLineComponent/MultiInput.vue'

import axios from '@/js/apiBuilder'
import util from '@/js/util'

export default {
  name: 'MultiLine',
  components: { MultiInput },
  data() {
    return {
      // PS指令可傳入的參數, 如果有就一個一個產生成陣列
      psParams: {
        delay: 5,
        raw: true
      }
    }
  },
  methods: {
    // 送出請求 (要從後端執行PowerShell)
    async sendPSrequest() {
      try {
        this.$store.commit('updateExecuteState', true)
        await navigator.clipboard.writeText(this.generateString())
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

    // 產生換行字串指令
    generateString() {
      let tabSyntax = '{TAB}'

      let getValues = this.$refs.multiInputDOM.inputList.map(
        (element) => element.value
      )

      return getValues.join(tabSyntax)
    },
    // 產生指令參數
    generateParam() {
      return util.generateParam(this.psParams)
    }
  },
  created() {}
}
</script>

<style></style>
