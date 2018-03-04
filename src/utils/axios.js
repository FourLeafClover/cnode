import axios from 'axios';
import userSvc from '../service/user';
axios.defaults.baseURL = 'https://cnodejs.org/api/v1/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(config => {

    // 没有引入vuex.读取accesstoken后存入window缓存
    let accessToken = window.global.$vue.accessToken;
    if (accessToken == undefined) {
        accessToken = userSvc.getAccessToken();
    }
    if (accessToken) {
        if (config.method == "get") {
            if (config.url.endsWith("?")) {
                config.url += `&accesstoken=${accessToken}`;
            } else {
                config.url += `?accesstoken=${accessToken}`;
            }
        }
    }
    if (config.isAuth) {
        if (accessToken == null) {
            return Promise.reject("OPENLOGIN")
        } else {
            return config
        }
    } else {
        return config;
    }
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use((response, a, b, c) => {
    if (response.data.success) {
        if (response.config && response.config && (response.config.successMsg !== undefined)) {
            window.global.$vue.$root.$emit("EVENT_SHOWTOAST", {
                content: response.config.successMsg,
                type: 'success'
            });
        }
    }
    return response.data;
}, (error) => {
    if (error && (error == "OPENLOGIN")) {
        window.global.$vue.$root.$emit("Event_OPENLOGIN");
    } else {
        if (error && error.response && error.response.data && error.response.data.error_msg) {
            window.global.$vue.$root.$emit("EVENT_SHOWTOAST", {
                content: error.response.data.error_msg,
                type: 'warning'
            });
        } else {
            window.global.$vue.$root.$emit("EVENT_SHOWTOAST", {
                content: "请求异常,请稍后重试",
                type: 'warning'
            });
        }
        return {
            success: false,
            message: "未登录"
        }
    }
});

export default axios;