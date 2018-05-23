import * as actionsTypes from './actionsTypes'
import auth from "../utils/auth"
export const openLoginPanel = (isOpen) => {
    return {
        type: actionsTypes.OPEN_LOGIN,
        result: {
            isOpenLoginPanel: isOpen
        }
    }
}

export const logout = () => {
    auth.removeLoginInfo();
    return {
        type: actionsTypes.LOGIN_OUT,
        result: {
            isLogin: false,
            authToken: "",
            loginUser: null
        }
    }
}

export const login = (authToken, userInfo) => {
    auth.saveLoginInfo(authToken, userInfo);
    return {
        type: actionsTypes.LOGIN,
        result: {
            isLogin: true,
            authToken: authToken,
            loginUser: userInfo
        }
    }
}