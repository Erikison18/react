import React, {
    Component
} from 'react';

// import ReactDOM from 'react-dom';

import {
    Route,
    Switch,
    Redirect,
    NavLink,
    withRouter
} from 'react-router-dom';

import './marketingHistory.less';
import { Layout, Menu } from 'antd';
import RouterLoadable from '@common/routerLoadable/routerLoadable.jsx';

let HistoryQuery = RouterLoadable({
  loader: () => import ('./historyQuery.jsx'),
});

let Statistics = RouterLoadable({
  loader: () => import ('./statistics.jsx'),
});

let StatisticsNoChannel = RouterLoadable({
  loader: () => import ('./statisticsNoChannel.jsx'),
});

let Detection = RouterLoadable({
  loader: () => import ('./detection.jsx'),
});

let Log = RouterLoadable({
  loader: () => import ('./log.jsx'),
});

let Contend = RouterLoadable({
  loader: () => import ('./contend.jsx'),
});

const { Header, Content } = Layout;

@withRouter
class MarketingHistory extends Component {

    componentDidMount() {
        // throw new Error('出错不是我本意');
    }

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
                        <Menu.Item key="historyQuery">
                            <NavLink to={`${this.props.match.path}/historyQuery`} replace>营销历史查询</NavLink>
                        </Menu.Item>
                        <Menu.Item key="statistics">
                            <NavLink to={`${this.props.match.path}/statistics`} replace>营销历史统计（有渠道）</NavLink>
                        </Menu.Item>
                        <Menu.Item key="statisticsNoChannel">
                            <NavLink to={`${this.props.match.path}/statisticsNoChannel`} replace>营销历史统计（无渠道）</NavLink>
                        </Menu.Item>
                        <Menu.Item key="detection">
                            <NavLink to={`${this.props.match.path}/detection`} replace>营销历史监测</NavLink>
                        </Menu.Item>
                        <Menu.Item key="log">
                            <NavLink to={`${this.props.match.path}/log`} replace>统计任务日志</NavLink>
                        </Menu.Item>
                        <Menu.Item key="contend">
                            <NavLink to={`${this.props.match.path}/contend`} replace>活动竞争</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="market-body">
                    <Switch>
                        <Route path={`${this.props.match.path}/historyQuery`} component={HistoryQuery}/>
                        <Route path={`${this.props.match.path}/statistics`} component={Statistics}/>
                        <Route path={`${this.props.match.path}/statisticsNoChannel`} component={StatisticsNoChannel}/>
                        <Route path={`${this.props.match.path}/detection`} component={Detection}/>
                        <Route path={`${this.props.match.path}/log`} component={Log}/>
                        <Route path={`${this.props.match.path}/contend`} component={Contend}/>
                        <Redirect to='/error'/>
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default MarketingHistory