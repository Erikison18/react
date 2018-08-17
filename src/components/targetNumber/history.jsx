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
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
}, {
    title: '活动id',
    dataIndex: 'subitemId',
    key: 'subitemId'
}, {
    title: '活动名称',
    dataIndex: 'subitemName',
    key: 'subitemName'
}, {
    title: '渠道',
    dataIndex: 'channelId',
    key: 'channelId'
}, {
    title: '目标客户数',
    dataIndex: 'accurateNum',
    key: 'accurateNum'
}];

class History extends Component {
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
            activityId,
            queryBtnLoading
        } = this.state;

        return (
            <div>
                <Row gutter={4} className="market-query-condition">
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
            activityId:subitemId,
            // approveStartTime,
            // approveEndTime,
            // startTime,
            // endTime
        } = this.state;

        try {

            let requestData = await fetch('/targetCustomer/history',{
                    body:qs.stringify({
                        // pageNum:page,
                        // pageSize:10,
                        // checkStatus,
                        subitemId,
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

export default History