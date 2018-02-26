<template>
  <div class="main">
    <div class="header">
      <div class="content">
        <img class="log" src="../assets/img/log1.jpg" />
        <div class="tab">
          <span>Cnode</span>
        </div>
        <span class="message" v-show="loginUser!=null" :class="{active:messageCount>0}" @click="gotoMessage">
          <i class="fa fa-bell"></i>
          <i class="num" v-show="messageCount>0">{{messageCount}}</i>
        </span>
        <div class="login" @click="login" v-if="loginUser==null">
          <span>登录</span>
        </div>
        <div class="memberaccount" v-if="loginUser!=null" @click="toggleMemberAccountPanel()">
          <img :src="loginUser.avatar_url" />
        </div>
        <div class="memberaccountPanel" v-show="isMemberAccountPanelShow">
          <div class="item" style="display:none">
            写文章
          </div>
          <div class="item" @click="gotoZone()">
            我的主页
          </div>
          <div class="item" @click="aboutme()">
            关于作者
          </div>
          <div class="item" @click="gotoGithub()">
            源码
          </div>
          <div class="item" @click="loginout()">
            注销
          </div>
        </div>
      </div>
      <div class="tabs" v-show="isShowTabs">
        <div class="tab" v-for="tab in tabs" :key="tab.name">
          <div @click="gotoTab(tab.url)">{{tab.name}}</div>
        </div>
      </div>
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
      activeId: {
        type: String
      }
    },
    data() {
      return {
        tabs: [{
            name: "首页",
            url: ""
          },
          {
            name: "精华",
            url: ""
          },
          {
            name: "问答",
            url: ""
          },
          {
            name: "招聘",
            url: ""
          }
        ],
        isShowTabs: false,
        loginUser: null,
        isMemberAccountPanelShow: false,
        messageCount: 0
      };
    },
    methods: {
      loadMessageCount() {
        userSvc.loadMessageCount((count) => {
          this.$set(this.$data, "messageCount", count);
        });
      },
      gotoMessage() {
        this.$router.push({
          path: "/message"
        });
      },
      gotoZone() {
        this.$router.push({
          name: "userzone",
          params: {
            username: this.loginUser.loginname
          }
        });
        this.toggleMemberAccountPanel();
      },
      showTab() {
        this.$set(this.$data, "isShowTabs", !this.isShowTabs);
      },
      gotoTab(url) {
        this.$set(this.$data, "isShowTabs", false);
        this.$router.push({
          path: url
        });
        this.toggleMemberAccountPanel();
      },
      login() {
        this.$root.$emit("Event_OPENLOGIN");
      },
      loginout() {
        userSvc.loginOut();
        window.location.reload();
      },
      setLoginUser() {
        this.$set(this.$data, "loginUser", userSvc.getLoginUser());
        if (this.loginUser) {
          this.loadMessageCount();
        }
      },
      toggleMemberAccountPanel() {
        this.$set(
          this.$data,
          "isMemberAccountPanelShow", !this.isMemberAccountPanelShow
        );
      },
      issue() {
        window.location.href = "https://github.com/FourLeafClover/vue-cnode/issues";
        this.toggleMemberAccountPanel();
      },
      aboutme() {
        window.location.href = "http://47.97.172.44/aboutme";
        this.toggleMemberAccountPanel();
      },
      gotoGithub() {
        window.location.href = "https://github.com/FourLeafClover/vue-cnode";
        this.toggleMemberAccountPanel();
      }
    },
    mounted() {
      this.setLoginUser();
      this.$root.$on("EVENT_LOGINOPERATOR", () => {
        this.setLoginUser();
      });
      this.$root.$on("EVENT_RELOADMESSAGECOUNT", () => {
        this.loadMessageCount();
      });
    }
  };
</script>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
  }

  .header>.content .tab {
    position: absolute;
    left: 70px;
    top: 10px;
    line-height: 30px;
    font-size: 18px;
    color: dodgerblue;
    font-weight: bold;
    font-style: normal;
  }

  .header>.content {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 50px;
    width: 100%;
    background-color: white;
    z-index: 100;
    border-bottom: 2px solid #f4f5f5;
  }

  .header>.content .log {
    height: 40px;
    margin: 5px 0px 5px 20px;
  }

  .header>.content .down {
    height: 30px;
    transform: translateY(2px);
  }

  .header>.tabs {
    position: absolute;
    top: 51px;
    left: 80px;
    background-color: white;
    box-shadow: 2px 1px 2px 2px antiquewhite;
    padding: 10px;
    z-index: 100;
  }

  header>.content>.tab {
    margin-left: 10px;
  }

  .header>.tabs>.tab {
    line-height: 40px;
    font-size: 18px;
    padding: 0 10px;
  }

  .login {
    color: turquoise;
    position: absolute;
    right: 20px;
    line-height: 50px;
    top: 0px;
  }

  .header .message {
    color: gray;
    position: absolute;
    right: 70px;
    top: 0px;
  }

  .header .message.active i {
    color: red;
  }

  .header .message .fa-bell {
    line-height: 50px;
    font-size: 20px;
  }

  .header .message .num {
    font-size: 16px;
  }

  .memberaccount {
    color: turquoise;
    position: absolute;
    right: 20px;
    line-height: 50px;
    top: 0px;
  }

  .memberaccount>img {
    height: 30px;
    border-radius: 50%;
    margin-top: 10px;
  }

  .memberaccountPanel {
    position: fixed;
    right: 10px;
    background: white;
    margin-top: 12px;
    width: 100px;
    text-align: left;
    padding: 10px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  }

  .memberaccountPanel .item {
    padding: 10px 0px;
    color: gray;
    font-size: 14px;
    border-bottom: 2px solid #f4f5f5;
  }
</style>