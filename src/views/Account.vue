<template>
    <div>
      <BAHeader></BAHeader>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">登录</mt-tab-item>
        <mt-tab-item id="2">密码登录</mt-tab-item>
        <mt-tab-item id="3">注册</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          <mt-field label="验证码" v-model="code">
            <mt-button type="primary">发送验证码</mt-button>
          </mt-field>
          <mt-button type="primary" @click="login_tel">登录</mt-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
          <mt-button type="primary" @click="login_password">登录</mt-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
          <mt-field label="密码" placeholder="再次输入密码" type="password" v-model="password_verfiy"></mt-field>
          <mt-field label="验证码" v-model="code">
            <img :src="codePath" id="codeImg" @click="reloadImg" height="45px" width="100px">
          </mt-field>
          <mt-button type="primary" @click="register">注册</mt-button>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
</template>

<script>
import BAHeader from "@/components/BAHeader";
import { MessageBox } from 'mint-ui';
export default {
  name: "Account",
  components:{
    BAHeader
  },
  data() {
    return {
      selected:'1',
      phone:'',
      password:'',
      password_verfiy:'',
      code:'',
      codePath:'http://localhost:8443/api/account/code',
    };
  },
  mounted() {
    this.reloadImg()
  },
  methods: {
    reloadImg(){
      this.codePath = 'http://localhost:8443/api/account/code?ts='+new Date().getTime();
    },
    register(){
      if(this.password===this.password_verfiy) {
        var _this = this;
        var formdata = new FormData();
        formdata.append("account", this.phone);
        formdata.append("password", this.password);
        formdata.append("code", this.code);
        this.$axios
            .post('/api/account/register', formdata)
            .then(resp => {
              if (resp.data.code === 200) {
                MessageBox.alert("注册成功，请登录");
                this.selected='2'
              } else {
                MessageBox.alert(resp.data.msg);
              }
            }).catch(failResponse => {
        })
      }else{
        MessageBox.alert('两次密码输入不一致');
      }
    },
    login_tel(){
      var _this = this
      var formdata = new FormData()
      formdata.append("account",this.phone)
      formdata.append("code",this.password)
      this.$axios
          .post('/api/account/login_code', formdata)
          .then(resp => {
            if (resp.data.code === 200) {
              MessageBox.alert("登录成功")
              _this.$router.push("/")
            } else {
              MessageBox.alert(resp.data.msg);
            }
          })
          .catch(failResponse => {})
    },
    login_password(){
      var _this = this
      var formdata = new FormData()
      formdata.append("account",this.phone)
      formdata.append("password",this.password)
      this.$axios
          .post('/api/account/login', formdata)
          .then(resp => {
            if (resp.data.code === 200) {
              MessageBox.alert("登录成功")
              _this.$router.push("/")
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

</style>
