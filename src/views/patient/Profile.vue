<template>
    <div class="profile">
        <mt-header title="个人信息">
          <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
        </mt-header>
        <h2>拍摄记录</h2>
        <div class="detect">
            <div>
              <mt-cell v-for="(ds, index) in detects" :title="ds.date">
                <span>{{ds.result}}</span>
                <img slot="icon" src="../../assets/img/icon/1.png" width="24" height="24">
              </mt-cell>
            </div>
        </div>
        <el-divider></el-divider>
        <h2>就诊记录</h2>
        <div class="detect">
          <div>
            <mt-cell v-for="(rv, index) in reserves" :title="rv.date">
              <span @click="poprv(rv.result)">{{rv.doctor}}</span>
            </mt-cell>
          </div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: "profile",
        data(){
          return{
            detects:[
              {
                result:'正常',
                date:'2022-7-5',
                path:''
              },
              {
                result:'可疑',
                date:'2022-7-6',
                path:''
              },
              {
                result:'严重异常',
                date:'2022-7-10',
                path:''
              }
            ],
            reserves:[
              {
                date:'2022-7-11',
                doctor:'王医生',
                result:'按时吃药，及时拍照'
              },
              {
                date:'2022-7-6',
                doctor:'李医生',
                result:'按时吃药，及时拍照'
              }
            ]
          }
        },
        methods:{
          poprv(msg){
            MessageBox.alert(msg, '医嘱');
          }
        }
    }
</script>

<style scoped>
    .detect{
      text-align: left;
      padding:0 3%;
    }
</style>