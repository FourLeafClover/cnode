import auth from "../utils/auth"
let initState = {
    isOpenLoginPanel: false,
    loginUser: auth.getLoginUser(),
    authToken: auth.getAuth(),
    isLogin: auth.isLogin()
}
const login = (state = initState, action) => {
    console.log('reducter')
    switch (action.type) {
        case "OPEN_LOGIN":
            {
                return {
                    ...state,
                    ...action.result
                }
            }
        case "LOGIN_OUT":
            {
                return {
                    ...state,
                    ...action.result
                }
            }
        case "LOGIN":
            {
                return {
                    ...state,
                    ...action.result
                }
            }
        default:
            {
                return state;
            }
    }
}

export default login