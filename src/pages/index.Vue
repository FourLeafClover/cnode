<template>
  <scroll myclass="topics"  
          :data="topicList"
          :pullup="pullup"
          @pullup="getTopics">
    <div class="tabs">
      <span @click="getTopics('')">全部</span>|
      <span @click="getTopics('good')">精华</span>|
      <span @click="getTopics('share')">分享</span>|
      <span @click="getTopics('ask')">回答</span>|
      <span @click="getTopics('job')">招聘</span>|
      <span class="active">客户端测试</span>
    </div>
    <div class="item" v-for="item in topicList" :key="item.id" @click="gotoTopicDetail(item.id)">
      <div class="line1">
        <span>{{item.author.name}}</span>
        <span> - {{item.createTime}} - </span>
        <span>{{item.tag}}</span>
      </div>
      <div class="line2">
        {{item.title}}
      </div>
      <div class="line3">
        <span>阅读:{{item.visitCount}}</span>
        <span class="collect">收藏</span>
      </div>
    </div>
  </scroll>
</template>
<script>
import cnode from "../service/cnode";
import scroll from "../component/pagescroll";
export default {
  data() {
    return {
      topicList: [],
      curpage: 1,
      curTab: "",
      pullup: true
    };
  },
  components: {
    scroll: scroll
  },
  created() {
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
      cnode.loadHomePage(page, "dev", list => {
        if (list.length > 0) {
          list.forEach(item => {
            this.topicList.push(item);
          });
          this.$set(this.$data, "topicList", this.topicList);
        }
      });
    }
  },
  activated() {},
  deactivated() {}
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

.item .line1 {
  font-size: 13px;
  color: gray;
  line-height: 30px;
}

.item .line2 {
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  letter-spacing: 1px;
  padding-bottom: 10px;
}

.item .line3 {
  padding-bottom: 10px;
  font-size: 13px;
  color: gray;
}

.collect {
  z-index: 2;
}
</style>