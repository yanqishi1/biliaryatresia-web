<template>
  <div>
    <mt-header title="新生儿胆道闭锁">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div id="reserve-form">
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
          v-model="sex"
          :options="['男', '女']">
      </mt-radio>
      <mt-cell title="预约日期">
        <div class="data-input" @click="openPicker">{{date || '请输入挂号日期'}}</div>
      </mt-cell>
      <mt-datetime-picker
          ref="picker"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="handleConfirm"
          :start-date="startDate"
          :end-date="endDate"
          v-model="pickerValue">
      </mt-datetime-picker>
      <div>
        <mt-cell v-for="(doc, index) in doctors" :title="doc.name">
          <img slot="icon" src="../../assets/img/doctor/1.png" width="24" height="24">
          <span style="color: green">剩余人数{{doc.reserve_num}}</span>
          <span style="color: green">&emsp;费用{{doc.fee}}&emsp;</span>
          <mt-switch v-model="doc.select" @change="selectDoctor(index)"></mt-switch>
        </mt-cell>
      </div>
      <div style="text-align: center">
        <mt-button type="primary" size="large" @click="submit">预约</mt-button>
      </div>
    </div>
  </div>

</template>

<script>
    import {MessageBox} from "mint-ui";

    export default {
        name: "reserve",
        created() {
          let now = new Date();
          now.setDate(now.getDate()+7);
          this.endDate = new Date(now);
        },
       data(){
          return{
            username:'',
            birthday:'',
            birthdayPicker:'',
            sex:'',
            date:'',
            pickerValue:'',
            startDate: new Date(), //起始时间
            endDate:undefined,
            before_select:-1,
            doctors:[
              // {
              //   id:1,
              //   name:'李医生(副主任医师)',
              //   reserve_num:20,
              //   icon:'1.png',
              //   fee:12,
              //   select:false,
              // },
            ],
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
            this.getDoctors();
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
            let formdata = new FormData();
            formdata.append("name", this.username);
            formdata.append("birthday", this.birthday);
            formdata.append("sex", this.sex);
            formdata.append("date", this.date);
            formdata.append("doctorId", this.doctors[this.before_select].id);
            this.$axios
                .post('/api/patient/reserve', formdata)
                .then(data=>{
                    if(data.data.code==200) {
                      MessageBox.alert("预约成功,请缴费");
                      this.$router.push("/fee");
                    }
                });
          },
          selectDoctor(index){
            if(this.before_select>-1){
              this.doctors[this.before_select].select = false;
            }
            this.before_select = index;
          },
          getDoctors(){
            this.doctors = [];
            var self = this
            let formdata = new FormData();
            formdata.append("date", this.date);
            this.$axios
                .post('/api/patient/getdoctors', formdata)
                .then(data=>{
                  let info = data.data;
                  for (let i = 0; i < info.length; i++) {
                      self.doctors.push({
                        id:info[i].docId,
                        name:info[i].doctor_name+'('+info[i].title+')',
                        reserve_num:info[i].num,
                        icon:'2.png',
                        fee:info[i].fee,
                        select:false,
                      })
                  }
                });
          }
        }
    }
</script>

<style scoped>
  #reserve-form{
    text-align: left;
    padding: 0 5%;
  }
</style>