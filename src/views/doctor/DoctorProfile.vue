<template>
  <div>
    <mt-cell title="姓名">
      <span style="color: gray">{{this.$store.state.doctor.name}}</span>
      <img slot="icon" src="../../assets/img/doctor/doctor.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="电话">
      <span style="color: gray">{{this.$store.state.doctor.tel}}</span>
    </mt-cell>
    <mt-cell title="科室">
      <span style="color: gray">{{this.$store.state.doctor.dept}}</span>
    </mt-cell>
    <mt-cell title="预约人数调整">
      <span @click="hiddenAndShow(0)">调整</span>
    </mt-cell>
    <mt-cell title="请假">
      <span @click="hiddenAndShow(1)">选择日期</span>
    </mt-cell>
    <mt-cell title="修改密码">
      <span @click="hiddenAndShow(2)"> 修改 </span>
    </mt-cell>
    <div v-show="isShow[0]">
      <mt-cell title="可预约人数">{{number}}</mt-cell>
      <mt-picker :slots="slots"
                 @change="onValuesChange"
                 :showToolbar="true"
                 :item-height="50"></mt-picker>
      <mt-button type="primary" size="large">提交</mt-button>
    </div>
    <div v-show="isShow[1]">
      <DatePikcer picker-title="开始时间" add="14" v-model="startDate"></DatePikcer>
      <DatePikcer picker-title="结束时间" add="14" v-model="endDate"></DatePikcer>
      <mt-button type="primary" size="large">提交</mt-button>
    </div>
    <div v-show="isShow[2]">
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password1"></mt-field>
      <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="password2"></mt-field>
      <mt-button type="primary" size="large">提交</mt-button>
    </div>
  </div>
</template>

<script>
import DatePikcer from "@/components/DatePikcer";
export default {
  name: "DoctorProfile",
  components: {DatePikcer},
  data(){
    return{
      number:0,
      isShow:[false, false, false],
      password1:'',
      password2:'',
      startDate:undefined,
      endDate:undefined,
      slots: [
        {
          flex: 1,
          values: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods:{
    hiddenAndShow(index){
      this.$set(this.isShow,index,~this.isShow[index])
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      console.log(this.number)
      this.number = picker.getSlotValue(1);
    }
  }
}
</script>

<style scoped>

</style>