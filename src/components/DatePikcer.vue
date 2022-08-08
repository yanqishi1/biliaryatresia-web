<template>
  <div>
    <mt-cell :title="pickerTitle">
      <img slot="icon" src="../assets/img/doctor/calender.png" width="24" height="24">
      <div class="data-input" @click="openPicker">{{selectDate || '请输入日期'}}</div>
    </mt-cell>
    <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :start-date="startDate"
        :end-date="endDate"
        @confirm="handleConfirm"
        v-model="pickerValue">
    </mt-datetime-picker>
  </div>
</template>

<script>
export default {
  name: "DatePikcer",
  props:["pickerTitle","add"],
  created() {
    if(this.add===undefined || this.add===""){
      this.limit = 7
    }else{
      this.limit = parseInt(this.add)
    }
  },
  mounted() {

    let now = new Date();
    this.selectDate = this.formatDate(now);
    now.setDate(now.getDate()+this.limit);
    this.endDate = new Date(now);
  },
  data() {
    return {
      selectDate: '',
      startDate: new Date(), //起始时间,
      endDate: undefined,
      pickerValue: '',
      limit:7,
    }
  },
  methods:{
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(data) {
      this.selectDate = this.formatDate(data);
      this.$emit("input", this.selectDate);
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
  }
}
</script>

<style scoped>

</style>