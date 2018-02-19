<template>
	<div class="footer clearfix">
        <div>
            <div class="item" @click="collect()" style="color:red" v-show="myhascollected">
                <i class="fa fa-star" ></i><br/>
                <span>收藏</span>
            </div>
            <div class="item" @click="collect()" v-if="myhascollected==false">
                <i class="fa fa-star" ></i><br/>
                <span>收藏</span>
            </div>
        </div>
        <div>
            <div class="item" @click="showComment()">
                <i class="fa fa-commenting"></i><br/>
                <span>评论</span>
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
    test: {
      type: String
    },
    hascollected: {
      type: Boolean,
      default: false
    },
    isComment: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    comments: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      mycomments: this.comments,
      myhascollected: this.hascollected
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
      if (this.myhascollected) {
        userSvc.unCollectTopic(this.id, () => {
          this.$set(this.$data, "myhascollected", false);
        });
      } else {
        userSvc.collectTopic(this.id, () => {
          this.$set(this.$data, "myhascollected", true);
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
  width: 40px;
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