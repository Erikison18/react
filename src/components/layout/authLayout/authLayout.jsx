import React, {
    Component
} from 'react';

import {
    Route,
    Switch,
    Redirect,
    // Link,
    withRouter
} from 'react-router-dom';

import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

import CatchErrorBoundary from '@common/catchErrorBoundary/catchErrorBoundary.jsx'
import * as actiontor from '@actions/demo1.js';
import './authLayout.less';
import { Layout, Menu, Icon } from 'antd';
import RouterLoadable from '@common/routerLoadable/routerLoadable.jsx';

let MarketingHistory = RouterLoadable({
    loader: () =>
        import ('@components/marketingHistory/marketingHistory.jsx'),
});
let MarketingActivities = RouterLoadable({
    loader: () =>
        import ('@components/marketingActivities/marketingActivities.jsx'),
});
let NoteGroup = RouterLoadable({
    loader: () =>
        import ('@components/noteGroup/noteGroup.jsx'),
});
let TargetNumber = RouterLoadable({
    loader: () =>
        import ('@components/targetNumber/targetNumber.jsx'),
});
let Feedback = RouterLoadable({
    loader: () =>
        import ('@components/feedback/feedback.jsx'),
});

const { Header, Footer, Sider } = Layout;


@connect(
    state => ({demo1: state.demo1}),
    (dispatch, ownProps) => bindActionCreators(actiontor, dispatch)
)
@withRouter
export default class AuthLayout extends Component {

    state = {
        collapsed: false,
        defaultSelectedKeys:this.props.location.pathname.replace(`${this.props.match.path}/`,'').split('/')[0]
    };

    onCollapse (collapsed) {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    menuClickHandle({key}){

        let path='';

        switch(key){
            case 'marketingHistory':
                path = `${this.props.match.path}/marketingHistory/historyQuery`;
                break;
            case 'marketingActivities':
                path = `${this.props.match.path}/marketingActivities/activitiesList`;
                break;
            case 'noteGroup':
                path = `${this.props.match.path}/noteGroup/send`;
                break;
            case 'targetNumber':
                path = `${this.props.match.path}/targetNumber/history`;
                break;
            case 'feedback':
                path = `${this.props.match.path}/feedback/list`;
                break;
            default:
                path= 'error';
        }

        this.props.history.replace(path);

    }

    render() {
        // console.log(this.props);
        return (
            <div>
                <Layout>
                    <Header className="g-main-head">
                        <h3>Asiainfo(亚信科技) OBC IOP监测</h3>
                    </Header>
                    <Layout className="g-main-body">
                        <Sider
                            className="g-main-sider"
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse.bind(this)}
                        >
                            <Menu theme="dark" defaultSelectedKeys={[this.state.defaultSelectedKeys]} mode="inline" onClick={this.menuClickHandle.bind(this)}>
                                <Menu.Item key="marketingHistory">
                                    <Icon type="table"/>
                                    <span>营销匹配历史</span>
                                </Menu.Item>
                                <Menu.Item key="marketingActivities">
                                    <Icon type="table"/>
                                    <span>营销活动</span>
                                </Menu.Item>
                                <Menu.Item key="noteGroup">
                                    <Icon type="table"/>
                                    <span>短信群发</span>
                                </Menu.Item>
                                <Menu.Item key="targetNumber">
                                    <Icon type="table"/>
                                    <span>目标客户数</span>
                                </Menu.Item>
                                <Menu.Item key="feedback">
                                    <Icon type="table"/>
                                    <span>营销反馈</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout className="g-main-body-right">
                            <CatchErrorBoundary>
                                <div className="g-main-content">
                                    <Switch>
                                        <Route path={`${this.props.match.path}/marketingHistory`} component={MarketingHistory}/>
                                        <Route path={`${this.props.match.path}/marketingActivities`} component={MarketingActivities}/>
                                        <Route path={`${this.props.match.path}/noteGroup`} component={NoteGroup}/>
                                        <Route path={`${this.props.match.path}/targetNumber`} component={TargetNumber}/>
                                        <Route path={`${this.props.match.path}/feedback`} component={Feedback}/>
                                        <Redirect to='/error'/>
                                    </Switch>
                                </div>
                            </CatchErrorBoundary>
                            <Footer className="g-main-footer">
                                亚信科技 ©2018 Created by obc
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}


