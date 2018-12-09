<template>
  <div>
    <div class="title">缴清罚金</div>
    <div class="payinputInfo">
      <el-input v-model="readerName" placeholder="请输入您的姓名" class="input"></el-input>
    </div>
    <el-button @click="searchFee" v-if="!flag" class="button">查询罚金</el-button>
    <div v-if="flag" class="fee">
        <div>
            您目前需缴清罚金金额为：
        </div>
        <div>
            {{this.money}}
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
      flag: false,
      money: 0 
    }
  },
  methods: {
      searchFee() {
        var name  = this.readername
        axios.get('api/reader/searchFee', {
            params: {
                name: name
            }
        }).then(response => {
            this.data = response.data
            this.flag = true
            this.money = data.fee
            console.log(response.data)
        }).catch(function (error) {
            console.log(error)
        })
      },
      payFee() {
          this.flag = true
          alert(this.readerName + ', 您已成功缴清罚款')
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
.button{
    margin: 20px;
}
.fee{
    margin: 20px;
}
</style>
