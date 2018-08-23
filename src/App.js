import React, {
    Component
} from 'react';

import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import {
    Provider
} from 'react-redux';

import {
    LocaleProvider,
    message
} from 'antd';

import 'moment/locale/zh-cn';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import configureStore from './redux/createStore.js';
import ProgressBar from '@common/progressBar/progressBar.jsx';
/*
*懒加载模块components
*/
import RouterLoadable from '@common/routerLoadable/routerLoadable.jsx';
import './App.less';

let AuthLayout = RouterLoadable({
    loader: () =>
        import ('@components/layout/authLayout/authLayout.jsx'),
});
let UnAuthLayout = RouterLoadable({
    loader: () =>
        import ('@components/layout/unAuthLayout/unAuthLayout.jsx'),
});
let ErrorComponent = RouterLoadable({
    loader: () =>
        import ('@components/common/error/error.jsx'),
});

fetch.default({
    // uriPrefix: '/ynjc',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    beforeSend() {
        if (!/http:\/\//.test(this.uri)) this.uri = '/ynjc' + this.uri;
    },
    dataFilter(response) {

        if (!response.ok && !/http:\/\//.test(response.url)) {
            message.error(`${response.status}\n${response.statusText}`);
            this.abort();
        }

        return response.json();

    },
    fail(e) {
        message.error(e.toString());
        this.abort();
    }
});

const store = configureStore();

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Provider store={store}>
                    <div>
                        <ProgressBar/>
                        <Router>
                            <Switch>
                                <Route path='/' exact={true} component={UnAuthLayout}/>
                                <Route path='/auth' component={AuthLayout} />
                                <Route path='/error' exact={true} component={ErrorComponent}/>
                                <Redirect to='/error'/>
                            </Switch>
                        </Router>
                    </div>
                </Provider>
            </LocaleProvider>
        );
    }
}

export default App;