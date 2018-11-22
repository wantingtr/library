<template>
  <div class="hello">
    <div>注册读者证</div>
    <div>
      <el-input v-model="name" placeholder="请输入姓名" width="200px"></el-input>
      <el-button @click="addUser">注册</el-button>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'add raadera',
      name: ''
    }
  },
  methods: {
    addUser() {
      var name = this.name
      //this.$http.post('/api/user/addReader', {
      this.$http.post('/api/reader/addReader', {
        name: name
      },{}).then((response) => {
        console.log(response);
      })
    }
  }
}
</script>

<style>
.input{
  width: 50px;
}
</style>
