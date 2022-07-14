<template>
  <div>
    <mt-header title="新生儿胆道闭锁">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <form id="reserve-form">
      <mt-field label="孩子姓名" placeholder="请输入孩子姓名" v-model="username"></mt-field>
      <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
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
          <span style="color: green">&emsp;费用{{doc.fee}}</span>
          <input type="radio"></input>
        </mt-cell>
      </div>
      <div style="text-align: center">
        <mt-button type="primary" size="large" @click="submit">预约</mt-button>
      </div>
    </form>
  </div>

</template>

<script>
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
            sex:'',
            date:'',
            pickerValue:'',
            startDate: new Date(), //起始时间
            endDate:undefined,
            doctors:[
              {
                name:'李医生(副主任医师)',
                reserve_num:20,
                icon:'1.png',
                fee:12,
              },
              {
                name:'王医生(主任医师)',
                reserve_num:10,
                icon:'2.png',
                fee:25,
              }
            ]
          }
        },
        methods:{
          openPicker() {
            this.$refs.picker.open();
          },
          handleConfirm(data) {
            this.date = this.formatDate(data);
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
            this.$router.push("/fee")
          },
        }
    }
</script>

<style scoped>
  #reserve-form{
    text-align: left;
    padding: 0 5%;
  }
</style>