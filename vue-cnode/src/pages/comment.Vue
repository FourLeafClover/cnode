<template>
  <layout :title="title">
    <div class="commentPanel" v-if="detail!=null">
      <div class="comment" v-if="detail.replies.length>0">
        <div class="item" v-for="item in detail.replies" :key="item.id">
          <div class="line1">
            <img :src="item.author.avatar_url" @click="gotoZone(item.author.loginname)" />
            <span class="name" @click="gotoZone(item.author.loginname)">{{item.author.loginname}}</span>
          </div>
          <div class="line2" v-html="item.content"></div>
          <div class="line3">
            <span class="fa fa-trash-o" v-if="false" @click="likeComment(item)">
              <i class="fa fa-star-o"></i>点赞</span>
            <span class="star" :class="{'active':item.is_uped}" @click="likeComment(item)">
              <i class="fa fa-thumbs-o-up"></i>点赞</span>
            <span class="item" @click="reply(item)">
              <i class="fa fa-reply"></i>回复</span>
          </div>
        </div>
        <div class="end">
          -- END --
        </div>
        <div style="height:120px"></div>
      </div>
      <div style="padding-top:80px" v-else>
        <v-empty></v-empty>
      </div>
      <div class="inputComment">
        <div v-if="replyComment!=null" class="replyComment">
          回复:
          <span>{{replyComment.author.loginname}}</span>
          <span class="remove" @click="removeReply()">
            <i class="fa fa-remove"></i>
          </span>
        </div>
        <div class="input">
          <input placeholder="请输入评论" v-model="content" />
          <span @click="addComment()" class="send">
            <i class="fa fa-send"></i>
          </span>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
  import cnode from "../service/cnode";
  import layout from "../component/layout1";
  import userSvc from "../service/user";
  import empty from "../component/empty";

  export default {
    data() {
      return {
        detail: null,
        replyComment: null,
        content: "",
        title: "",
        myReplys: []
      };
    },
    components: {
      layout: layout,
      'v-empty': empty
    },
    created() {
      //this.init();
    },
    methods: {
      init() {
        cnode.loadTopicDetail(this.$route.query.id, result => {
          this.$set(this.$data, "detail", result);
          if (result.replies) {
            this.$set(this.$data, "title", `评论[${result.replies.length}]`);
          } else {
            this.$set(this.$data, "title", "暂无评论");
          }
        });
      },
      likeComment(item) {
        userSvc.likeComment(item.id, () => {
          item.is_uped = !item.is_uped;
          this.$set(this.$data, "mycomments", this.mycomments);
        });
      },
      reply(item) {
        this.$set(this.$data, "replyComment", item);
      },
      removeReply() {
        this.$set(this.$data, "replyComment", null);
      },
      addComment(cb) {
        if (this.content.length > 0) {
          let content = "";
          let htmlContent = "";
          let replyId = '';
          if (this.replyComment) {
            replyId = this.replyComment.id;
            let loginname = this.replyComment.author.loginname;
            content =
              `[@${loginname}](/user/${loginname})        ${this.content}       [~From Frank.Cnode](https://github.com/FourLeafClover/vue-cnode)`;
            htmlContent =
              `<a href='${window.location.origin}${window.location.pathname}/#/user/${loginname}'>@${loginname}</a>     ${this.content}      <a href='https://github.com/FourLeafClover/vue-cnode'>~~~From Frank.Cnode</a?`;
          } else {
            content =
              `${this.content}       [~From Frank.Cnode](https://github.com/FourLeafClover/vue-cnode)`;
            htmlContent =
              ` ${this.content}      <a href='https://github.com/FourLeafClover/vue-cnode'>~From Frank.Cnode</a?`;
          }
          userSvc.addComment(
            this.detail.id,
            content,
            replyId,
            (result) => {
              let user = userSvc.getLoginUser();
              this.detail.replies.push({
                author: {
                  loginname: user.loginname,
                  avatar_url: user.avatar_url
                },
                content: htmlContent,
                is_uped: false,
                id: result
              });
            }
          );
        }
      },
      gotoZone(username) {
        this.$router.push({
          name: 'userzone',
          params: {
            username: username
          }
        })
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
  .comment {
    bottom: 0px;
    right: 0px;
    width: 100% !important;
    overflow: scroll;
    background-color: #f4f5f5;
    overflow-x: hidden;
    padding-top: 42px;
    -webkit-overflow-scrolling: touch;
  }

  .item {
    margin-bottom: 10px;
    background-color: white;
  }

  .line1 .name {
    color: blue;
    margin-left: 10px;
  }

  .line1 {
    margin-bottom: 10px;
  }

  .line1 {
    text-align: left;
    padding: 10px;
    border-bottom: 2px solid #f4f5f5;
  }

  .line1 img {
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }

  .line2 {
    padding: 0px 10px;
    text-align: left;
  }

  .line3 {
    padding: 10px;
    text-align: right;
  }

  .line3 i {
    margin-right: 10px;
  }

  .line3 span {
    margin-right: 10px;
  }

  .inputComment {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding-bottom: 15px;
    padding-top: 10px;
    background-color: #f4f5f5;
    z-index: 1000;
    padding-left: 20px;
    box-shadow: 2px 2px 2px 2px gray;
  }

  .inputComment .input {
    padding-right: 50px;
    padding-top: 10px;
  }

  .inputComment input {
    width: 100%;
    padding: 5px;
    font-size: 16px;
    border-color: white;
    border-radius: 5px;
  }

  .inputComment .send {
    position: absolute;
    color: #22c3aa;
    font-size: 20px;
    right: 20px;
    bottom: 20px;
  }

  .inputComment .back {
    background-color: #22c3aa;
    color: white;
    padding: 5px;
    padding-right: 5px;
    border-radius: 5px;
  }

  .star.active {
    color: red;
  }

  .star.active i {
    color: red;
  }

  .replyComment {
    padding: 10px 5px;
    color: gray;
    position: relative;
  }

  .replyComment span {
    color: blue;
    margin-left: 5px;
  }

  .replyComment .remove {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: gray;
  }

  .end {
    color: gray;
    text-align: center;
    font-size: 15px;
    padding-top: 10px;
  }
</style>