<template>
    <div class="profile">
        <mt-header title="个人信息">
          <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
          <mt-button icon="more" slot="right" @click="editProfile"></mt-button>
        </mt-header>
        <div class="patient-info">
          <mt-cell title="孩子姓名">
            <span style="color: gray">{{this.$store.state.patient.pname}}</span>
          </mt-cell>
          <mt-cell title="手机号">
            <span style="color: gray">{{this.$store.state.patient.ptel}}</span>
          </mt-cell>
          <mt-cell title="生日">
            <span style="color: gray">{{this.$store.state.patient.pbirthday}}</span>
          </mt-cell>
          <mt-cell title="体重">
            <span style="color: gray">{{this.$store.state.patient.pweight}}</span>
          </mt-cell>
          <mt-cell title="性别">
            <span style="color: gray">{{this.$store.state.patient.pgender}}</span>
          </mt-cell>
          <mt-cell title="喂养方式">
            <span style="color: gray">{{this.$store.state.patient.peat}}</span>
          </mt-cell>
        </div>
        <div class="history">
          <mt-cell title="拍摄记录">
            <img slot="icon" src="../../assets/img/icon/shit.png" width="24" height="24">
            <span style="color: green" @click="detectHistoryShow()">详情</span>
          </mt-cell>
          <div v-show="detectHistory">
            <div>
              <mt-cell v-for="(ds, index) in detects" :title="ds.imgDate">
                <span>{{ds.detectResult}}</span>
                <img slot="icon" src="../../assets/img/icon/1.png" width="24" height="24">
              </mt-cell>
            </div>
          </div>
        </div>
        <div class="history">
          <mt-cell title="就诊记录">
            <img slot="icon" src="../../assets/img/icon/record.png" width="24" height="24">
            <span style="color: green" @click="reserveHistoryShow()">详情</span>
          </mt-cell>
          <div v-show="reserveHistory" class="history">
            <div>
              <mt-cell v-for="(rv, index) in reserves" :title="rv.date">
                <span @click="poprv(rv.result)">{{rv.doctor}}</span>
                <span @click="openchat()" style="color: green">&emsp;咨询</span>
              </mt-cell>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: "profile",
        created() {
          if(this.$store.state.patient===undefined){
            MessageBox.alert("请先登录").then(action=>{
              this.$store.state.history_router = "/profile"
              this.$router.push("/account")
            })
          }
        },
        mounted() {
          if(this.$store.state.patient!==undefined &&
              this.$store.state.reserves===undefined ||
              this.$store.state.detects==undefined){
            this.getRecored();
          }else{
            this.detects = this.$store.state.detects;
            this.reserves = this.$store.state.reserves;
          }
        },
        data(){
          return{
            detectHistory:false,
            reserveHistory:false,
            detects:[
                // {
                // result:'正常',
                // date:'2022-7-5',
                // path:''
                // },
            ],
            reserves:[
              // {
              //   date:'2022-7-11',
              //   doctor:'王医生',
              //   result:'按时吃药，及时拍照'
              // }
            ]
          }
        },
        methods:{
          poprv(msg){
            MessageBox.alert(msg, '医嘱');
          },
          editProfile(){
            this.$router.push('/editp');
          },
          detectHistoryShow(){
            this.detectHistory = ~this.detectHistory;
          },
          reserveHistoryShow(){
            this.reserveHistory = ~this.reserveHistory;
          },
          openchat(){
            this.$router.push("/chat");
          },
          getRecored(){
            var formdata = new FormData();
            formdata.append("pid", this.$store.state.patient.pid);
            this.$axios
                .post('/api/account/getrecord', formdata)
                .then(resp => {
                  if (resp.data.code === 200) {
                    this.$store.state.detects = resp.data.object.detects;
                    this.$store.state.reserves = resp.data.object.reserves;
                    this.detects = resp.data.object.detects;
                    this.reserves = resp.data.object.reserves;
                  } else {
                    MessageBox.alert(resp.data.msg);
                  }
                })
                .catch(failResponse => {})
          }
        }
    }
</script>

<style scoped>
    .patient-info{
      text-align: left;
      padding:0 3%;
    }
    .history{
      text-align: left;
      padding:0 3%;
    }
</style>