<template>
<div>
    <div class="title">查询读者借阅信息</div>
    <div class="search">
        <el-input v-model="name" placeholder="请输入姓名" class="input"></el-input>
        <el-button @click="searchReader">查询</el-button>
    </div>
    <div v-if="flag">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>读者证信息</span>
        </div>
        <div class="text item">
            <div class="itemInfo">读者姓名: {{ this.data[0].readerName }}</div>
            <div class="itemInfo">借阅总次数: {{ this.data[0].borrowNum }}</div>
            <div class="itemInfo">未交罚金: {{ this.data[0].fee }}</div>
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
            name: '',
            data: {},
            flag: false
        }
    },
    methods: {
        searchReader() {
            var name  = this.name
            axios.get('api/reader/searchReader', {
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
