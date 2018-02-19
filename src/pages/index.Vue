<template>
   <div class="topics">
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
   </div>
</template>
<script>
import cnode from "../service/cnode";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      topicList: [],
      curpage: 1,
      curTab: ""
    };
  },
  components: {},
  created() {
    let tab = this.$route.query.tab ? this.$route.query.tab : "";
    this.curTab = this.$route.query.tab;
    cnode.loadHomePage(this.curpage, "dev", list => {
      if (list.length > 0) {
        list.forEach(item => {
          this.topicList.push(item);
        });
        this.$set(this.$data, "topicList", this.topicList);
      }
    });
  },
  methods: {
    gotoTopicDetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id: id
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

.item {
  margin-top: 10px;
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