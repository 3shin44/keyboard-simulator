<template>
  <div class="p-2">
    <h2>Keyboard Simulator</h2>
    <div class="version-tag">{{ $store.state.vxMainVersion }}</div>
    <div
      class="d-flex justify-content-center full-screen-loading"
      v-if="$store.state.vxIsExecuting"
    >
      <div class="spinner-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, idx) in tabList"
        :key="idx"
        :label="item.label"
        :name="item.name"
      >
        <component :is="item.componentName"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PowershellPanel from './components/PowershellPanel.vue'
import MultiLine from './components/MultiLine.vue'
import SettingCfg from './components/SettingCfg.vue'

import axios from '@/js/apiBuilder'

export default {
  name: 'App',
  components: {
    PowershellPanel,
    MultiLine,
    SettingCfg
  },
  data() {
    return {
      activeName: null,
      tabList: [
        {
          label: '一般模式',
          name: 'normalInput',
          componentName: 'PowershellPanel'
        },
        {
          label: '分行模式',
          name: 'multiLine',
          componentName: 'MultiLine'
        },
        {
          label: '設定',
          name: 'setting',
          componentName: 'SettingCfg'
        }
      ]
    }
  },
  methods: {
    initActive() {
      if (this.tabList.length > 0) {
        this.activeName = this.tabList[0].name
      }
    },
    async getVersion() {
      const { data } = await axios.get('http://localhost:9527/version')
      if (data && data.version) {
        this.$store.commit('updateVersion', data.version)
      }
    }
  },
  created() {
    this.initActive()
    this.getVersion()
  }
}
</script>

<style scoped>
.full-screen-loading {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.1);
}
.spinner-container {
  position: absolute;
  top: 50px;
}
.version-tag {
  position: absolute;
  top: 5px;
  right: 5px;
  color: grey;
  font-size: 12px;
  z-index: 1;
}
</style>
