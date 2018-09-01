import React, {
    Component
} from 'react';

// import {
//     Link
// } from 'react-router-dom';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

import {actiontor}  from '@models/async.js';

/*
组件AuthLayout连接到store，
通过bindActionCreators把action和dispanth聚合一个fun，方便调用。你也可以不传入connect的第二个参数
*/
@connect(
    ({asyncDemo}) => ({asyncDemo}),
    (dispatch, ownProps) => bindActionCreators(actiontor, dispatch)
)
class UnAuthLayout extends Component {
    componentWillMount() {
        // this.props.history.push('/auth/marketingHistory/historyQuery');
        this.props.asyncFetchDemo();
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <div>{JSON.stringify(this.props.asyncDemo)}</div>
            </div>
        );
    }
}

export default UnAuthLayout