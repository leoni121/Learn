<template>
  <div class="login-register">
    <div class="wrap">
      <h1 class="title">学霸圈</h1>
      <div
        class="closeLogin"
        @click="$emit('closeLogin')"
      >
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M512 456.310154L94.247385 38.557538a39.542154 39.542154 0 0 0-55.689847 0 39.266462 39.266462 0 0 0 0 55.689847L456.310154 512 38.557538 929.752615a39.542154 39.542154 0 0 0 0 55.689847 39.266462 39.266462 0 0 0 55.689847 0L512 567.689846l417.752615 417.752616c15.163077 15.163077 40.290462 15.36 55.689847 0a39.266462 39.266462 0 0 0 0-55.689847L567.689846 512 985.442462 94.247385a39.542154 39.542154 0 0 0 0-55.689847 39.266462 39.266462 0 0 0-55.689847 0L512 456.310154z" /></svg>
      </div>
      <div class="choose-button">
        <button
          class="btn login-btn"
          :class ="{active:currTemplate==='login'}"
          @click = "currTemplate = 'login'"
        >登录</button>
        <button
          class="btn register-btn"
          :class ="{active:currTemplate==='register'}"
          @click = "currTemplate = 'register'"
        >注册</button>
      </div>
      <!-- 用来放置 login 或者 register -->
      <component
        :is = "currTemplate"
        @switch="switchToLogin"
      ></component>
    </div>
  </div>
</template>

<script>
  import login from "@/components/loginRegister/components/login"
  const register = () => import("@/components/loginRegister/components/register");
  // <!-- 还有引入validatir -->
  import { Validator } from 'vee-validate';
  // 修改默认
  const dictionary = {
    zh_CN: {
      messages: {
        required: () => '该值不能为空哦'
      }
    }
  };
  Validator.updateDictionary(dictionary);
  // username
  Validator.extend('username', {
    messages: {
      zh_CN:field => '电话号或邮箱号输入错误'
    },
    validate: value => {
      return /^((1\d{10})|((\w-*\.*)+@(\w-?)+(\.\w{2,})+))$/.test(value);
    }
  });
  // password
  Validator.extend('password', {
    messages: {
      zh_CN:field => '密码格式错误'
    },
    validate: value => {
      return /^.[0-9A-Za-z]{7,10}$/.test(value);
    }
  });
  // confirmPassword
  Validator.extend('confirmPassword', {
    messages: {
      zh_CN:field => '密码不一致'
    },
    validate: (value, args) => {
      return args == value;
    }
  });
  // check
  Validator.extend('checkCode', {
    messages: {
      zh_CN:field => '验证码输入错误'
    },
    validate: (value,args) => {
      return value == args;
    }
  });

  export default {
    name: 'loginRegister',
    props : [
      "target",
      "sonTarget"
    ],
    data() {
      return {
        currTemplate : "login"
      }
    },
    components : {
      login : login,
      register : register
    },
    methods : {
      switchToLogin : function () {
        this.currTemplate = 'login'
      }
    }
  }
</script>

<style scoped>
  .wrap {
    overflow: hidden;
    margin: 70px auto;
    width: 350px;
    border: 1px solid skyblue;
    -webkit-box-shadow: 0 0 1px 1px skyblue;
    -moz-box-shadow: 0 0 1px 1px skyblue;
    box-shadow: 0 0 1px 1px skyblue;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 10px 20px;
    background: white;
    position: relative;
  }

  /* title */
  .title {
    color: #75b3cc;
    font: bold 30px/60px "simhei","微软雅黑";
    width: fit-content;
  }

  .closeLogin {
    position: absolute;
    right: 0;
    width: 60px;
    height: 60px;
    top: 0;
    font: 20px/60px "simhei";
    text-align: center;
  }
  .closeLogin svg {
    width: 20px;
    height: 20px;
  }
  .closeLogin:hover {
    -webkit-border-radius: 0 5px 0 5px;
    -moz-border-radius: 0 5px 0 5px;
    border-radius: 0 5px 0 5px;
    background-color: #eeeeee;
    cursor: pointer;
  }
  .choose-button {
    margin-top: 10px;
    width: 100%;
    -webkit-border-radius: 5p;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 50px;
  }
  .choose-button .btn {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    width:50%;
    float: left;
    font: 20px/40px "simhei","华文新魏";
    height: 40px;
    background: #dddddd;
  }
  .login-btn {
    -webkit-border-radius: 5px 0 0 5px;
    -moz-border-radius: 5px 0 0 5px;
    border-radius: 5px 0 0 5px;
  }
  .register-btn {
    -webkit-border-radius: 0 5px 5px 0;
    -moz-border-radius: 0 5px 5px 0;
    border-radius: 0 5px 5px 0;
  }
  .choose-button .active {
    background: #7177ff;
  }
</style>
