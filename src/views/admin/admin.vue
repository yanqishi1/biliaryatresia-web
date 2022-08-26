<template>
  <el-container>
    <el-header>新生儿胆道闭锁识别系统</el-header>
    <el-container>
      <el-aside width="80px">
        <router-link to="/admin/patient">用户管理</router-link>
        <router-link to="/admin/doc">医生管理</router-link>
        <router-link to="/admin/detect">检测管理</router-link>
        <router-link to="/admin/order">订单管理</router-link>
        <router-link to="/admin/log">日志管理</router-link>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "admin"
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>