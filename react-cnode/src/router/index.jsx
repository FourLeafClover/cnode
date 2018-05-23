import React, { Component } from 'react'
import HomePage from '../containers/home'
import Login from '../component/login'
import TopicPage from '../containers/topic'
import ZonePage from '../containers/zone'
import CommentPage from '../containers/comment'
import MessagePage from '../containers/message'
import { HashRouter, Route } from 'react-router-dom'
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
                    <Route cache path="/" exact component={HomePage} />
                    <Route cache path="/user/:name" component={ZonePage} />
                    <Route cache path='/topic/:id' component={TopicPage} />
                    <Route cache path='/comment/:id' component={CommentPage} />
                    <Route cache path='/message' component={MessagePage} />
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