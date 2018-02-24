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
            window.global.$vue.$root.$emit("Event_OPENLOGIN");
        }
    }

    //全局存储成功信息,用于请求成功后弹窗提示
    window.global.$vue.successMsg = config.successMsg;
    return config;

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
}, (error, a, b, c) => {

    // 全局处理异常
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
        success: false
    }
});

export default axios;