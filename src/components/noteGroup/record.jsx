import React, {
    Component
} from 'react';

import {Table , Input, Button ,Row, Col, message} from 'antd';

import qs from 'querystring';
// import moment from 'moment';

// const Option = Select.Option;
// const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';

const columns = [{
    title: '活动id',
    dataIndex: 'activityId',
    key: 'activityId'
}, {
    title: '电话号码',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
}, {
    title: '创建时间',
    dataIndex: 'releaseTime',
    key: 'releaseTime'
}, {
    title: '短信唯一标示',
    dataIndex: 'sendId',
    key: 'sendId'
}, {
    title: '端口',
    dataIndex: 'sendPort',
    key: 'sendPort'
}];

class Record extends Component {
    state={
        data:[],
        // showTotal:(total)=> `Total ${total} items`,
        defaultCurrent:1,
        total:1,
        paginationLoading:false,
        phoneNumber:'',
        activityId:'',
        queryBtnLoading:false
    }

    componentDidMount() {
        this.setStateData();
    }

    render() {

        let {
            data,
            defaultCurrent,
            total,
            paginationLoading,
            phoneNumber,
            activityId,
            queryBtnLoading
        } = this.state;

        return (
            <div>
                <Row gutter={4} className="market-query-condition">
                    <Col span={4}><Input name="phoneNumber" addonBefore="电话号码" value={phoneNumber} onChange={this.inputChangeHandle.bind(this)}/></Col>
                    <Col span={4}><Input name="activityId" addonBefore="活动id" value={activityId} onChange={this.inputChangeHandle.bind(this)}/></Col>
                    <Col span={2}><Button type="primary" icon="search" loading={queryBtnLoading} onClick={this.queryClick.bind(this)}>查询</Button></Col>
                </Row>
                <Table
                    loading={paginationLoading}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        showSize:true,
                        showQuickJumper:true,
                        defaultCurrent,
                        total,
                        onChange:this.pageChange.bind(this)
                    }}
                />
            </div>
        )
    }

    queryClick(){

        this.setStateData();

    }

    inputChangeHandle(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    pageChange(page, pageSize){
        this.setStateData(page);
    }

    async setStateData(page){

        this.setState({
            paginationLoading:true,
            queryBtnLoading:true
        });

        let {list,currentPage,totalPage} = await this.formatData(page);

        this.setState({
            data:list,
            defaultCurrent:currentPage,
            total:totalPage
        });

    }

    async formatData(page){

        let result = await this.requestData(page);

        if(result&&result.list instanceof Array)
            result.list.forEach((item,index)=>{
                item.key=index;
            });
        else{
            result={
                list:[]
            }
        }

        return result

    }

    async requestData(page=1){

        let {
            // checkStatus,
            phoneNumber,
            activityId,
            // approveStartTime,
            // approveEndTime,
            // startTime,
            // endTime
        } = this.state;

        try {

            let requestData = await fetch('/subitemSendHistory/getList',{
                    body:qs.stringify({
                        pageNum:page,
                        // pageSize:10,
                        // checkStatus,
                        phoneNumber,
                        activityId,
                        // approveStartTime,
                        // approveEndTime,
                        // startTime,
                        // endTime
                    })
                });

            let {messageBody,code,message:messageDes} = await requestData.json();

            this.setState({
                paginationLoading:false,
                queryBtnLoading:false
            });

            if(code==='9000'){
                return messageBody;
            }else{
                message.error(messageDes);
            }

        } catch (e) {
            message.error(e.toString());
        }

    }

}

export default Record