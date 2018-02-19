import store from "../utils/store";
import axios from "../utils/axios";
let loginUserKey = "Cnode_LoginUserAuth";

let isLogin = () => {
    return store.getObject(loginUserKey);
}

let loginOut = () => {
    return store.clear(loginUserKey);
}

let login = (auth, cb) => {
    axios.post(`accesstoken?accesstoken=${auth}`).then(response => {
        if (response.success) {
            let loginUser = {
                loginname: response.loginname,
                avatar_url: response.avatar_url,
                id: response.id,
                accesstoken: auth
            };
            store.setObject(loginUserKey, loginUser);
            cb(loginUser);
        }
    });
}

let getLoginUser = () => {
    return store.getObject(loginUserKey);
}

let getAccessToken = () => {
    let user = getLoginUser();
    if (user) {
        return user.accesstoken;
    } else {
        return null;
    }
}

let collectTopic = (id, cb) => {
    let token = getAccessToken();
    axios({
        method: 'post',
        url: 'topic_collect/collect',
        data: `accesstoken=${token}&topic_id=${id}`,
        isAuth: true
    }).then(response => {
        if (response.success) {
            cb();
        } else {
            alert("收藏失败,请刷新页面重试");
        }
    });
}

let unCollectTopic = (id, cb) => {
    let token = getAccessToken();
    axios({
        method: 'post',
        url: 'topic_collect/de_collect',
        data: `accesstoken=${token}&topic_id=${id}`,
        isAuth: true
    }).then(response => {
        if (response.success) {
            cb();
        } else {
            alert("取消收藏失败,请刷新页面重试");
        }
    });
}

let addComment = (topicId, content, replyId, cb) => {
    let token = getAccessToken();
    axios({
        method: 'post',
        url: `topic/${topicId}/replies`,
        data: `accesstoken=${token}&reply_id=${replyId}&content=${content}`,
        isAuth: true
    }).then(response => {
        if (response.success) {
            cb();
        } else {
            alert("评论失败");
        }
    });
}

let likeComment = (commentId, cb) => {
    let token = getAccessToken();
    axios({
        method: 'post',
        url: `/reply/${commentId}/ups`,
        data: `accesstoken=${token}`,
        isAuth: true
    }).then(response => {
        if (response.success) {
            cb();
        } else {
            alert("操作失败");
        }
    });
}

export default {
    isLogin: isLogin,
    loginOut: loginOut,
    login: login,
    getLoginUser: getLoginUser,
    addComment: addComment,
    collectTopic: collectTopic,
    unCollectTopic: unCollectTopic,
    getAccessToken: getAccessToken,
    likeComment: likeComment,
    addComment: addComment
}