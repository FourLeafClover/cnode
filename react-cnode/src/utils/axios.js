import axios from 'axios';
import store from "../store";
axios.defaults.baseURL = 'https://cnodejs.org/api/v1/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(config => {
    let accesstoken = store.getState().login.authToken;
    if (config.isAuth) {
        if (accesstoken === null) {
            return Promise.reject({
                response: {
                    data: {
                        success: false,
                        message: '请登录'
                    }
                }
            })
        }
    }
    if (accesstoken !== null) {
        if (config.method === "get") {
            config.params = { ...config.params,
                accesstoken
            }
        } else if (config.method === "post") {
            config.data = { ...config.data,
                accesstoken
            };
            let keyValue = '';
            Object.keys(config.data).forEach(key => {
                keyValue += `${key}=${config.data[key]}&`
            });
            config.data = keyValue;
        }
    }
    return config;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return error.response.data;
});

export default axios;