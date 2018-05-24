import React, { Component } from 'react'
import HomePage from '../containers/home'
import Login from '../component/login'
import TopicPage from '../containers/topic'
import ZonePage from '../containers/zone'
import CommentPage from '../containers/comment'
import MessagePage from '../containers/message'
//import { HashRouter, Route } from 'react-router-dom'
import { Route, HashRouter } from 'react-keeper'
class Routes extends Component {

    constructor(...args) {
        super(...args)
    }

    componentWillMount() {
    }

    componentWillUpdate(nextProps) {
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Login />
                    <Route index cache component={HomePage} path="/home" />
                    <Route path="/user/:name" component={ZonePage} />
                    <Route path='/topic/:id' component={TopicPage} />
                    <Route path='/comment/:id' component={CommentPage} />
                    <Route path='/message' component={MessagePage} />
                </div>
            </HashRouter>
        )
    }
    componentDidMount() {
    }

    componentWillUnmount() {

    }

}

export default Routes