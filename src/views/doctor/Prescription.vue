<template>
  <div>
    <mt-header title="新生儿胆道闭锁-医生端">
      <router-link to="/doctor" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div>
      <mt-field label="诊断结果" placeholder="请输入诊断结果" v-model="sickname"></mt-field>
      <mt-field label="医嘱" placeholder="请输入注意事项" type="textarea" rows="15" v-model="order"></mt-field>
      <mt-button type="primary" size="large">保存</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prescription",
  data(){
    return{
      sickname:'',
      order:''
    }
  }
}
</script>

<style scoped>

</style>