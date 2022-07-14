<template>
  <div class="_404">
    <h3>非常抱歉，您所访问的网页找不到了！
      <span>{{countDown}}</span>秒后自动跳转到
      <router-link to="/">首页</router-link>
    </h3>
    <img src="../assets/img/404.jpeg" alt="页面未找到">
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data(){
    return{
      countDown:6
    }
  },
  created() {
    setInterval(()=>{
      this.countDown>0?this.countDown--:this.$router.push('/')
    },1000);
  }
}
</script>

<style scoped>
  body{
    background-color: #EAF0F0;
  }
  ._404{
    background-color: #EAF0F0;
    width: 80%;
    margin: 200px auto;
  }
  ._404 img{
    width: 80%;
  }
  ._404 a{
    color: #010101;
  }

  ._404 a:hover{
    color: skyblue;
  }
</style>