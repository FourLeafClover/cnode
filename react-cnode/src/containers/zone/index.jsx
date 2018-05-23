import './index.css'
import React, {
    Component
} from 'react';

import { List, NavBar, Toast,Tabs } from 'antd-mobile';
import cnodeSvc from '../../api/cnode.js';
import { connect } from 'react-redux';

const Item = List.Item;

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collects: null,
            model: null
        }
    }

    componentDidMount() {
        let name = this.props.match.params.name;
        document.title = "个人信息加载中"
        cnodeSvc.loadUser(name).then(res => {
            if (res.success) {
                this.setState({
                    model: res.data
                })
                document.title = res.data.loginname;
            } else {
                Toast.info(res.error_msg);
            }
        })
        cnodeSvc.loadUserCollect(name).then(res => {
            if (res.success) {
                if (Array.isArray(res.data)) {
                    this.setState({
                        collects: res.data
                    })
                }
            } else {
                Toast.info(res.error_msg);
            }
        })
    }

    renderContent(items) {
        if (items !== null && items.length > 0) {
            return (
                <div>
                    <List className="my-list">
                        {
                            items.map((item, key) => {
                                return <Item key={key} onClick={() => this.props.history.push(`/topic/${item.id}`)}>{item.title}</Item>
                            })
                        }
                    </List>
                    <div className="end">-END-</div>
                </div>
            )
        } else {
            return (<div style={{ textAlign: 'center', paddingTop: '20px' }}>
                暂无数据
            </div>)
        }
    }

    render() {

        let tabs = [
            { title: '我的话题' },
            { title: '最近评论' },
            { title: '我的收藏' }
        ]
        return (<div className="zoneDetail">
            <NavBar
                mode="light"
                onLeftClick={() => this.props.history.go(-1)}
                leftContent={[
                    this.state.model !== null ? (<img style={{ height: '30px', width: '30px', borderRadius: '50%' }} src={this.state.model.avatar_url} alt="" />) : (<div></div>),
                    <span style={{ color: '#108ee9', fontSize: '16px', width: '100vh', fontWeight: 'bold', paddingLeft: '10px' }}>{this.state.model != null ? `${this.state.model.loginname}的主页` : ""}</span>
                ]}
                style={{
                    backgroundColor: 'white',
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 999,
                    width: '100%',
                    borderRadius: '0 0 20px 20px'
                }}
            >
            </NavBar>
            <div style={{
                height: '100vh',
                position: 'fixed',
                backgroundColor: 'white',
                width: '100%', top: '0',
                paddingTop: '50px',
                boxSizing: 'border-box',
                MozBoxSizing: 'border-box',
                WebkitBoxShadow: 'border-box'
            }}>
                <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
                    {
                        this.state.model === null ? (<div></div>) : (this.renderContent(this.state.model.recent_topics))
                    }
                    {
                        this.state.model === null ? (<div></div>) : (this.renderContent(this.state.model.recent_replies))
                    }
                    {
                        this.state.collects === null ? (<div></div>) : (this.renderContent(this.state.collects))
                    }
                </Tabs>
            </div>
            <div style={{
                position: 'fixed',
                bottom: '10px',
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