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

import './targetNumber.less';

import { Layout, Menu } from 'antd';
import RouterLoadable from '@common/routerLoadable/routerLoadable.jsx';

let History = RouterLoadable({
    loader: () =>
        import ('./history.jsx'),
});


const { Header, Content } = Layout;

@withRouter
class TargetNumber extends Component {

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
                        <Menu.Item key="history">
                            <NavLink to={`${this.props.match.path}/history`} replace>目标客户数计算历史</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="market-body">
                    <Switch>
                        <Route path={`${this.props.match.path}/history`} component={History}/>
                        <Redirect to='/error'/>
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default TargetNumber