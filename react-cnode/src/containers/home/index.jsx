import './index.css'
import React, {
    Component
} from 'react';
import { Drawer, List, NavBar, Icon, Toast, Tabs, ListView, Card } from 'antd-mobile';
import cnodeSvc from '../../api/cnode.js';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import auth from '../../utils/auth';
import { Control } from 'react-keeper'

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.tabsItems = {
            all: [],
            share: [],
            good: [],
            ask: [],
            job: [],
            dev: []
        }
        this.pageSize = 20;
        this.state = {
            tabsDataSource: {
                all: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                }),
                share: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                }),
                good: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                }),
                ask: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                }),
                job: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                }),
                dev: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                })
            },
            tabLoadComplete: {
                all: false,
                share: false,
                good: false,
                ask: false,
                job: false,
                dev: false
            },
            isPopoverVisible: false,
            messageCount: 0,
            isOpenMenu: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.gotoZone = this.gotoZone.bind(this);
        this.gotoMessage = this.gotoMessage.bind(this);
    }

    onEndReached(tab) {
        let items = this.tabsItems[tab.tab];
        let curPage = (items.length / this.pageSize) + 1;
        if (this.state.tabLoadComplete[tab.tab]) {
            return;
        }
        cnodeSvc.loadHomePage(curPage, this.pageSize, tab.tab, (result) => {
            this.tabsItems[tab.tab] = [...this.tabsItems[tab.tab], ...result.reverse()];
            this.state.tabsDataSource[tab.tab] = this.state.tabsDataSource[tab.tab].cloneWithRows(this.tabsItems[tab.tab]);
            console.log(this.state.tabsDataSource[tab.tab])
            this.setState({
                tabsDataSource: this.state.tabsDataSource
            });
            if (result.length < this.pageSize) {
                this.state.tabLoadComplete[tab.tab] === true;
                this.setState({
                    tabLoadComplete: this.state.loadHomePage
                })
            }
        })
    }


    tabChange(tab, index) {
        if (this.tabsItems[tab.tab].length === 0) {
            cnodeSvc.loadHomePage(1, this.pageSize, tab.tab, (result) => {
                this.tabsItems[tab.tab] = result.reverse();
                this.state.tabsDataSource[tab.tab] = this.state.tabsDataSource[tab.tab].cloneWithRows(this.tabsItems[tab.tab]);
                this.setState({
                    tabsDataSource: this.state.tabsDataSource
                });
            })
        }
    }

    gotoZone() {
        auth.checkLogin().then(res => {
            if (res) {
                Control.go(`/user/${this.props.loginUser.loginname}`)
            }
        })
    }

    gotoMessage() {
        auth.checkLogin().then(res => {
            if (res) {
                Control.go(`/message`)
            }
        })
    }

    componentDidMount() {
        document.title = 'CNODE中文社区';
        cnodeSvc.loadHomePage(1, this.pageSize, "", (result) => {
            this.tabsItems.all = result.reverse();
            this.state.tabsDataSource.all = this.state.tabsDataSource.all.cloneWithRows(this.tabsItems.all);
            this.setState({
                tabsDataSource: this.state.tabsDataSource
            });
        });
        if (this.props.loginUser) {

            cnodeSvc.loadMessageCount().then(res => {
                this.setState({
                    messageCount: res.data
                })
            })
        }
    }

    renderContent = tab => {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                    opacity: 1,
                    zIndex: 9
                }}
            />
        )
        let data = this.tabsItems[tab.tab];
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} className="item">
                    <Card>
                        <Card.Header
                            title={(<div className="header">
                                <img src={obj.author.avatar} alt="" style={{ zIndex: '9' }} onClick={(e) => Control.go(`/user/${obj.author.name}`)} />
                                <span style={{ zIndex: '9', color: "#0084ff", width: '300px' }} onClick={() => Control.go(`/user/${obj.author.name}`)}>{obj.author.name}</span>
                            </div>)}
                        />
                        <Card.Body onClick={() => Control.go(`/topic/${obj.id}`)}>
                            <div style={{ paddingBottom: '10px', wordBreak: 'break-all', fontWeight: 'bold', fontSize: '18px' }}>{obj.title}</div>
                            <div style={{ wordBreak: 'break-all', fontSize: '16px', overflowX: 'hidden', overflowY: 'hidden', color: 'gray', lineHeight: '25px' }} >{obj.content.substr(0, 80)}</div>
                        </Card.Body>
                        <Card.Footer style={{ paddingBottom: '10px' }} content={`阅读量:${obj.visitCount}  评论量:${obj.replyCount}  发布于:${obj.createTime.substr(0, 10)}`} />
                    </Card>
                </div>
            );
        };

        return (
            <ListView
                dataSource={this.state.tabsDataSource[tab.tab]}
                renderHeader={() => (<div></div>)}
                renderSeparator={separator}
                renderFooter={() => (<div style={{ textAlign: 'center' }}>
                    {this.state.tabLoadComplete[tab.tab] ? "亲,数据记载完毕了" : <Icon type='loading' />}
                </div>)}
                renderRow={row}
                className="homelist"
                pageSize={5}
                onEndReached={this.onEndReached.bind(this, tab)}
                onEndReachedThreshold={10}
                scrollRenderAheadDistance={200}
            />
        );
    }

    getRightMenuLoginPanel() {
        if (this.props.loginUser) {
            return (
                <div
                    style={{
                        position: 'relative',
                        height: '80px'
                    }}>
                    <img src={this.props.loginUser.avatar_url}
                        style={{
                            height: '50px',
                            marginTop: '15px',
                            marginLeft: '10px',
                            borderRadius: '50%'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '70px',
                        transform: 'translateY(-50%)'
                    }}>{this.props.loginUser.loginname}</div>
                </div>
            )
        }
        else {
            return (
                <div onClick={this.props.openLogin}
                    style={{
                        position: 'relative',
                        height: '80px'
                    }}>
                    <img src="http://www.bauhiniavalley.com/Resources/images/user-photo.png"
                        style={{
                            height: '50px',
                            marginTop: '15px',
                            marginLeft: '10px'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '70px',
                        transform: 'translateY(-50%)'
                    }}>立即登录</div>
                </div>
            )
        }
    }

    toggleMenu() {
        this.setState({
            isOpenMenu: !this.state.isOpenMenu
        })
    }

    render() {

        const tabs = [
            { title: '全部', tab: 'all' },
            { title: '精华', tab: 'good' },
            { title: '分享', tab: 'share' },
            { title: '问答', tab: 'ask' },
            { title: '招聘', tab: 'job' },
            { title: '测试', tab: 'dev' }
        ];

        const sidebar = (<div
            style={{
                height: '100vh',
                backgroundColor: '#f4f5f5',
                width: '80vw',
                boxSizing: 'border-box',
                MozBoxSizing: 'border-box',
                WebkitBoxShadow: 'border-box'
            }}>
            {this.getRightMenuLoginPanel()}
            <div>
                <List.Item style={{ marginBottom: '5px' }} onClick={this.gotoZone} thumb="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=4b7f89872d3fb80e0cd166d10eea4813/b8014a90f603738de3e18994bf1bb051f919ecd9.jpg" arrow="horizontal">
                    我的主页
                </List.Item>
                <List.Item style={{ marginBottom: '5px' }} onClick={this.gotoMessage} thumb="https://www.easyicon.net/api/resizeApi.php?id=1143778&size=24" arrow="horizontal">
                    我的消息
                </List.Item>
                <List.Item style={{ marginBottom: '5px' }} onClick={() => Toast.info("暂未发布此功能,请耐心等待")} thumb="https://www.easyicon.net/api/resizeApi.php?id=1195373&size=24" arrow="horizontal">
                    发布话题
                </List.Item>
                <List.Item style={{ marginBottom: '5px' }} onClick={() => window.location.href = 'http://www.intelligenttech.top/aboutme'} className="aboutme" thumb="http://47.97.172.44/aboutme/assets/img/log3.jpg" arrow="horizontal">
                    About Developer
                </List.Item>
                <List.Item style={{ marginBottom: '5px' }} extra='求关注' onClick={() => window.location.href = 'https://github.com/FourLeafClover'} className="aboutme" thumb="https://www.easyicon.net/api/resizeApi.php?id=1188783&size=24" arrow="horizontal">
                    Github
                </List.Item>
                <List.Item style={{ marginBottom: '5px', display: `${this.props.loginUser == null ? 'none' : ''}` }} arrow="horizontal" onClick={this.props.logout}>
                    注销账户
                </List.Item>
                <List.Item onClick={this.toggleMenu} arrow="horizontal">
                    关闭
                </List.Item>
                <List.Item onClick={this.toggleMenu}
                    style={{
                        position: 'absolute',
                        bottom: '0px',
                        width: '100%',
                        boxSizing: 'border-box',
                        MozBoxSizing: 'border-box',
                        WebkitBoxSizing: 'border-box',
                        textAlign: 'center'
                    }}>
                    <List.Item.Brief style={{ textAlign: 'center' }}>
                        Copyright©2018 by frank<br />
                        Based on react-antd-design<br />
                        [因为没有翅膀所以要努力奔跑]<br />
                    </List.Item.Brief>
                </List.Item>
            </div>
        </div>);

        return (<div>
            <div>
                <NavBar
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        backgroundColor: 'white',
                        zIndex: 2
                    }}
                    leftContent={[
                        <img src="http://47.97.172.44/cnode/assets/img/log1.jpg" key={1} style={{ width: '35px' }} />,
                        <span key={2} style={{
                            marginLeft: '5px',
                            fontWeight: 'bold',
                            color: '#108ee9',
                            fontSize: '20px',
                        }}>Cnode</span>
                    ]}
                    rightContent={[
                        <i
                            key={1001}
                            className="fa fa-bell"
                            onClick={this.gotoMessage}
                            style={{
                                color: (this.state.messageCount > 0 ? "red" : "gray"),
                                marginRight: '20px'
                            }}
                        >
                            {this.state.messageCount ? this.state.messageCount : ""}
                        </i>,
                        <div
                            key={1002}
                            onClick={this.toggleMenu}
                            style={{
                                height: '30px',
                                width: '30px',
                                borderRadius: '50%',
                                backgroundImage: 'url(http://www.bauhiniavalley.com/Resources/images/user-photo.png)',
                                backgroundSize: 'contain'
                            }}>
                            {
                                this.props.loginUser != null &&
                                (
                                    <img onError={(e) => e.src = 'http://www.bauhiniavalley.com.qa/Resources/images/user-photo.png'} key={1003}
                                        style={{ height: '30px', borderRadius: '50%' }}
                                        src={this.props.loginUser.avatar_url}
                                    />
                                )
                            }
                        </div>
                    ]}>
                </NavBar>
                <Drawer
                    className="my-drawer"
                    style={{ height: "100vh" }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.isOpenMenu}
                    position='right'
                    onOpenChange={this.toggleMenu}
                >""</Drawer>
            </div>
            <div
                className="hometab"
                style={{
                    height: '100vh',
                    position: 'fixed',
                    top: '0',
                    width: '100%',
                    overflowX: 'hidden',
                    paddingTop: '45px',
                    boxSizing: 'border-box',
                    MozBoxSizing: 'border-box',
                    WebkitBoxShadow: 'border-box'
                }}>
                <Tabs useOnPan={true} tabs={tabs} tabBarUnderlineStyle={{ display: 'none' }} onChange={this.tabChange.bind(this)} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}>
                    {this.renderContent}
                </Tabs>
            </div>
        </div >);
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        openLogin: () => {
            dispatch(actions.openLoginPanel(true));
        },
        logout: () => {
            dispatch(actions.logout());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.login.loginUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);