<template>
<div>
    <div class="title">查询书籍信息</div>
    <div class="search">
        <el-input v-model="name" placeholder="请输入书籍名" class="input"></el-input>
        <el-button @click="searchBook">查询</el-button>
    </div>
    <div v-if="flag">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>书籍信息</span>
        </div>
        <div class="text item">
            <div class="itemInfo">书籍名: {{ this.data[0].bookName }}</div>
            <div class="itemInfo">作者: {{ this.data[0].author }}</div>
            <div class="itemInfo">当前库存: {{ this.data[0].stock }}</div>
            <div class="itemInfo">被借阅次数: {{ this.data[0].lendNum }}</div>
        </div>
        </el-card>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            name: name,
            data: {},
            flag: false
        }
    },
    methods: {
        searchBook() {
            var name  = this.name
            axios.get('api/book/searchBook', {
                params: {
                    name: name
                }
            }).then(response => {
                this.data = response.data
                this.flag = true
                console.log(response.data)
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
.search{
    height: 130px;
    line-height: 70px;
}
.input{
    width: 30%;
}
.box-card{
    width: 35%;
    margin: 20px auto;
    height: 200px;
}
.itemInfo{
    height: 30px;
    line-height: 30px;
    text-align: left;
    border-bottom: 1px;
}
.clearfix{
    height: 20px;
    line-height: 20px;
}
</style>