<template>
  <div>
    <div class="title">录入书籍</div>
    <div class="inputInfo">
      <el-input v-model="name" placeholder="请输入书籍名" class="input"></el-input>
      <el-input v-model="author" placeholder="请输入书籍作者" class="input"></el-input>
      <el-input v-model="stock" placeholder="请输入书籍库存" class="input"></el-input>
    </div>
    <el-button @click="addBook">录入书籍</el-button>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      author: '',
      stock: 10
    }
  },
  methods: {
    addBook() {
      var name = this.name
      var stock = this.stock
      var author = this.author
      axios.post('/api/book/addBook',{
        name: name,
        author: author,
        stock: stock
      }).then(function (response) {
        console.log(response)
        alert('成功录入《 ' + name + '》')
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
.title{
    height: 100px;
    line-height: 100px;
}
.inputInfo{
    height: 200px;
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
