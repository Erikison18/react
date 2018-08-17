import React, {
    Component
} from 'react';

import {Table , Input, Button ,Row, Col, DatePicker, message} from 'antd';

import qs from 'querystring';
import moment from 'moment';

// const Option = Select.Option;
// const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';

const columns = [{
    title: '日期',
    dataIndex: 'timeStr',
    key: 'timeStr'
}, {
    title: '活动id',
    dataIndex: 'id',
    key: 'id'
}, {
    title: '活动名称',
    dataIndex: 'subitemName',
    key: 'subitemName'
}, {
    title: '渠道id',
    dataIndex: 'channelId',
    key: 'channelId'
}, {
    title: '触发时间',
    dataIndex: 'startTime',
    key: 'startTime',
}, {
    title: '目标客户数',
    dataIndex: 'accurateNum',
    key: 'accurateNum'
},{
    title: '接触数',
    dataIndex: 'contactCount',
    key: 'contactCount'
}];
class Send extends Component {
    state={
        data:[],
        // showTotal:(total)=> `Total ${total} items`,
        defaultCurrent:1,
        total:1,
        paginationLoading:false,
        // checkStatus:'',
        channelId:'',
        // id:'',
        timeStr:'',
        // approveStartTime:null,
        // approveEndTime:null,
        // startTime:null,
        // endTime:null,
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
            // checkStatus,
            channelId,
            // id,
            timeStr,
            // approveStartTime,
            // approveEndTime,
            // startTime,
            // endTime,
            queryBtnLoading
        } = this.state;

        return (
            <div>
                <Row gutter={4} className="market-query-condition">
                    <Col span={4}>
                        <DatePicker className='condition' value={timeStr&&moment(timeStr, 'YYYY-MM-DD')} onChange={this.timeChange.bind(this)}/>
                    </Col>
                    <Col span={4}><Input name="channelId" addonBefore="渠道id" value={channelId} onChange={this.inputChangeHandle.bind(this)}/></Col>
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

    timeChange(value,mode){
        this.setState({
            timeStr:mode
        });
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
            channelId,
            // id,
            timeStr
            // approveStartTime,
            // approveEndTime,
            // startTime,
            // endTime
        } = this.state;

        try {

            let requestData = await fetch('/subitemSendHistory/messageSend',{
                    body:qs.stringify({
                        pageNum:page,
                        // pageSize:10,
                        // checkStatus,
                        channelId,
                        timeStr
                        // id,
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

export default Send