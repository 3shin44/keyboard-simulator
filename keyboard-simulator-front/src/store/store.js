import { createStore } from 'vuex'
// Create a new store instance.
const store = createStore({
  state() {
    return {
      vxIsExecuting: false
    }
  },
  mutations: {
    updateExecuteState(state, flag) {
      state.vxIsExecuting = flag
    }
  }
})

export default store
