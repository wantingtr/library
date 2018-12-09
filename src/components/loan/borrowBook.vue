<template>
  <div>
    <div class="title">借阅书籍</div>
    <div class="inputInfo">
      <el-input v-model="readerName" placeholder="请输入您的姓名" class="input"></el-input>
      <el-input v-model="bookName" class="input" placeholder="请输入书籍名"></el-input>
      <el-date-picker
        v-model="borrowDate"
        type="date"
        placeholder="选择日期"
        class="input"
        format="yyyy-MM-dd"
        >
      </el-date-picker>
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
      bookName: this.$store.state.book,
      borrowDate: '' ,//借出时间
      readerID: 0,
      bookID: 0,
      expectReturnDate: '',
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
    }
  },
  methods: {
    fmtDate(obj){
      var date =  new Date(obj);
      var y = 1900+date.getYear();
      var m = "0"+(date.getMonth()+1);
      var d = "0"+date.getDate();
      return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
    },
    /*
    changeDate (date) {
      this.borrowDate = date;
      console.log(this.borrowDate);
    },*/
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
      var date = this.borrowDate
      this.expectReturnDate = date.setMonth(date.getMonth() + 1)
      this.borrowDate = this.$options.methods.fmtDate(this.borrowDate)
      var expectReturnDate = this.$options.methods.fmtDate(this.expectReturnDate)
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
.data{
  line-height: 70px;
}
.el-input{
    display: flex;
    margin: auto auto;
}
.el-input__icon{
    position: absolute;
    height: 0;
}
.el-date-editor.el-input{
  width: 445.5px;
}
</style>
