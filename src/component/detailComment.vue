<template>
    <div :class="{'show':isShowComment}" class="commentPanel">
      	<div class="comment">
         <div class="item" v-for="item in mycomments" v-if="mycomments.length>0" :key="item.id">
            <div class="line1">
                <img :src="item.author.avatar_url" />
                <span class="name">{{item.author.loginname}}</span>
            </div>
            <div class="line2" v-html="item.content">
            </div>
            <div class="line3">
              <span class="fa fa-trash-o" v-if="false" @click="likeComment(item)"><i class="fa fa-star-o"></i>点赞</span>
              <span class="star" :class="{'active':item.is_uped}" @click="likeComment(item)"><i class="fa fa-thumbs-o-up"></i>点赞</span>
              <span class="item" @click="reply(item)"><i class="fa fa-reply"></i>回复</span>
            </div>
        </div>
        <div style="height:80px"></div>
      </div>
      <div class="inputComment">
          <div v-if="replyComment!=null" class="replyComment">
             回复:<span>{{replyComment.author.loginname}}</span>
             <span class="remove" @click="removeReply()"><i class="fa fa-remove"></i></span>
          </div>
          <div>
            <span class="back" @click="hideComment()">取消</span>
            <input placeholder="请输入评论" v-model="content" />
            <span @click="addComment()"><i class="fa fa-send"></i></span>
          </div>
      </div>
    </div>
</template>

<script>
import userSvc from "../service/user";

export default {
  name: "detailBottombar",
  props: {
    topic: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isShowComment: false,
      mycomments: this.topic.replies,
      replyComment: null,
      content: "",
      myAddComment: []
    };
  },
  mounted() {
    this.$root.$on("EVENT_COMMENT_SHOW", isShow => {
      this.$set(this.$data, "isShowComment", isShow);
    });
  },
  methods: {
    hideComment() {
      this.$set(this.$data, "isShowComment", false);
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
    addComment() {
      userSvc.addComment(
        this.topic.id,
        this.replyComment ? this.replyComment.id : "",
        () => {
          alert("评论成功");
        }
      );
    }
  }
};
</script>

<style scoped>
.commentPanel {
  display: none;
}

.commentPanel.show {
  display: inline;
}

.comment {
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 100%;
  width: 100% !important;
  overflow: scroll;
  background-color: #f4f5f5;
  overflow-x: hidden;
  z-index: 10;
  box-shadow: 2px 2px 2px 2px grey;
  padding-top: 60px;
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
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: #f4f5f5;
  z-index: 10000;
  padding-left: 20px;
}

.inputComment input {
  width: 80%;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 1px solid gray;
  padding: 10px;
  font-size: 18px;
}

.inputComment .back {
  background-color: green;
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
  padding: 5px;
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
</style>