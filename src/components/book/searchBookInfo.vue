<template>
  <el-table
    :data="book"
    style="width: 90%;margin: 40px auto">
    <el-table-column
      prop="bookID"
      align="center"
      label="书籍编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="bookName"
      label="书籍名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      align="center">
    </el-table-column>
    <el-table-column
      prop="stock"
      align="center"
      label="库存">
    </el-table-column>
      <el-table-column label="借阅" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click.native="borrowBook(scope.row.bookName)">借阅</el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
    name: 'searchBookLoan',
    data() {
        return {
          book: []
        }
    },
    mounted: function (){
        axios.get('api/book/getALLBook').then(response => {
            this.book = response.data
            console.log(response.data)
        }).catch(function (error) {
            console.log(error)
        })
    },
    methods: {
      borrowBook (bookName) {
        this.$store.commit('storeBookName', bookName);
        console.log(bookName)
        this.$router.push('../loan/borrowBook')
      }
    }
}
</script>