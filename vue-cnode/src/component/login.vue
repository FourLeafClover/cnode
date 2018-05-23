<template>
  <div class="loginPanel" :class="{'on':isShowLoginPanel}">
    <div>
      <img class="log" src="../assets/img/log.jpg" />
    </div>
    <div class="content">
      <div class="line1">
        <textarea v-model="token" placeholder="请输入登陆Token" />
      </div>
      <div class="btn" @click="login">
        登陆验证
      </div>
      <span class="close" @click="closeLogin()">
        <i class="fa fa-close"></i>
      </span>
      <div class="author" @click="aboutme()"></div>
      <div class="findToken">
        <span>没有登陆Token?</span>
        <a href="https://cnodejs.org/signin">点击获取</a>
      </div>
    </div>
    <div class="footer">
      <div>
        <a href="https://github.com/FourLeafClover/vue-cnode">
          <i class="fa fa-github"></i>
          Github
        </a>
      </div>
      <div class="aboutme">
        <a href="http://47.97.172.44/aboutme/">
          <i class="fa fa-user-circle"></i>关于我</a>
      </div>
    </div>
  </div>
</template>

<script>
  import user from "../service/user";
  export default {
    name: "login",
    data() {
      return {
        isShowLoginPanel: false,
        token: ""
      };
    },
    methods: {
      closeLogin() {
        this.$set(this.$data, "isShowLoginPanel", false);
      },
      login() {
        if (this.token) {
          user.login(this.token, () => {
            this.closeLogin();
            this.$root.$emit("EVENT_LOGINOPERATOR");
          });
        }
      },
      aboutme() {
        window.location.href = "http://47.97.172.44/aboutme/";
      }
    },
    mounted() {
      this.$root.$on("Event_OPENLOGIN", () => {
        this.$set(this.$data, "isShowLoginPanel", true);
      });
    }
  };
</script>

<style scoped>
  .loginPanel {
    position: fixed;
    top: 0px;
    background-color: white;
    box-shadow: 1px 1px 1px 1px grey;
    z-index: 1000;
    width: 100%;
    height: 100%;
    transform: translateY(100%);
    transition: all 0.5s;
    padding-top: 20px;
  }

  .loginPanel.on {
    transition: all 0.5s;
    transform: translateY(0);
  }

  .loginPanel .log {
    width: 50%;
    position: absolute;
    top: 20px;
    left: 50%;
    width: 100px;
    transform: translateX(-50%);
  }

  .loginPanel .line1 {
    margin-top: 60px;
  }

  .loginPanel textarea {
    line-height: 25px;
    height: 300px;
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 18px;
    padding: 20px;
  }

  .loginPanel .content {
    padding: 0 20px;
  }

  .btn {
    margin: 0 auto;
    padding: 5px;
    border-radius: 5px;
    background-color: green;
    right: 20px;
    top: 20px;
    color: 20px;
    text-align: center;
    letter-spacing: 5px;
    color: white;
    margin-top: 10px;
    width: 100%;
    padding: 5px 0px;
  }

  .close {
    position: fixed;
    left: 20px;
    top: 20px;
    font-size: 25px;
    color: gray;
  }

  .author {
    position: fixed;
    right: 20px;
    top: 20px;
    height: 30px;
    width: 30px;
    background-size: contain;
    background-image: url(http://47.97.172.44/aboutme/assets/img/log3.jpg);
    border-radius: 50%;
  }

  .findToken {
    width: 100%;
    text-align: right;
    padding-top: 10px;
  }

  .footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 10px 0px;
  }

  .footer>div {
    width: 50%;
    float: left;
    font-size: 15px;
    text-align: center;
  }
</style>