<template>
  <!-- Informations -->

  <div class="mt-1">
    <div class="card card-body">
      <div class="row">
        <div class="mb-3">
          <label for="filePath" class="form-label"
            >PowerShell File (Auto save to localStorage)</label
          >
          <input
            class="form-control"
            type="text"
            id="filePath"
            v-model="psParamsPath"
          />
        </div>
      </div>
      This tool is based on article:
      <a href="https://blog.darkthread.net/blog/ps-paste-as-keystrokes/"
        >PowerShell 小工具 - 將複製文字轉為鍵盤輸入</a
      >
    </div>
  </div>
</template>

<script>
import util from '@/js/util'

export default {
  name: 'SettingCfg',
  components: {},
  data() {
    return {
      psParamsPath: ''
    }
  },
  methods: {
    // 檢查檔案路徑是否設定過
    checkFilePath() {
      util.filePath = window.localStorage.getItem('psFilePath') || ''
    }
  },
  watch: {
    psParamsPath: {
      handler(newValue) {
        window.localStorage.setItem('psFilePath', newValue)
        util.filePath = newValue
        console.log(util.filePath)
      },
      deep: true
    }
  },
  created() {
    this.checkFilePath()
  }
}
</script>

<style></style>
