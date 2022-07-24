<template>
  <div>
    <div class="img-box">
      <img src="../../assets/img/background.jpg" >
    </div>
    <div class="button-boxs">
      <mt-button type="primary" size="large">正确</mt-button>
      <mt-button type="danger" size="large" @click="changeShow">错误</mt-button>
      <div class="box" v-show="isShow">
        <mt-button type="default" size="large">严重异常</mt-button>
        <mt-button type="default" size="large">异常</mt-button>
        <mt-button type="default" size="large">可疑</mt-button>
        <mt-button type="default" size="large">正常</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recorrect",
  data(){
    return {
      isShow:false
    }
  },
  methods:{
    changeShow(){
      this.isShow = ~this.isShow;
    }
  }
}
</script>

<style scoped>
  .img-box{
    padding: 10px;
    text-align: center;
  }
  .img-box img{
    width: 250px;
    height: 250px;
  }
  .button-boxs{
    padding: 10px;
  }
  button{
    margin: 2px 0px;
  }
</style>