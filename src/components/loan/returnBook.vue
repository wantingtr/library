<template>
  <div>
    <div class="title">归还书籍</div>
    <div class="inputInfo">
      <el-input v-model="readerName" placeholder="请输入您的姓名" class="input"></el-input>
      <el-input v-model="bookName" placeholder="请输入所借书籍" class="input"></el-input>
      <el-date-picker
        v-model="returnDate"
        type="date"
        placeholder="选择日期"
        class="input">
      </el-date-picker>
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
      returnDate: '' ,//借出时间
      readerID: 0,
      bookID: 0,
      expectReturnDate: '',
      fee: 0,
    }
  },
  mounted: function(){
    this.returnDate = new Date();
  },
  methods: {
    fmtDate(obj){
      var date =  new Date(obj);
      var y = 1900+date.getYear();
      var m = "0"+(date.getMonth()+1);
      var d = "0"+date.getDate();
      return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
    },
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
      var readerID = this.readerID
      axios.get('api/borrow/getexpectDate', {
        params: {
          readerID: readerID,
          bookID: bookID
        }
      }).then((response) => {
        console.log(response)
        this.expectReturnDate = response.data[0].expectReturnDate
        console.log(this.expectReturnDate)
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
      var returnDate = this.$options.methods.fmtDate(this.returnDate)
      var feePaying = 0
      if (expectReturnDate < returnDate) {
        var fee = (this.returnDate - this.expectReturnDate) * 2
      }
      this.fee= feePaying
      axios.post('api/borrow/returnBook', {
        readerID : readerID,
        bookID : bookID,
        expectReturnDate : expectReturnDate,
        returnDate : returnDate,
        feePaying: feePaying
      }).then((response) => {
        console.log('还书成功')
        alert('您已成功归还《' + this.bookName + '》，产生欠款金额为' + this.fee +'元')
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
