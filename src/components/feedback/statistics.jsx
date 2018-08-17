import React, {
    Component
} from 'react';

import {Row, Col, Spin, Alert, message} from 'antd';

// import qs from 'querystring';

class Statistics extends Component {
    state={
        loading:false,
        getTJmessageBody:'',
        getTJ10MessageBody:''
    }

    componentDidMount() {
        this.setStateData();
    }

    render() {

        let {
            loading,
            getTJmessageBody:{
                fiveM,
                oneH,
                sixH
            },
            getTJ10MessageBody
        } = this.state;

        if(loading) return <Spin/>

        return (
            <Row type="flex" gutter={16}>
                <Col span={24}>
                    <Alert message={`5分钟：${fiveM}`} type="info" />
                </Col>
                <Col span={24} style={{marginTop:'8px'}}>
                    <Alert message={`1小时：${oneH}`} type="info" />
                </Col>
                <Col span={24} style={{marginTop:'8px'}}>
                    <Alert message={`6小时：${sixH}`} type="info" />
                </Col>
                <Col span={24} style={{marginTop:'8px'}}>
                    <Alert message={`最近10天：${getTJ10MessageBody}`} type="info" />
                </Col>
            </Row>
        )
    }


    async setStateData(page){

        this.setState({
            paginationLoading:true,
            queryBtnLoading:true
        });

        let {getTJmessageBody,getTJ10MessageBody} = await this.formatData(page);

        this.setState({getTJmessageBody,getTJ10MessageBody});

    }

    async formatData(page){

        let result = await this.requestData(page);

        return result

    }

    async requestData(page=1){

        try {

            let requestData = await Promise.all([fetch('/customerFeedback/getTJ'),fetch('/customerFeedback/getTJ10')])

            let [
                    {
                        code:getTJCode,
                        message:getTJMessage,
                        messageBody:getTJmessageBody
                    },
                    {
                        code:getTJ10Code,
                        message:getTJ10Message,
                        messageBody:getTJ10MessageBody
                    }
                ] = [
                    await requestData[0].json(),
                    await requestData[1].json()
                ];

            this.setState({
                loading:false
            });

            if(getTJCode==='9000'&&getTJ10Code==='9000'){
                return {getTJmessageBody,getTJ10MessageBody};
            }else{
                message.error(`${getTJMessage},${getTJ10Message}`);
            }

        } catch (e) {
            message.error(e.toString());
        }

    }

}

export default Statistics