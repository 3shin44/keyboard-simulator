import { createStore } from 'vuex'
// Create a new store instance.
const store = createStore({
  state() {
    return {
      vxMainVersion: 'version unavailable',
      vxIsExecuting: false
    }
  },
  mutations: {
    updateVersion(state, version) {
      state.vxMainVersion = version
    },
    updateExecuteState(state, flag) {
      state.vxIsExecuting = flag
    }
  }
})

export default store
