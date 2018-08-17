import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import * as actiontor from '@actions/async.js';
import * as actiontordemo1 from '@actions/demo1.js';

import {Row, Col, Alert, Spin, message} from 'antd';

// import qs from 'querystring';

@connect(
    state => state,
    (dispatch, ownProps) => bindActionCreators(Object.assign({},actiontordemo1,actiontor) , dispatch)
)
class Overstock extends Component {

    state={
        loading:false,
        messageTodaymessageBody:'',
        messageOverstockMessageBody:''
    }

    componentDidMount() {

        this.setStateData();

        this.props.asyncAction();
        this.props.demo1Action({demo1:123});

    }

    render() {

        let {
            loading,
            messageTodaymessageBody,
            messageOverstockMessageBody
        } = this.state;

        if(loading) return <Spin/>

        return (
            <Row type="flex" gutter={16}>
                <Col span={24}>
                    <Alert message={`今日短信总量：${messageTodaymessageBody}`} type="info" />
                </Col>
                <Col span={24} style={{marginTop:'8px'}}>
                    <Alert message={`短信积压：${messageOverstockMessageBody}`} type="info" />
                </Col>
            </Row>
        )
    }


    async setStateData(){

        this.setState({
            loading:true,
        });

        let {messageTodaymessageBody,messageOverstockMessageBody} = await this.formatData();

        this.setState({messageTodaymessageBody,messageOverstockMessageBody});

    }

    async formatData(){

        let result = await this.requestData();

        return result

    }

    async requestData(){

        try {

            let requestData = await Promise.all([fetch('/subitemSendHistory/messageToday'),fetch('/subitemSendHistory/messageOverstock')])

            let [
                    {
                        code:messageTodayCode,
                        message:messageTodayMessage,
                        messageBody:messageTodaymessageBody
                    },
                    {
                        code:messageOverstockCode,
                        message:messageOverstockMessage,
                        messageBody:messageOverstockMessageBody
                    }
                ] = [
                    await requestData[0].json(),
                    await requestData[1].json()
                ];

            this.setState({
                loading:false
            });

            if(messageTodayCode==='9000'&&messageOverstockCode==='9000'){
                return {messageTodaymessageBody,messageOverstockMessageBody};
            }else{
                message.error(`${messageTodayMessage},${messageOverstockMessage}`);
            }


        } catch (e) {
            message.error(e.toString());
        }

    }

}

export default Overstock