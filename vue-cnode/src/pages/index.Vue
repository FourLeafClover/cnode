<template>
  <layout>
    <scroll myclass="topics" :data="topicList" :pullup="pullup" :pageSize="pageSize" @pullup="getTopics">
      <div class="tabs">
        <span @click="changeTab('')" :class="{'active':curTab==''}">全部</span>|
        <span @click="changeTab('good')" :class="{'active':curTab=='good'}">精华</span>|
        <span @click="changeTab('share')" :class="{'active':curTab=='share'}">分享</span>|
        <span @click="changeTab('ask')" :class="{'active':curTab=='ask'}">回答</span>|
        <span @click="changeTab('job')" :class="{'active':curTab=='job'}">招聘</span>|
        <span @click="changeTab('dev')" :class="{'active':curTab=='dev'}">测试</span>
      </div>
      <div class="item" v-for="item in topicList" :key="item.id">
        <div class="line1">
          <span>
            <img :src="item.author.avtar" @click="gotoZone(item.author.name)" />
          </span>
          <span @click="gotoZone(item.author.name)">{{item.author.name}}</span>
          <span> - {{item.createTime}} - </span>
          <span>{{item.tag}}</span>
        </div>
        <div class="line2" @click="gotoTopicDetail(item.id)">
          {{item.title}}
        </div>
        <div class="topicSummary" v-html="item.content" @click="gotoTopicDetail(item.id)"></div>
        <div class="line3" @click="gotoTopicDetail(item.id)">
          <span>阅读量:&nbsp;{{item.visitCount}}</span>
          <span style="margin-left:20px;">评论数:&nbsp;{{item.replyCount}}</span>
        </div>
      </div>
    </scroll>
  </layout>
</template>
<script>
  import layout from "../component/layout";
  import cnode from "../service/cnode";
  import scroll from "../component/pagescroll";
  import common from "../service/common";
  export default {
    data() {
      return {
        topicList: [],
        curpage: 1,
        curTab: "",
        pullup: true,
        pageSize: 10
      };
    },
    components: {
      scroll: scroll,
      layout: layout
    },
    created() {
      /*if (common.getClientType() == "PC") {
        this.$root.$emit("EVENT_SHOWTOAST", {
          content: "PC浏览器请使用鼠标左键上下拖动页面来实现翻页加载数据,原因:Better Scroll插件,不支持通过滚动鼠标转轮,或者拖动浏览器滚动条",
          type: "warning",
          time: 4000
        });
      }*/
      this.getTopics(1);
    },
    methods: {
      gotoTopicDetail(id) {
        this.$router.push({
          path: "/detail",
          query: {
            id: id
          }
        });
      },
      getTopics(page) {
        cnode.loadHomePage(page, this.pageSize, this.curTab, list => {
          if (list.length > 0) {
            list.forEach(item => {
              this.topicList.push(item);
            });
            this.$set(this.$data, "topicList", this.topicList);
          }
        });
      },
      gotoZone(username) {
        this.$router.push({
          name: "userzone",
          params: {
            username: username
          }
        });
      },
      changeTab(tab) {
        this.curTab = tab;
        this.$set(this.$data, "topicList", []);
        this.getTopics(1);
      }
    },
    activated() {
      document.title = "Cnode|vue by frank";
    }
  };
</script>
<style scoped>
  .topics {
    padding-top: 50px;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    height: 100%;
  }

  .tabs {
    padding: 10px 20px;
    background-color: white;
    border-bottom: 3px solid #f4f5f5;
    color: #f4f5f5;
  }

  .tabs {
    overflow-x: auto;
  }

  .tabs span {
    padding-left: 5px;
    padding-right: 5px;
    color: gray;
  }

  .tabs span.active {
    color: #007fff;
  }

  .item {
    margin-bottom: 10px;
    padding: 0px 20px;
    background-color: white;
  }

  .item img {
    border: 0;
    vertical-align: middle;
    width: 25px;
    border-radius: 50%;
    margin-top: -6px;
  }

  .item .line1 {
    font-size: 15px;
    color: gray;
    line-height: 35px;
    z-index: 10;
  }

  .item .line2 {
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    letter-spacing: 1px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .item .line3 {
    padding-bottom: 10px;
    margin-top: 10px;
    font-size: 15px;
    color: gray;
  }
</style>

<style>
  .item .topicSummary img {
    display: none !important;
  }

  .item .topicSummary p,
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-size: 14px !important;
    color: gray !important;
  }

  .item .topicSummary {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
</style>