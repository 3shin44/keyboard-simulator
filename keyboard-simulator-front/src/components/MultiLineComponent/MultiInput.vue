<template>
  <div class="mb-3">
    <button class="btn btn-outline-primary" @click="addNewItem">ADD</button>
    <button class="btn btn-outline-primary ms-1" @click="saveItem">SAVE</button>
    <button class="btn btn-outline-primary ms-1" @click="restoreItem">
      RESTORE
    </button>
    <button class="btn btn-outline-primary ms-1" @click="clearItem">
      CLAER
    </button>
  </div>

  <div v-for="(item, idx) in inputList" :key="idx" class="row mb-1">
    <div class="col-1 d-flex justify-content-center align-items-center">
      {{ idx + 1 }}
    </div>
    <div class="col-10">
      <el-input v-model="item.value" />
    </div>
    <div class="col-1 d-flex justify-content-center align-items-center">
      <button
        class="btn btn-outline-secondary btn-sm"
        @click="removeItem(item.id)"
      >
        -
      </button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'MultiInput',
  components: {},
  data() {
    return {
      inputList: []
    }
  },
  methods: {
    // 新增項目
    addNewItem() {
      this.inputList.push({
        id: uuidv4(),
        value: ''
      })
    },
    // 將當前資料紀錄入LS
    saveItem() {
      window.localStorage.setItem(
        'multiLineItem',
        JSON.stringify(this.inputList)
      )
    },
    // 嘗試由LS還原
    restoreItem() {
      let getString = window.localStorage.getItem('multiLineItem')
      this.inputList = JSON.parse(getString)
    },
    // 清除LS紀錄
    clearItem() {
      window.localStorage.removeItem('multiLineItem')
    },
    // 移除點選項目
    removeItem(id) {
      this.inputList = this.inputList.filter((element) => element.id !== id)
    }
  },
  created() {
    this.addNewItem()
  }
}
</script>

<style></style>
