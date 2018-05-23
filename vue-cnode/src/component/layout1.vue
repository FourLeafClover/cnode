<template>
  <div class="main">
    <div class="header">
      <span class="back" @click="goBack()">
        <i class="fa fa-chevron-left">Back</i>
      </span>
      <span class="more">
        <i class="fa fa-home" @click="goHome()"></i>
      </span>
      <span>
        <i>{{title}}</i>
      </span>
    </div>
    <slot>
    </slot>
  </div>
</template>

<script>
  import userSvc from "../service/user";
  export default {
    name: "loading",
    props: {
      title: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        isShowTabs: false,
        loginUser: null,
        isMemberAccountPanelShow: false
      };
    },
    methods: {
      goBack() {
        history.go(-1);
      },
      goHome() {
        this.$router.push({
          path: "/"
        });
      },
      showTab() {
        this.$set(this.$data, "isShowTabs", !this.isShowTabs);
      },
      gotoTab(url) {
        this.$set(this.$data, "isShowTabs", false);
        this.$router.push({
          path: url
        });
      },
      login() {
        this.$root.$emit("Event_OPENLOGIN");
      },
      setLoginUser() {
        this.$set(this.$data, "loginUser", userSvc.getLoginUser());
      },
      toggleMemberAccountPanel() {
        this.$set(
          this.$data,
          "isMemberAccountPanelShow", !this.isMemberAccountPanelShow
        );
      }
    },
    mounted() {
      this.setLoginUser();
      this.$root.$on("EVENT_LOGINOPERATOR", () => {
        this.setLoginUser();
      });
    }
  };
</script>

<style scoped>
  .header .back {
    position: absolute;
    left: 10px;
  }

  .header span i {
    line-height: 40px;
    color: gray;
    font-size: 20px;
  }

  .header .more {
    position: absolute;
    right: 10px;
  }

  .header {
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    border-bottom: 2px solid #f4f5f5;
    text-align: center;
    z-index: 100;
  }
</style>