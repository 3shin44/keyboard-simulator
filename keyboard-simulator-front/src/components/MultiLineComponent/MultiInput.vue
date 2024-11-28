<template>
  <div class="mb-3">
    <button class="btn btn-outline-primary btn-sm" @click="addNewItem">ADD<br>new item</button>
    <button class="btn btn-outline-primary btn-sm ms-1" @click="saveItem">SAVE<br>to localStorage</button>
    <button class="btn btn-outline-primary btn-sm ms-1" @click="restoreItem">
      RESTORE<br>from localStorage
    </button>
    <button class="btn btn-outline-primary btn-sm ms-1" @click="clearItem">
      CLAER<br>localStorage
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
      let recordNotExisted = true
      let getString = window.localStorage.getItem('multiLineItem')
      if(getString){
        this.inputList = JSON.parse(getString)
        recordNotExisted = false
      }
      return recordNotExisted
    },
    // 清除LS紀錄 & 初始化設定
    clearItem() {
      window.localStorage.removeItem('multiLineItem')
    },
    // 移除點選項目
    removeItem(id) {
      this.inputList = this.inputList.filter((element) => element.id !== id)
    },
    // 初始化啟動流程 (有紀錄先使用, 無紀錄初始化)
    initProcedure(){
      let recordNotExisted = this.restoreItem() 
      if(recordNotExisted){
        this.addNewItem()
      }
    }
  },
  created() {
    this.initProcedure()
  }
}
</script>

<style></style>
