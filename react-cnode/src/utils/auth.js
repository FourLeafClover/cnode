import storage from "./localstorage";
import store from '../store'
import {
    openLoginPanel
} from '../actions'
const CNODE_AUTH = "CNODE_AUTH"; // 登陆的AuthToken
const CNODE_LOGINUSER = "CNODE_LOGINUSER"; // 登陆人的信息\
let getAuth = () => {
    return storage.getItem(CNODE_AUTH);
}

let getLoginUser = () => {
    return storage.getItem(CNODE_LOGINUSER);
}

let removeLoginInfo = () => {
    storage.clearItem(CNODE_AUTH);
    storage.clearItem(CNODE_LOGINUSER);
}

let saveLoginInfo = (auth, userInfo) => {
    storage.setItem(CNODE_AUTH, auth);
    storage.setItem(CNODE_LOGINUSER, userInfo);
}

let isLogin = () => {
    return storage.getItem(CNODE_AUTH) != null;
}

let checkLogin = () => {
    return new Promise(resolve => {
        if (isLogin()) {
            resolve(true)
        } else {
            store.dispatch(openLoginPanel(true))
            resolve(false)
        }
    })
}

export default {
    getAuth: getAuth,
    getLoginUser: getLoginUser,
    removeLoginInfo: removeLoginInfo,
    saveLoginInfo: saveLoginInfo,
    isLogin: isLogin,
    checkLogin: checkLogin
}