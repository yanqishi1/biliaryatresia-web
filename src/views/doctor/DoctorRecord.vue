<template>
  <div>
    <mt-cell title="预约时间">
      <img slot="icon" src="../../assets/img/doctor/calender.png" width="24" height="24">
      <div class="data-input" @click="openPicker">{{selectDate || '请输入日期'}}</div>
    </mt-cell>
    <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :end-date="endDate"
        @confirm="handleConfirm"
        v-model="pickerValue">
    </mt-datetime-picker>
    <div>
      <mt-cell v-for="(re, index) in records" :title="re.name" :value="re.date" :key="index">
        <span style="color: green" @click="writeOrder">查看医嘱</span>
      </mt-cell>
    </div>

  </div>
</template>

<script>
export default {
  name: "DoctorRecord",
  mounted() {
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
      records:[
        {
          date:'2022-7-18',
          name:'晓儿',
          result:'正常'
        },
        {
          date:'2022-7-16',
          name:'晓儿',
          result:'异常'
        }
      ]
    }
  },
  methods:{
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(data) {
      this.selectDate = this.formatDate(data);
    },
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    writeOrder(){
      this.$router.push("/order");
    }
  }
}
</script>

<style scoped>

</style>