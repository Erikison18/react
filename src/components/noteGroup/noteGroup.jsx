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

import './noteGroup.less';
import { Layout, Menu } from 'antd';
import RouterLoadable from '@common/routerLoadable/routerLoadable.jsx';

let Send = RouterLoadable({
    loader: () =>
        import ('./send.jsx'),
});

let Overstock = RouterLoadable({
    loader: () =>
        import ('./overstock.jsx'),
});

let Record = RouterLoadable({
    loader: () =>
        import ('./record.jsx'),
});


const { Header, Content } = Layout;

@withRouter
class NoteGroup extends Component {

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
                        <Menu.Item key="send">
                            <NavLink to={`${this.props.match.path}/send`} replace>短信营销活动发送情况</NavLink>
                        </Menu.Item>
                        <Menu.Item key="overstock">
                            <NavLink to={`${this.props.match.path}/overstock`} replace>短信积压</NavLink>
                        </Menu.Item>
                        <Menu.Item key="record">
                            <NavLink to={`${this.props.match.path}/record`} replace>短信发送记录</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="market-body">
                    <Switch>
                        <Route path={`${this.props.match.path}/send`} component={Send}/>
                        <Route path={`${this.props.match.path}/overstock`} component={Overstock}/>
                        <Route path={`${this.props.match.path}/record`} component={Record}/>
                        <Redirect to='/error'/>
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default NoteGroup