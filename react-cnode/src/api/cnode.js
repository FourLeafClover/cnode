import axios from "../utils/axios"

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
        if (tab === "share") {
            tags.push("分享");
        };
        if (tab === "ask") {
            tags.push("问答");
        }
        if (tab === "job") {
            tags.push("招聘")
        }
        if (tab === "dev") {
            tags.push("测试")
        }
    }
    return tags.join("/");
}

let loadHomePage = (page, pagesize, tab, cb) => {
    axios.get(`topics?page=${page}&tab=${tab}&limit=${pagesize}&mdrender=false`).then((response) => {
        let result = [];
        if (response.success) {
            response.data.forEach(item => {
                result.push({
                    author: {
                        id: item.author_id,
                        name: item.author.loginname,
                        avatar: item.author.avatar_url
                    },
                    createTime: item.create_at,
                    title: item.title,
                    visitCount: item.visit_count,
                    replyCount: item.reply_count,
                    tag: buildTopicTag(item),
                    content: item.content,
                    id: item.id
                });
            });
        }
        cb(result);
    });
}

let loadTopicDetail = (id) => {
    return axios.get(`topic/${id}`);
}

let loadUser = (username) => {
    return axios.get(`user/${username}`);
}

let loadUserCollect = (username) => {
    return axios.get(`topic_collect/${username}`);
}

let login = (auth) => {
    return axios.post(`accesstoken?accesstoken=${auth}`);
}

let collectTopic = (id) => {
    return axios({
        method: 'post',
        url: 'topic_collect/collect',
        data: {
            topic_id: id
        },
        isAuth: true
    });
}

let unCollectTopic = (id) => {
    return axios({
        method: 'post',
        url: 'topic_collect/de_collect',
        data: {
            topic_id: id
        },
        isAuth: true
    })
}

let addComment = (topicId, content, replyId) => {
    return axios({
        method: 'post',
        url: `topic/${topicId}/replies`,
        data: {
            reply_id: replyId,
            content: content
        },
        isAuth: true
    })
}

let likeComment = (commentId) => {
    return axios({
        method: 'post',
        url: `/reply/${commentId}/ups`,
        isAuth: true
    });
}

let loadMessage = () => {
    return axios({
        method: 'get',
        url: `/messages`,
        params: {
            mdrender: false
        },
        isAuth: true
    })
}

let loadMessageCount = () => {
    return axios({
        method: 'get',
        url: `/message/count`,
        isAuth: true
    })
}

let readMessage = (messageid, cb) => {
    return axios({
        method: "post",
        url: `/message/mark_one/${messageid}`,
        isAuth: true
    })
}


export default {
    loadHomePage: loadHomePage,
    loadTopicDetail: loadTopicDetail,
    loadUser: loadUser,
    loadUserCollect: loadUserCollect,
    login: login,
    collectTopic: collectTopic,
    unCollectTopic: unCollectTopic,
    addComment: addComment,
    likeComment: likeComment,
    loadMessage: loadMessage,
    loadMessageCount: loadMessageCount,
    readMessage: readMessage
}