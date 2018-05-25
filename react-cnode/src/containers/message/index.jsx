import React, {
    Component
} from 'react';

import { List, Toast, Tabs } from 'antd-mobile';
import cnodeSvc from '../../api/cnode.js';
import './index.css'
import { Control } from 'react-keeper'

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            model: null
        }
        this.handleMessage = this.handleMessage.bind(this);
    }

    componentDidMount() {
        document.title = '我的消息'
        cnodeSvc.loadMessage().then(res => {
            if (res.success) {
                this.setState({
                    model: res.data
                })
            } else {
                Toast.info(res.message)
            }
        })
    }

    handleMessage(item) {
        if (!item.has_read) {
            cnodeSvc.readMessage(item.id);
        }
        Control.go(`/topic/${item.topic.id}`);
    }

    renderContent(items) {
        if (items != null && items.length > 0) {
            return (
                <div className="message">
                    {
                        items.map((item, key) => {
                            if (item.type === 'at') {
                                return (
                                    <List.Item key={key} thumb={item.author.avatar_url} onClick={() => this.handleMessage(item)} style={{ marginBottom: '5px' }} arrow="horizontal" >
                                        {
                                            (<div style={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                fontSize: '16px'
                                            }}>{item.topic.title} <br /> {`${item.author.loginname}@了你`}</div>)
                                        }
                                        <List.Item.Brief
                                            style=
                                            {{
                                                whiteSpace: 'normal',
                                                fontSize: '14px',
                                                borderTop: '2px solid #f4f5f5',
                                                paddingTop: '10px'
                                            }}>{item.reply.content}</List.Item.Brief>
                                    </List.Item>
                                )
                            }
                            else {
                                return (
                                    <List.Item key={key} thumb={item.author.avatar_url} onClick={() => this.handleMessage(item)} style={{ marginBottom: '5px' }} arrow="horizontal" >
                                        {
                                            (<div style={{
                                                whiteSpace: 'nowarp',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                fontSize: '16px'
                                            }}>{item.topic.title} <br /> {`${item.author.loginname}发表了评论`}</div>)
                                        }
                                        <List.Item.Brief
                                            style=
                                            {{
                                                whiteSpace: 'normal',
                                                fontSize: '14px',
                                                borderTop: '2px solid #f4f5f5',
                                                paddingTop: '10px'
                                            }}
                                        >{item.reply.content}</List.Item.Brief>
                                    </List.Item>
                                )
                            }
                        })
                    }
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
            { title: '未读消息' },
            { title: '已读消息' }
        ]
        return (<div className="zoneDetail">
            <div style={{ height: '100vh', position: 'fixed', backgroundColor: 'white', width: '100%', top: '0' }}>
                <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
                    {
                        this.state.model === null ? (<div></div>) : (this.renderContent(this.state.model.hasnot_read_messages))
                    }
                    {
                        this.state.model === null ? (<div></div>) : (this.renderContent(this.state.model.has_read_messages))
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

export default HomePage