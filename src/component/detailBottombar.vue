<template>
	<div class="footer clearfix">
        <div>
            <div class="item" @click="collect()" style="color:red" v-show="isCollected">
                <i class="fa fa-star" ></i><br/>
                <span>收藏</span>
            </div>
            <div class="item" @click="collect()" v-if="isCollected==false">
                <i class="fa fa-star" ></i><br/>
                <span>收藏</span>
            </div>
        </div>
        <div>
            <div class="item" >
                <div @click="showComment()">
                  <i class="fa fa-commenting"></i><br/>
                  <span>评论({{commentLength}})</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import detailComment from "./detailComment";
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
      commentLength: this.topic.replies.length,
      isCollected: this.topic.is_collect
    };
  },
  components: {
    detailComment: detailComment
  },
  methods: {
    showComment() {
      this.$root.$emit("EVENT_COMMENT_SHOW", true);
    },
    collect() {
      if (this.isCollected) {
        userSvc.unCollectTopic(this.topic.id, () => {
          this.$set(this.$data, "isCollected", false);
        });
      } else {
        userSvc.collectTopic(this.topic.id, () => {
          this.$set(this.$data, "isCollected", true);
        });
      }
    }
  },
  deactivated() {
    this.$root.$emit("EVENT_COMMENT_SHOW", false);
  }
};
</script>

<style scoped>
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f4f5f5;
  z-index: 999;
}

.footer div {
  width: 50%;
  float: left;
  margin-bottom: 5px;
  text-align: center;
}

.footer .item {
  padding-top: 8px;
  color: gray;
  margin-left: 50%;
  transform: translateX(-50%);
}

.footer .item a {
  color: gray;
  font-size: 16px;
  font-weight: bold;
}

.footer .item.active a {
  color: white;
}

.footer .item.active {
  border-bottom: 2px solid white;
}

.item i {
  font-size: 12px;
  display: inline-block;
  margin-bottom: 5px;
}

.item span {
  font-size: 10px;
}

.clearfix:after {
  /*最简方式*/
  content: "";
  display: block;
  clear: both;
}
</style>