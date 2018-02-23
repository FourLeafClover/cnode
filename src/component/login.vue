<template>
  <div class="loginPanel" v-show="isShowLoginPanel">
    <div>
      <img src="../assets/img/log.jpg" />
    </div>
    <div class="line1">
      <textarea v-model="token" placeholder="请输入登陆Token" />
    </div>
    <div class="btn" @click="login">
      验证
    </div>
    <span class="close" @click="closeLogin()">
      <i class="fa fa-close"></i>
    </span>
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
        } else {
          alert("请输入token");
        }
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
    top: 30%;
    margin: 0 auto;
    transform: translate(-50%);
    background-color: white;
    box-shadow: 1px 1px 1px 1px grey;
    z-index: 1000;
    left: 50%;
    padding: 20px;
    width: 80%;
    border-radius: 10px;
  }

  .loginPanel img {
    width: 50%;
    position: absolute;
    top: 10px;
    left: 20px;
  }

  .loginPanel .line1 {
    margin-top: 60px;
  }

  .loginPanel textarea {
    line-height: 25px;
    height: 80px;
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 18px;
  }

  .btn {
    margin: 0 auto;
    padding: 5px;
    border-radius: 5px;
    width: 100px;
    background-color: green;
    margin-top: 15px;
    color: 20px;
    text-align: center;
    letter-spacing: 5px;
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 25px;
    color: gray;
  }
</style>