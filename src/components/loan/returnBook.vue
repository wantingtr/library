<template>
  <div>
    <div class="title">归还书籍</div>
    <div class="inputInfo">
      <el-input v-model="readerName" placeholder="请输入您的姓名" class="input"></el-input>
      <el-input v-model="bookName" placeholder="请输入所借书籍" class="input"></el-input>
      <el-input v-model="returnDate" placeholder="请输入归还时间" class="input"></el-input>
    </div>
    <el-button @click.native="returnBook">归还书籍</el-button>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  data () {
    return {
      readerName: '',
      bookName:'',
      returnDate: 0 ,//借出时间
      readerID: 0,
      bookID: 0,
      expectReturnDate: 0,
      fee: 0
    }
  },
  methods: {
    //获取姓名和书籍ID
    //bookTable库存+1
    //获取期望归还时间
    //计算fee
    //新增return实例
    returnBook() {
      //获取书籍ID，读者ID，更新书库存
      axios.all([this.searchBook(), this.searchReader(), this.updateStock()])
      .then((response) => {
        console.log('searchBook,searchReader,updateStock')
        this.getexpectDate()
        //获取期望归还时间
      })
    },
    getexpectDate() {
      var bookID = this.bookID
      axios.get('api/borrow/getexpectDate', {
        params: {
          bookID: bookID
        }
      }).then((response) => {
        console.log('getexpectDate')
        this.expectReturnDate = response.data[0].expectReturnDate
        this.return()
        //更新return表
      })
    },
    updateStock() {
      var bookName = this.bookName
      axios.post('api/book/updateStock', {
          bookName: bookName
      }).then((response) => {
        console.log('updateStock')
      })
    },
    return() {
      //更新return表
      var expectReturnDate = this.expectReturnDate
      var bookID = this.bookID
      var readerID = this.readerID
      var returnDate = this.returnDate
      var feePaying = (this.returnDate - this.expectReturnDate) * 2
      axios.post('api/borrow/returnBook', {
        readerID : readerID,
        bookID : bookID,
        expectReturnDate : expectReturnDate,
        returnDate : returnDate,
        feePaying: feePaying
      }).then((response) => {
        console.log('还书成功')
        alert('您已成功归还《' + bookName + '》，产生欠款金额为' + feepaying +'元')
      })
    },
    searchReader() {
      var readerName = this.readerName
      axios.get('/api/reader/searchReaderID', {
        params: {
          readerName: readerName
        }
      }).then((response) => {
        console.log(response)
        this.readerID = response.data[0].readerID
        console.log(this.readerID)
      })
    },
    searchBook() {
      var bookName = this.bookName
      return axios.get('api/book/searchBookID', {
        params: {
          bookName: bookName
        }
      }).then((response) => {
        console.log(response)
        this.bookID = response.data[0].bookID
      })
    },
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
