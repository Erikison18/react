import React, {
    Component
} from 'react';

import {
    Link,
    withRouter
} from 'react-router-dom';

import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

/*
*错误边界捕获
*/
import CatchErrorBoundary from '@common/catchErrorBoundary/catchErrorBoundary.jsx';

import * as actiontor from '@models/complex.js';
console.log(actiontor.actionType);
/*
组件AuthLayout连接到store，
通过bindActionCreators把action和dispanth合成一个fun，方便调用。你也可以不传入connect的第二个参数结合bindActionCreators完成上述操作。
*/
@connect(
    (state) => (state),
    // (dispatch, ownProps) => bindActionCreators(actiontor.actionType, dispatch)
)
@withRouter
export default class AuthLayout extends Component {

    componentDidMount() {}

    /*
    这里假设获取 count的值和操作count的值在不同的组件中，并且操作count的组件不是获取count组件的父级
    当然咯正常这种情况我们用this.state就够了。
    */
    handlClick(e){
        if(e.target.name==='increment'){
            // this.props.increment1(1);
        }else if(e.target.name==='decrement'){
            this.props.decrement1(1);
        }else if(e.target.name==='multiply'){
            this.props.multiply1(2);
        }
    }

    render() {
        console.log(this.props)
        return (
            <CatchErrorBoundary>
                <button name="increment" onClick={this.handlClick.bind(this)}>click increment</button>
                <button name="decrement" onClick={this.handlClick.bind(this)}>click decrement</button>
                <button name="multiply" onClick={this.handlClick.bind(this)}>click multiply</button>
                <Link to="/">unAunth</Link>
            </CatchErrorBoundary>
        );
    }
}


