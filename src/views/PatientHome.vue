<template>
  <div>
    <BAHeader></BAHeader>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="便便检测器">
        <Scan></Scan>
      </mt-tab-container-item>
      <mt-tab-container-item id="预约就诊">
        <Reserve></Reserve>
      </mt-tab-container-item>
      <mt-tab-container-item id="相关知识">
        <About></About>
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <Profile></Profile>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="便便检测器">
        <img slot="icon" src="../assets/img/icon/1.png">
        预约
      </mt-tab-item>
      <mt-tab-item id="预约就诊">
        <img slot="icon" src="../assets/img/icon/2.png">
        就诊记录
      </mt-tab-item>
      <mt-tab-item id="相关知识">
        <img slot="icon" src="../assets/img/icon/3.png">
        纠正
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/img/icon/4.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import BAHeader from "@/components/BAHeader";
import Scan from "@/views/patient/Scan";
import Reserve from "@/views/patient/Reserve";
import About from "@/views/patient/About";
import Profile from "@/views/patient/Profile";
export default {
  name: "PatientHome",
  components: {Profile, About, Reserve, Scan},
  data(){
    return {
      selected:'便便检测器',
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>