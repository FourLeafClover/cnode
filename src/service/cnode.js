import axios from "../utils/axios"
import common from "../service/common"

let buildTopicTag = (topic) => {
    let tags = [];
    if (topic.top) {
        tags.push("置顶");
    }
    if (topic.good) {
        tags.push("精华");
    }
    if (topic.tab) {
        let tab = topic.tab;
        if (tab == "share") {
            tags.push("分享");
        };
        if (tab == "ask") {
            tags.push("问答");
        }
        if (tab == "job") {
            tags.push("招聘")
        }
    }
    return tags.join("/");
}

let loadHomePage = (page, tab, cb) => {
    axios.get(`topics?page=${page}&tab=${tab}&limit=20&mdrender=false`).then((response) => {
        let result = [];
        if (response.success) {
            response.data.forEach(item => {
                result.push({
                    author: {
                        id: item.author_id,
                        name: item.author.loginname,
                        avtar: item.author.avatar_url
                    },
                    createTime: common.formatDate(item.create_at, "yyyy/MM/dd"),
                    title: item.title,
                    visitCount: common.buildVisitCount(item.visit_count),
                    tag: buildTopicTag(item),
                    content: common.buildTopicSummary(item.content).substr(0, 200),
                    id: item.id
                });
            });
        }
        cb(result);
    });
}

let loadTopicDetail = (id, cb) => {
    axios.get(`topic/${id}`).then((response) => {
        let topic = null;
        if (response.success) {
            let detail = response.data;
            detail.visit_count = common.buildVisitCount(detail.visit_count);
            detail.last_reply_at = common.formatDate(detail.last_reply_at, "yyyy/MM/dd");
            detail.content = common.buildTopicSummary(detail.content);
            detail.tag = buildTopicTag(detail)
            if (detail.replies && detail.replies.length > 0) {
                detail.replies.forEach(item => {
                    item.create_at = common.formatDate(item.create_at, "yyyy/MM/dd");
                });
            }
            topic = detail;
        }
        cb(topic);
    })
}

export default {
    loadHomePage: loadHomePage,
    loadTopicDetail: loadTopicDetail
}