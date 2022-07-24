<template>
  <div>
    <DatePikcer v-model="selectDate" title="预约时间" add="7"></DatePikcer>
    <mt-cell v-for="(rv, index) in reserves" :title="rv.name" :key="index">
      <span style="color: green" @click="writeOrder">写医嘱</span>
    </mt-cell>
  </div>
</template>

<script>
import DatePikcer from "@/components/DatePikcer";
export default {
  name: "DoctorReserve",
  components: {DatePikcer},
  created() {
    let now = new Date();
    this.selectDate = this.formatDate(now);
    now.setDate(now.getDate()+7);
    this.endDate = new Date(now);
  },
  data(){
    return {
      selectDate:'',
      startDate:new Date(), //起始时间,
      endDate:undefined,
      pickerValue:'',
      reserves:[
        {
          name:'sdfsd',
          date:'sdf'
        }
      ],
    }
  },
  methods:{
    writeOrder(){
      this.$router.push("/order");
    }
  }
}
</script>

<style scoped>

</style>