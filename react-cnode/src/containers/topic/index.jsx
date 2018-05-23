import './index.css'
import React, {
    Component
} from 'react';

import { Icon, TabBar, Toast } from 'antd-mobile';
import cnodeSvc from '../../api/cnode.js';
import auth from '../../utils/auth';
import { connect } from 'react-redux';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: null
        }
        this.collectTopic = this.collectTopic.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        document.title = "文章加载中"
        cnodeSvc.loadTopicDetail(id).then(res => {
            if (res.success) {
                this.setState({
                    detail: res.data
                })
                document.title = res.data.title;
            } else {
                Toast.info(res.error_msg);
            }
        })
    }

    collectTopic() {
        auth.checkLogin().then(res => {
            if (res) {
                if (this.state.detail.is_collect) {
                    cnodeSvc.unCollectTopic(this.state.detail.id).then(res => {
                        if (res.success) {
                            this.state.detail.is_collect = false;
                            this.setState({
                                detail: this.state.detail
                            })
                        } else {
                            if (res.error_msg) {
                                Toast.info(res.error_msg);
                            }
                        }
                    })
                } else {
                    cnodeSvc.collectTopic(this.state.detail.id).then(res => {
                        if (res.success) {
                            this.state.detail.is_collect = true;
                            this.setState({
                                detail: this.state.detail
                            })
                        } else {
                            if (res.error_msg) {
                                Toast.info(res.error_msg);
                            }
                        }
                    })
                }
            }
        })
    }

    render() {
        let bottomBar = (
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
                <div style={{
                    position: 'fixed',
                    bottom: '60px',
                    right: '10px',
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'black',
                    opacity: '0.6',
                    lineHeight: '40px',
                    textAlign: 'center',
                    color: 'white'
                }}
                    onClick={() => window.history.go(-1)}
                >返回</div>
                {this.state.detail !== null && (<TabBar>
                    <TabBar.Item
                        icon={
                            <i className="fa fa-home" style={{ color: 'gray', fontSize: '20px' }} />
                        }
                        title='首页'
                        key="Koubei"
                        onPress={() => this.props.history.push(`/`)}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title={this.state.detail.is_collect ? '已收藏' : '收藏'}
                        key="Life"
                        onPress={this.collectTopic}
                        icon={<i className="fa fa-heart" style={{ color: this.state.detail.is_collect ? 'red' : 'gray' }}></i>}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="fa fa-paper-plane" style={{ color: 'gray' }} />
                        }
                        title={`评论[${this.state.detail.replies.length}]`}
                        key="Koubei"
                        onPress={() => this.props.history.push(`/comment/${this.state.detail.id}`)}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                </TabBar>)
                }
            </div>
        )

        return (
            <div className="detail">
                {
                    this.state.detail === null ? (<Icon type="loading" style={{ float: 'right', margin: '10px' }} />) : (<div className="info">
                        <div className="title">
                            {this.state.detail.title}
                        </div>
                        <div className="pv">
                            <img src={this.state.detail.author.avatar_url} onClick={() => this.props.history.push(`/user/${this.state.detail.author.loginname}`)} />
                            <span className='name' onClick={() => this.props.history.push(`/user/${this.state.detail.author.loginname}`)}>{this.state.detail.author.loginname}</span>
                            <span className='time'>发布于:{this.state.detail.create_at.substr(0, 10)} 阅读:{this.state.detail.visit_count}</span>
                        </div>
                        <div className="markdown" dangerouslySetInnerHTML={{ __html: this.state.detail.content }}>
                        </div>
                    </div>)
                }
                {this.state.detail !== null ? bottomBar : ""}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loginUser: state.login.loginUser
    };
};

export default connect(mapStateToProps)(HomePage);