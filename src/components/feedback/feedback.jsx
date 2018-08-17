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

import './feedback.less';
import { Layout, Menu } from 'antd';
import RouterLoadable from '@common/routerLoadable/routerLoadable.jsx';

let List = RouterLoadable({
    loader: () =>
        import ('./list.jsx'),
});

let Statistics = RouterLoadable({
    loader: () =>
        import ('./statistics.jsx'),
});

const { Header, Content } = Layout;

@withRouter
class Feedback extends Component {

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
                        <Menu.Item key="list">
                            <NavLink to={`${this.props.match.path}/list`} replace>营销反馈列表</NavLink>
                        </Menu.Item>
                        <Menu.Item key="statistics">
                            <NavLink to={`${this.props.match.path}/statistics`} replace>营销反馈统计</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="market-body">
                    <Switch>
                        <Route path={`${this.props.match.path}/list`} component={List}/>
                        <Route path={`${this.props.match.path}/statistics`} component={Statistics}/>
                        <Redirect to='/error'/>
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default Feedback