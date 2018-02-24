<template>
  <layout>
    <div class="detail" v-if="detail!=null">
      <div style="background-color:#f4f5f5;height:42px;width:100%"></div>
      <div class="content">
        <div class="title">
          {{detail.title}}
        </div>
        <div class="line1">
          <span class="time">
            阅读:{{detail.visit_count}}&nbsp;&nbsp;&nbsp; 评论:{{detail.reply_count}} &nbsp;&nbsp;&nbsp;{{detail.last_reply_at}} &nbsp;&nbsp;&nbsp;
            <a style="color:blue;font-weight:bold">{{detail.author.loginname}}</a>
          </span>
        </div>
        <div class="markdown" v-html="detail.content"></div>
        <div style="height:80px;"></div>
      </div>
    </div>
    <detailBottombar :topic="detail" />
  </layout>
</template>
<script>
  import cnode from "../service/cnode";
  import BScroll from "better-scroll";
  import detailBottombar from "../component/detailBottombar";
  import layout from "../component/layout1";
  export default {
    data() {
      return {
        detail: null
      };
    },
    components: {
      detailBottombar: detailBottombar,
      layout: layout
    },
    created() {},
    methods: {
      init() {
        cnode.loadTopicDetail(this.$route.query.id, result => {
          this.$set(this.$data, "detail", result);
          document.title = `${result.title}|vue by frank`;
        });
      }
    },
    activated() {
      if (this.detail == null || (this.$route.query.id != this.detail.id)) {
        this.init();
      }
    }
  };
</script>
<style scoped>
  .detail {
    width: 100%;
    background-color: white;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    margin-top: 15px;
    letter-spacing: 1px;
    background-color: white;
    word-break: break-word;
    line-height: 30px;
  }

  .line1 {
    margin-top: 10px;
  }

  .line1 .time {
    color: gray;
    font-size: 12px;
  }

  .line1 .author a {
    color: lightseagreen;
    margin-left: 10px;
  }

  .detail .content {
    padding: 10px;
    background-color: white;
  }

  .markdown {
    margin-top: 20px;
  }
</style>