<template>
  <div class="home">
    <BAHeader></BAHeader>
    <section class="main">
      <div class="block" style="background-color: #51cfff;" @click="routerto('/scan')">
        <div class="block-img">
          <img src="../assets/img/icon/1.png">
        </div>
        <div class="desc">扫我测便便</div>
      </div>
      <div class="block" style="background-color: #ffd464" @click="routerto('/reserve')">
        <div class="block-img">
          <img src="../assets/img/icon/2.png">
        </div>
        <div class="desc">预约就诊</div>
      </div>
      <div class="block" style="background-color: #6eefcc;" @click="routerto('/guilde')">
        <div class="block-img">
          <img src="../assets/img/icon/3.png">
        </div>
        <div class="desc">相关知识</div>
      </div>
      <div class="block" style="background-color: #ffa289;" @click="routerto('/profile')">
        <div class="block-img">
          <img src="../assets/img/icon/4.png">
        </div>
        <div class="desc">我的</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .home{
    height: 100%;
  }

  .main{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .block{
    border-radius: 5px;
    height: 25%;
    width: 35%;
    margin: 20px;
  }
  .block:hover{
    cursor: pointer;
  }
  .block-img{
    padding: 10% 0;
  }
  .block-img img{
    width: 80px;
    height: 80px;
  }
  .desc{
    font-size: 1.5em;
    color: white;
  }
</style>

<script>
import BAHeader from "@/components/BAHeader";
export default {
  name: 'Home',
  components: {
    BAHeader
  },
  methods:{
    routerto(path){
      this.$router.push(path)
    },
  }
}
</script>
