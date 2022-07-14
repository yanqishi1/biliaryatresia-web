<template>
  <div class="fee">
    <mt-header title="缴费">
      <router-link to="/reserve" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div>
      <mt-cell title="支付宝">
        <span>费用:25</span>
        <img slot="icon" src="../../assets/img/icon/alipay.jpeg" width="24" height="24">
      </mt-cell>
      <mt-cell title="微信">
        <span>费用:25</span>
        <img slot="icon" src="../../assets/img/icon/wechat.jpeg" width="24" height="24">
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fee"
}
</script>

<style scoped>
  .fee{
    text-align: left;
  }
</style>