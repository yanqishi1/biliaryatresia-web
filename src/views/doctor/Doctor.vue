<template>
    <div>
      <mt-header title="新生儿胆道闭锁-医生端">
        <mt-button icon="more" slot="right" ></mt-button>
      </mt-header>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="预约">
          <DoctorReserve></DoctorReserve>
        </mt-tab-container-item>
        <mt-tab-container-item id="就诊记录">
          <DoctorRecord></DoctorRecord>
        </mt-tab-container-item>
        <mt-tab-container-item id="纠正">
          <Recorrect></Recorrect>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <DoctorProfile></DoctorProfile>
        </mt-tab-container-item>
      </mt-tab-container>

      <mt-tabbar v-model="selected">
        <mt-tab-item id="预约">
          <img slot="icon" src="../../assets/img/doctor/doctor_reserve.png">
          预约
        </mt-tab-item>
        <mt-tab-item id="就诊记录">
          <img slot="icon" src="../../assets/img/doctor/doctor_record.png">
          就诊记录
        </mt-tab-item>
        <mt-tab-item id="纠正">
          <img slot="icon" src="../../assets/img/doctor/recorrect.png">
          纠正
        </mt-tab-item>
        <mt-tab-item id="我的">
          <img slot="icon" src="../../assets/img/doctor/doctor.png">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
</template>

<script>
    import DoctorReserve from "@/views/doctor/DoctorReserve";
    import DoctorRecord from "@/views/doctor/DoctorRecord";
    import Recorrect from "@/views/doctor/Recorrect";
    import DoctorProfile from "@/views/doctor/DoctorProfile";
    export default {
      name: "Doctor",
      components: {DoctorProfile, Recorrect, DoctorRecord, DoctorReserve},
      data(){
          return {
            selected:'预约',
          }
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>