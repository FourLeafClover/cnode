import './index.css'
import React, {
    Component
} from 'react';
import { List, Toast, Button, Icon } from 'antd-mobile';
import auth from '../../utils/auth';
import cnodeSvc from '../../api/cnode.js';
import { connect } from 'react-redux';
import { openLoginPanel, login } from '../../actions'
class Login extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }

    login() {
        let token = this.refs.auth.value.trim();
        if (token === "") {
            Toast.info("更输入登陆Token")
        } else {
            cnodeSvc.login(token).then(res => {
                if (res.success) {
                    this.props.login(token, res);
                    this.props.closeLogin();
                    Toast.info("登陆成功");
                } else {
                    Toast.info(res.error_msg);
                }
            })
        }
    }

    render() {
        return (
            <div className={'loginPanel ' + (this.props.isOpenLogin ? 'on' : '')}>
                <div>
                    <img className="log" src="https://cnodejs.org/public/images/cnodejs.svg" />
                </div>
                <div className="content">
                    <div style={{ height: '50px' }}></div>
                    <textarea ref='auth' autoFocus placeholder='请输入登陆Token' />
                    <Button type='primary' onClick={this.login.bind(this)}> 登陆验证</Button>
                    <span className="close" onClick={this.props.closeLogin}>
                        <Icon type="cross" />
                    </span>
                    <div className="author"></div>
                    <div className="findToken">
                        <span>没有登陆Token?</span>
                        <a href="https://cnodejs.org/signin">点击获取</a>
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <a href="https://github.com/FourLeafClover">Github</a>
                    </div>
                    <div className="aboutme">
                        <a href="http://47.97.172.44/aboutme/">
                            关于我
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isOpenLogin: state.login.isOpenLoginPanel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeLogin: () => {
            dispatch(openLoginPanel(false));
        },
        login: (authToken, userInfo) => {
            dispatch(login(authToken, userInfo));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);