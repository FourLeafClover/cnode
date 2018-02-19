<template>
  <div class="detail" v-if="detail!=null">
    <div style="background-color:#f4f5f5;height:60px;width:100%"></div>
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
    <detailBottombar :comments="comments" :id="detail.id" :hascollected="detail.is_collect" v-if="detail!=null" />
    <detail-comment v-bind:comments="comments" v-if="detail!=null" />
  </div>
</template>
<script>
import cnode from "../service/cnode";
import BScroll from "better-scroll";
import detailBottombar from "../component/detailBottombar";
import detailComment from "../component/detailComment";
export default {
  data() {
    return {
      detail: null,
      comments: [],
      curId: 0
    };
  },
  components: {
    detailBottombar: detailBottombar,
    detailComment: detailComment
  },
  created() {
    this.curId = this.$route.query.id;
    this.init();
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
    init() {
      cnode.loadTopicDetail(this.curId, result => {
        this.$set(this.$data, "detail", result);
        if (result == null || result.replies.length == 0) {
          this.comments = [];
        } else {
          this.comments = result.replies;
        }
        this.$set(this.$data, "comments", this.comments);
      });
    }
  },
  activated() {
    this.curId = this.$route.query.id;
    this.init();
  },
  deactivated() {}
};
</script>
<style scoped>
.detail {
  width: 100%;
  background-color: white;
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
  height: 100%;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin-top: 15px;
  letter-spacing: 1px;
  background-color: white;
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