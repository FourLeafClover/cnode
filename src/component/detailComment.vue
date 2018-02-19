<template>
    <div :class="{'show':isShowComment}" class="commentPanel">
      	<div class="comment">
         <div class="item" v-for="item in comments" v-if="comments.length>0" :key="item.id">
            <div class="line1">
                <img :src="item.author.avatar_url" />
                <span class="name">{{item.author.loginname}}</span>
            </div>
            <div class="line2" v-html="item.content">
            </div>
            <div class="line3">
              <span class="back"><i class="fa fa-star-o"></i>点赞</span>
              <span class="item"><i class="fa fa-heart-o"></i>收藏</span>
            </div>
        </div>
        <div style="height:80px"></div>
      </div>
      <div class="inputComment">
          <span class="back" @click="hideComment()">取消</span>
          <input placeholder="请输入评论" />
          <span><i class="fa fa-send"></i></span>
      </div>
    </div>
</template>

<script>
export default {
  name: "detailBottombar",
  props: {
    comments: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      isShowComment: false
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
</style>