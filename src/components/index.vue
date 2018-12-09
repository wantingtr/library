<template>
  <el-container class='main'>
    <el-header height="50px">图书借阅管理系统</el-header>
    <el-container>
      <el-aside width="250px">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>读者信息管理</span>
              </template>
              <el-menu-item-group>
                <router-link to='/reader/addReader'>
                  <el-menu-item index="1-1">办理借书证</el-menu-item>
                </router-link>
                <router-link to='/reader/cancelReader'>
                  <el-menu-item index="1-2">注销借书证</el-menu-item>
                </router-link>
                <router-link to='/reader/searchReader'>
                  <el-menu-item index="1-3">查询读者借阅信息</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>图书信息管理</span>
              </template>
              <el-menu-item-group>
                <router-link to='/book/addBook'>
                  <el-menu-item index="2-1">录入书籍</el-menu-item>
                </router-link>
                <router-link to='/book/searchBookInfo'>
                  <el-menu-item index="2-2">查看书籍</el-menu-item>
                </router-link>
                <router-link to='/book/searchBookLoan'>
                  <el-menu-item index="2-3">查询图书借阅信息</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">借阅管理</span>
              </template>
              <el-menu-item-group>
                <router-link to='/loan/borrowBook'>
                  <el-menu-item index="3-1">借阅书籍</el-menu-item>
                </router-link>
                <router-link to='/loan/returnBook'>
                  <el-menu-item index="3-2">归还书籍</el-menu-item>
                </router-link>
                <router-link to='/loan/feePaying'>
                  <el-menu-item index="3-3">缴清罚金</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-main>
            <div class="ShowPanel">
              <router-view></router-view>
            </div>
        </el-main>
        <el-footer height="20px">by wantingtr</el-footer>
      </el-container>
    </el-container>    
  </el-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .main{
    width: 100%;
    height: 100%;
  }
  html,body{
    width: 100%;
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: rgb(62, 64, 66);
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 50px;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-footer{
    bottom: 0;
    text-align: center;
    line-height: 20px;
    background-color:  #545c64;
  }
</style>
