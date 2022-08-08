<template>
  <div>
    <DatePikcer v-model="selectDate" pickerTitle="预约时间" add="7"></DatePikcer>
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
  },
  data(){
    return {
      selectDate:'',
      reserves:[
        // {
        //   name:'sdfsd',
        //   date:'sdf'
        // }
      ],
    }
  },
  methods:{
    writeOrder(){
      this.$router.push("/order");
    }
  },
  watch:{
    selectDate:function (){
      console.log(this.selectDate);
      this.reserves = [];
      var self = this
      let url = "/api/doctor/getreserve?doc_id="+this.$store.state.doctor.doc_id+"&date="+this.selectDate
      this.$axios
          .get(url)
          .then(data=>{
            let info = data.data;
            console.log(info);
            for (let i = 0; i < info.length; i++) {
              self.reserves.push({
                name:info[i].rmeetingdate,
                date:this.selectDate,
                re_id:info[i].id
              });
            }
          });
    }
  }
}
</script>

<style scoped>

</style>