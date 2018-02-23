<template>
  <div>
    <span class="back" @click="goBack()">
      <i data-v-6f9d74bb="" class="fa fa-chevron-left">&nbsp;Back</i>
    </span>
    <span class="home" @click="goHome">
      <i class="fa fa-home"></i>
    </span>
    <div v-if="detail!=null">
      <div class="zone_header">
        <img :src="detail.avatar_url" />
        <span class="loginname">{{detail.loginname}}</span>
      </div>
      <div class="tabs">
        <div class="tab" :class="{'active':activeTab==1}" @click="changeTab(1)">
          <span>最近浏览[{{detail.recent_topics.length}}]</span>
        </div>
        <div class="tab" :class="{'active':activeTab==2}" @click="changeTab(2)">
          <span>最近评论[{{detail.recent_replies.length}}]</span>
        </div>
        <div class="tab" :class="{'active':activeTab==3}" @click="changeTab(3)">
          <span>收藏[{{collects.length}}]</span>
        </div>
      </div>
      <div v-show="activeTab==1">
        <div v-if="detail.recent_topics.length>0">
          <div class="item" v-for="item in detail.recent_topics" :key="item.id" @click="gotoDetail(item.id)">
            <div class="avtar">
              <img :src="item.author.avatar_url" /> {{item.author.loginname}}
            </div>
            <div class="title">
              {{item.title}}
            </div>
          </div>
        </div>
        <v-empty v-else></v-empty>
      </div>
      <div v-show="activeTab==2">
        <div v-if="detail.recent_replies.length>0">
          <div class="item" v-for="item in detail.recent_replies" :key="item.id" @click="gotoDetail(item.id)">
            <div class="avtar">
              <img :src="item.author.avatar_url" /> {{item.author.loginname}}
            </div>
            <div class="title">
              {{item.title}}
            </div>
          </div>
        </div>
        <v-empty v-else></v-empty>
      </div>
      <div v-show="activeTab==3">
        <div v-if="collects.length>0">
          <div class="item" v-for="item in collects" :key="item.id" @click="gotoDetail(item.id)">
            <div class="avtar">
              <img :src="item.author.avatar_url" /> {{item.author.loginname}}
            </div>
            <div class="title">
              {{item.title}}
            </div>
          </div>
        </div>
        <v-empty v-else></v-empty>
      </div>
    </div>
  </div>
</template>
<script>
  import cnode from "../service/cnode";
  import layout from "../component/layout1";
  import empty from "../component/empty";
  export default {
    data() {
      return {
        detail: null,
        activeTab: 1,
        collects: []
      };
    },
    components: {
      layout: layout,
      'v-empty': empty
    },
    methods: {
      init() {
        let username = this.$route.params.username;
        cnode.loadUser(username, result => {
          this.$set(this.$data, "detail", result);
          document.title = `${username}的空间`;
        });
        cnode.loadUserCollect(username, result => {
          this.$set(this.$data, "collects", result)
        })
      },
      gotoDetail(id) {
        this.$router.push({
          path: "/detail",
          query: {
            id: id
          }
        });
      },
      changeTab(tab) {
        this.$set(this.$data, "activeTab", tab);
      },
      goBack() {
        history.go(-1);
      },
      goHome() {
        this.$router.push({
          path: "/"
        });
      }
    },
    activated() {
      this.init();
    },
    deactivated() {
      this.$set(this.$data, "detail", null);
    }
  };
</script>
<style scoped>
  .zone_header {
    background-color: #22c3aa;
    height: 200px;
  }

  .zone_header img {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    height: 120px;
    border-radius: 50%;
  }

  .zone_header .loginname {
    position: absolute;
    top: 160px;
    line-height: 20px;
    font-weight: bold;
    color: white;
    text-align: center;
    width: 100%;
  }

  .tabs {
    height: 50px;
  }

  .tabs .tab {
    width: 33.3%;
    text-align: center;
    float: left;
    padding: 10px;
    color: gray;
  }

  .tabs .tab.active span {
    color: #22c3aa;
    border-bottom: 2px solid #22c3aa;
    padding-bottom: 5px;
  }

  .item {
    margin-bottom: 10px;
    padding: 0px 20px;
    background-color: white;
  }

  .item .avtar img {
    border: 0;
    vertical-align: middle;
    width: 25px;
    border-radius: 50%;
    margin-top: -6px;
  }

  .item .avtar {
    padding-top: 5px;
    font-size: 15px;
    color: gray;
    line-height: 35px;
    padding-bottom: 10px;
  }

  .item .title {
    padding-bottom: 10px;
  }

  .back {
    position: absolute;
    left: 10px;
    top: 10px;
    color: white;
  }

  .home {
    position: absolute;
    right: 10px;
    top: 10px;
    color: white;
    font-size: 23px;
  }
</style>