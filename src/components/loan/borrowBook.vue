<template>
  <div>
    <div class="title">借阅书籍</div>
    <div class="inputInfo">
      <el-input v-model="readerName" placeholder="请输入您的姓名" class="input"></el-input>
      <el-input v-model="bookName" placeholder="请输入所借书籍" class="input"></el-input>
      <div class="">
        <el-date-picker
          v-model="borrowDate"
          type="date"
          placeholder="选择日期"
          position="absolute">
        </el-date-picker>
      </div>
    </div>
    <el-button @click.native="borrowBook">借阅书籍</el-button>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  data () {
    return {
      readerName: '',
      bookName:'',
      borrowDate: 0 ,//借出时间
      readerID: 0,
      bookID: 0,
      expectReturnDate: 0,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  methods: {
    borrowBook () {
      axios.all([this.searchReader(), this.searchBook()])
      .then((response) => {
        this.borrowa()
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

    //读者证累计借阅次数+1
    //书籍库存-1 累计借出次数+1
    //新增借阅表实例
    borrowa() {
      //var expectReturnDate = borrowDate + /////允许借书时间
      axios.all([this.updateUserTable(), this.updateBookTable(), this.borrow()])
        .then(axios.spread(function (acct, perms) {
          console.log('hahahahha')
        }))
    },
    updateUserTable() {
      var readerName = this.readerName
      axios.post('/api/borrow/borrowBookr', {
          readerName: readerName,
      }).then((response) => {
        console.log(response)
      })
    },
    updateBookTable() {
      var bookName = this.bookName
      axios.post('/api/borrow/borrowBookb', {
          bookName: bookName
      }).then((response) => {
        console.log(response)
      })
    },
    borrow() {
      this.expectReturnDate = this.borrowDate + 30
      var expectReturnDate = this.expectReturnDate
      var readerID = this.readerID
      var bookID = this.bookID
      var borrowDate = this.borrowDate
      axios.post('/api/borrow/borrowBook', {
        readerID: readerID,
        bookID: bookID,
        borrowDate: borrowDate,
        expectReturnDate: expectReturnDate
      }).then(function (response) {
        console.log(response)
        alert('借书成功，请于' + expectReturnDate + '前归还书籍')
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
.el-input__icon{
    position: absolute;
}
</style>
