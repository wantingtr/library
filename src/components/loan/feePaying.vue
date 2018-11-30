<template>
  <div>
    <div class="title">缴清罚金</div>
    <div class="payinputInfo">
      <el-input v-model="readerName" placeholder="请输入您的姓名" class="input"></el-input>
    </div>
    <el-button @click="borrowBook" v-if="!flag">查询罚金</el-button>
    <div v-if="flag">
        <div>
            您目前需缴清罚金金额为：
        </div>
        <div>
            {{money}}
        </div>
        <el-button @click="payFee">缴清罚金</el-button>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  data () {
    return {
      readerName: '',
      flag: false
    }
  },
  methods: {
      payFee() {
          this.flag = true
      }
  }
}
</script>

<style>
.title{
    height: 100px;
    line-height: 100px;
}
.payinputInfo{
    height: 30px;
}
.input{
    height: 70px;
    width: 40%;
}
.el-input{
    display: flex;
    margin: auto;
}
</style>
