<template>
  <div>
    <mt-header title="新生儿胆道闭锁">
      <router-link to="/profile" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div id="edit-form">
      <mt-field label="孩子姓名" placeholder="请输入孩子姓名" v-model="username"></mt-field>
      <mt-cell title="生日">
        <div class="data-input" @click="openBirthdayPicker">{{birthday || '请输入孩子生日'}}</div>
      </mt-cell>
      <mt-datetime-picker
          ref="picker_birthday"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          :end-date="new Date()"
          @confirm="handleBirthday"
          v-model="birthdayPicker">
      </mt-datetime-picker>
      <mt-radio
          align="left"
          title="性别"
          v-model="pgender"
          :options="['男', '女']">
      </mt-radio>
      <mt-field label="体重" placeholder="请输入孩子体重" v-model="weight"></mt-field>
      <mt-radio
          align="left"
          title="喂养方式"
          v-model="eat"
          :options="['母乳', '奶粉']">
      </mt-radio>
      <div style="text-align: center">
        <mt-button type="primary" size="large" @click="submit">保存</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {MessageBox} from "mint-ui";

export default {
  name: "EditProfile",
  created() {
    if(this.$store.state.patient!==undefined){
      if(this.$store.state.patient.pname!=null){
        this.username = this.$store.state.patient.pname;
      }
      if(this.$store.state.patient.pbirthday!=null){
        this.birthday = this.$store.state.patient.pbirthday;
      }
      if(this.$store.state.patient.pgender!=null){
        this.pgender = this.$store.state.patient.pgender;
      }
      if(this.$store.state.patient.pweight!=null){
        this.weight = this.$store.state.patient.pweight;
      }
      if(this.$store.state.patient.peat!=null){
        this.eat = this.$store.state.patient.peat;
      }
    }
  },
  data(){
    return{
      username:'',
      birthday:'',
      birthdayPicker:'',
      pgender:'',
      weight:'',
      eat:''
    }
  },
  methods:{
    openPicker() {
      this.$refs.picker.open();
    },
    openBirthdayPicker(){
      this.$refs.picker_birthday.open();
    },
    handleConfirm(data) {
      this.date = this.formatDate(data);
    },
    handleBirthday(data) {
      this.birthday = this.formatDate(data);
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
    submit(){
      var _this = this
      var formdata = new FormData();
      formdata.append("pId", this.$store.state.patient.pid);
      formdata.append("pName", this.username);
      formdata.append("pBirthday", this.birthday);
      formdata.append("pGender", this.pgender);
      formdata.append("pWeight", this.weight);
      formdata.append("pEat", this.eat);
      this.$axios
          .post('/api/patient/saveprofile', formdata)
          .then(resp => {
            if (resp.data.code === 200) {
              MessageBox.alert("修改成功").then(action=>{
                this.$router.push("/profile")
              })

              _this.$store.state.patient = resp.data.object;
            } else {
              MessageBox.alert("服务器错误");
            }
          })
          .catch(failResponse => {})
    },
    selectDoctor(index){
      if(this.before_select>-1){
        this.doctors[this.before_select].select = false;
      }
      this.before_select = index;
    }
  }
}
</script>

<style scoped>
  #edit-form{
    text-align: left;
    padding: 0 5%;
  }
</style>