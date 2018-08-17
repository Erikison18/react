import React, {
    Component
} from 'react';

import {
    Route,
    Switch,
    Redirect,
    NavLink,
    withRouter
} from 'react-router-dom';

import './marketingActivities.less';
import { Layout, Menu } from 'antd';
import RouterLoadable from '@common/routerLoadable/routerLoadable.jsx';

let ActivitiesList = RouterLoadable({
    loader: () =>
        import ('./activitiesList.jsx'),
});

let ActivitiesContact = RouterLoadable({
    loader: () =>
        import ('./activitiesContact.jsx'),
});

const { Header, Content } = Layout;

@withRouter
class MarketingActivities extends Component {

    state={
        defaultSelectedKeys:this.props.location.pathname.replace(`${this.props.match.path}/`,'')
    }

    render() {
        return (
            <Layout className="market-container">
                <Header className="market-head">
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={[this.state.defaultSelectedKeys]}
                        className="g-menu-box"
                    >
                        <Menu.Item key="activitiesList">
                            <NavLink to={`${this.props.match.path}/activitiesList`} replace>活动列表</NavLink>
                        </Menu.Item>
                        <Menu.Item key="activitiesContact">
                            <NavLink to={`${this.props.match.path}/activitiesContact`} replace>活动接触查询</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="market-body">
                    <Switch>
                        <Route path={`${this.props.match.path}/activitiesList`} component={ActivitiesList}/>
                        <Route path={`${this.props.match.path}/activitiesContact`} component={ActivitiesContact}/>
                        <Redirect to='/error'/>
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default MarketingActivities