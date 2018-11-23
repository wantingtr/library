<template>
<div>
    <div>注销读者证</div>
    <div>
        <el-input v-model="name" placeholder="请输入姓名" class="input"></el-input>
        <el-button @click="cancelReader">注销</el-button>
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
        cancelReader() {
            var name = this.name
            axios.post('/api/reader/cancelReader', {
                name: name
            }).then(function (response) {
                console.log(response)
                alert(name + ', 您已成功注销读者证')
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
}
</script>
