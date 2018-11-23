<template>
  <div>
    <div>注册读者证</div>
    <div>
      <el-input v-model="name" placeholder="请输入姓名" class="input"></el-input>
      <el-button @click="addUser">注册</el-button>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    /*
    addUser() {
      var name = this.name
      //this.$http.post('/api/user/addReader', {
      this.$http.post('/api/reader/addReader', {
        name: name
      },{}).then((response) => {
        console.log(response);
        alert(name + ', 恭喜您注册读者证成功！')
      })
    }
    */
    addUser() {
      var name = this.name
      axios.post('/api/reader/addReader',{
        name: name
      }).then(function (response) {
        console.log(response)
        alert(name + ', 恭喜您成功注册读者证！')
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
