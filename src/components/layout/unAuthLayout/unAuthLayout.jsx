import React, {
    Component
} from 'react';

import {
    Link
} from 'react-router-dom';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

import {actiontor}  from '@models/async.js';

/*
组件AuthLayout连接到store，
通过bindActionCreators把action和dispanth合成一个fun，方便调用。你也可以不传入connect的第二个参数结合bindActionCreators完成上述操作。
*/
@connect(
    ({asyncDemo}) => ({asyncDemo}),
    (dispatch, ownProps) => bindActionCreators(actiontor, dispatch)
)
class UnAuthLayout extends Component {
    componentWillMount() {
        // this.props.history.push('/auth/marketingHistory/historyQuery');
        this.props.fetchDemo();
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <div>{JSON.stringify(this.props.asyncDemo)}</div>
                <Link to="/auth">auth</Link>
            </div>
        );
    }
}

export default UnAuthLayout