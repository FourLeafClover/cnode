import './index.css'
import React, {
    Component
} from 'react';

import { Card, Icon, Toast, Button, TextareaItem } from 'antd-mobile';
import cnodeSvc from '../../api/cnode.js';
import { connect } from 'react-redux';
import auth from '../../utils/auth';
import { Control } from 'react-keeper';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            replies: null,
            myAddReplies: [],
            isShowAddComment: false,
            isShowReplyComment: false,
            replyItem: null
        }
        this.sendComment = this.sendComment.bind(this);
    }

    componentDidMount() {
        document.title = '评论区';
        let id = this.props.params.id;
        cnodeSvc.loadTopicDetail(id).then(res => {
            if (res.success) {
                res.data.replies.forEach(item => {
                    if (item.content) {
                        let content = item.content;
                        while (content.indexOf('href="/user/') >= 0) {
                            content = content.replace('href="/user/', 'href="#/user/');
                        }
                        item.content = content
                    }
                })
                this.setState({
                    replies: res.data.replies
                })
            } else {
                Toast.info(res.error_msg);
            }
        })
    }

    openAddComment() {
        auth.checkLogin().then((isLogin) => {
            if (isLogin) {
                this.setState({
                    isShowAddComment: true
                });
            }
        })
    }

    replyComment(item) {
        auth.checkLogin().then((isLogin) => {
            if (isLogin) {
                this.setState({
                    replyItem: item,
                    isShowReplyComment: true
                })
            }
        })
    }

    likeComment(item) {
        auth.checkLogin().then((isLogin) => {
            if (isLogin) {
                cnodeSvc.likeComment(item.id).then(res => {
                    if (res.success) {
                        Toast.info(item.is_uped ? "已取消点赞" : '已点赞');
                        item.is_uped = !item.is_uped;
                        this.setState({
                            replies: this.state.replies
                        })
                    } else {
                        if (res.error_msg) {
                            Toast.info(res.error_msg);
                        }
                    }
                })
            }
        })
    }

    exitComment() {
        this.setState({
            isShowAddComment: false,
            isShowReplyComment: false,
            replyItem: null
        })
    }

    sendComment() {
        let content = this.refs.commentConent.state.value.trim();
        if (content.length === 0) {
            Toast.info('请输入内容')
        }
        else {
            let replyId = this.state.replyItem === null ? "" : this.state.replyItem.id;
            let apiContent = "";
            if (replyId) {
                apiContent = `[@${this.state.replyItem.author.loginname}](/user/${this.state.replyItem.author.loginname})   ${content}  \x0a \x0a [★来自antd-cnode★](http://www.intelligenttech.top/#/)`;
            }
            else {
                apiContent = `${content}  \x0a \x0a  [★来自antd-cnode★](http://www.intelligenttech.top/#/)`;
            }
            cnodeSvc.addComment(this.props.match.params.id, apiContent, replyId).then(res => {
                if (res.success) {
                    this.setState({
                        myAddReplies: [...this.state.myAddReplies, content],
                        isShowAddComment: false,
                        isShowReplyComment: false
                    })
                    Toast.info('评论成功');
                } else {
                    if (res.error_msg) {
                        Toast.info(res.error_msg);
                    }
                }
            })
        }
    }

    render() {

        return (<div className="commentList">
            {
                this.state.replies === null && (<Icon type="loading" style={{ float: 'right', margin: '10px' }} />)
            }
            <div className='notice'></div>
            {
                this.state.replies !== null && this.state.replies.length > 0 &&
                this.state.replies.map((item, key) => (
                    <Card className='item' key={key}>
                        <Card.Header
                            title={(<div className="header">
                                <img src={item.author.avatar_url} style={{ zIndex: '9' }} onClick={(e) => this.props.history.push(`/user/${item.author.loginname}`)} />
                                <span style={{ zIndex: '9' }} onClick={() => Control.go(`/user/${item.author.loginname}`)}>{item.author.loginname}</span>
                            </div>)}
                        />
                        <Card.Body dangerouslySetInnerHTML={{ __html: item.content }}>
                        </Card.Body>
                        <Card.Footer extra={[
                            <i key={key + '1'} className='fa fa-thumbs-up' onClick={this.likeComment.bind(this, item)} style={{ marginRight: '10px', marginBottom: '10px', color: (item.is_uped ? 'red' : '') }}>&nbsp;点赞</i>,
                            <i key={key + '2'} className='reply fa fa-mail-reply' onClick={this.replyComment.bind(this, item)}>&nbsp;回复</i>,
                        ]} />
                    </Card>
                ))
            }
            {
                this.state.replies !== null && this.state.replies.length === 0 && (
                    <div className='empty' style={{ textAlign: 'center', paddingTop: '20px' }}>
                        没有评论
                    </div>
                )
            }
            {
                this.state.myAddReplies.length > 0 && (
                    <div className="addReplies">
                        <div className="title">新增评论</div>
                        {
                            this.state.myAddReplies.map((item, key) => (<div className="item" key='{key}'>{item}</div>))
                        }
                    </div>
                )
            }
            {
                this.state.replies !== null && this.state.replies.length > 0 && (<div style={{ textAlign: 'center', padding: '10px' }}>--END--</div>)
            }
            <div className={`bottomBar ${(this.state.isShowAddComment || this.state.isShowReplyComment) ? 'on' : ''}`}>
                {
                    (!this.state.isShowAddComment) && (!this.state.isShowReplyComment) && (
                        <Button type='primary' onClick={this.openAddComment.bind(this)}>我来说两句</Button>
                    )
                }
                {
                    this.state.isShowAddComment && (
                        <div style={{
                            position: 'relative'
                        }}>
                            <div style={{
                                width: `${window.innerWidth - 80}px`
                            }}>
                                <TextareaItem
                                    placeholder="我来说两句"
                                    data-seed="logId"
                                    ref='commentConent'
                                    autoHeight
                                    autoFocus
                                />
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '0px',
                                    width: '60px',
                                    textAlign: 'center',
                                    bottom: '0px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    lineHeight: '44px'
                                }}
                                onClick={this.sendComment}>发送</div>
                        </div>
                    )
                }
                {
                    this.state.isShowReplyComment &&
                    (
                        <div style={{
                            position: 'relative'
                        }}>
                            <div style={{
                                width: `${window.innerWidth - 80}px`
                            }}>
                                <TextareaItem
                                    placeholder={`@${this.state.replyItem.author.loginname}`}
                                    data-seed="logId"
                                    ref='commentConent'
                                    autoHeight
                                    autoFocus
                                />
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '0px',
                                    width: '60px',
                                    textAlign: 'center',
                                    bottom: '0px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    lineHeight: '44px'
                                }}
                                onClick={this.sendComment}>发送</div>
                        </div>
                    )
                }
            </div>
            {
                (this.state.isShowAddComment || this.state.isShowReplyComment) && (
                    <div className='cover' onClick={this.exitComment.bind(this)}></div>
                )
            }
            <div style={{
                position: 'fixed',
                bottom: '70px',
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
        </div>);
    }

}

const mapStateToProps = (state) => {
    return {
        loginUser: state.login.loginUser
    };
};

export default connect(mapStateToProps)(HomePage);