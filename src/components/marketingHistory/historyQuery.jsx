import React, {
    Component
} from 'react';


import {Table , Input, Select, Button, DatePicker ,Row, Col, message} from 'antd';

import qs from 'querystring';
import moment from 'moment';

const Option = Select.Option;
const { MonthPicker } = DatePicker;

const columns = [{
    title: '创建时间',
    dataIndex: 'data',
    key: 'data'
}, {
    title: '渠道',
    dataIndex: 'channelName',
    key: 'channelName'
}, {
    title: '渠道id',
    dataIndex: 'channelId',
    key: 'channelId'
}, {
    title: '活动',
    dataIndex: 'subitemName',
    key: 'subitemName'
}, {
    title: '活动id',
    dataIndex: 'subitemId',
    key: 'subitemId'
}, {
    title: '手机号码',
    dataIndex: 'telno',
    key: 'telno'
}, {
    title: '类型',
    dataIndex: 'statStatus',
    key: 'statStatus',
    render(id){
        if(id===1){
            return '接触统计'
        }else if(id===2){
            return '响应统计'
        }else if(id===3){
            return '办理统计'
        }
    }
},{
    title: '虚拟产品',
    dataIndex: 'privilegeId',
    key: 'privilegeId',
    render(id){
        if(id===1){
            return '是'
        }else {
            return '否'
        }
    }
}, {
    title: 'cache校验状态',
    dataIndex: 'cache',
    key: 'cache'
}];


class HistoryQuery extends Component {
    state={
        userHistoryData:[],
        // showTotal:(total)=> `Total ${total} items`,
        defaultCurrent:1,
        total:1,
        paginationLoading:false,
        statStatus:'',
        channelId:'',
        subitemId:'',
        telno:'',
        tableMonth:moment().format('YYYY-MM'),
        privilegeId:'',
        queryBtnLoading:false
    }

    componentDidMount() {
        this.setStateData();
    }

    render() {

        let {
            userHistoryData,
            defaultCurrent,
            total,
            paginationLoading,
            statStatus,
            channelId,
            subitemId,
            telno,
            tableMonth,
            privilegeId,
            queryBtnLoading
        } = this.state;

        return (
            <div>
                <Row gutter={4} className="market-query-condition">
                    <Col span={3}>
                        <Select value={statStatus} style={{ width: '100%' }} onChange={this.statStatusChange.bind(this)}>
                            <Option value="">类型选择</Option>
                            <Option value={1}>接触统计</Option>
                            <Option value={2}>响应统计</Option>
                            <Option value={3}>办理统计</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Select value={privilegeId} style={{ width: '100%' }} onChange={this.privilegeIdChange.bind(this)}>
                            <Option value="">是否虚拟产品</Option>
                            <Option value={1}>是虚拟产品</Option>
                            <Option value={2}>否虚拟产品</Option>
                        </Select>
                    </Col>
                    <Col span={4}><Input addonBefore="渠道id" value={channelId} onChange={this.channelIdChange.bind(this)}/></Col>
                    <Col span={4}><Input addonBefore="活动id" value={subitemId} onChange={this.subitemIdChange.bind(this)}/></Col>
                    <Col span={4}><Input addonBefore="手机号码" value={telno} onChange={this.telnoChange.bind(this)}/></Col>
                    <Col span={4}><MonthPicker value={moment(tableMonth,'YYYY-MM')} onChange={this.tableMonthChange.bind(this)}/></Col>
                    <Col span={2}><Button type="primary" icon="search" loading={queryBtnLoading} onClick={this.queryClick.bind(this)}>查询</Button></Col>
                </Row>
                <Table
                    loading={paginationLoading}
                    columns={columns}
                    dataSource={userHistoryData}
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

    statStatusChange(value,e){
        this.setState({
            statStatus:value
        });
    }

    privilegeIdChange(value,e){
        this.setState({
            privilegeId:value
        });
    }

    channelIdChange(e){
        this.setState({
            channelId:e.target.value
        });
    }

    subitemIdChange(e){
        this.setState({
            subitemId:e.target.value
        });
    }

    telnoChange(e){
        this.setState({
            telno:e.target.value
        });
    }

    tableMonthChange(value, mode){
        this.setState({
            tableMonth:mode
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
            userHistoryData:list,
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
            statStatus,
            channelId,
            subitemId,
            telno,
            tableMonth,
            privilegeId
        } = this.state;

        try {

            let requestData = await fetch('/userHistoryDetail/getList',{
                    body:qs.stringify({
                        pageNum:page,
                        pageSize:10,
                        statStatus,
                        channelId,
                        subitemId,
                        telno,
                        tableMonth,
                        privilegeId,
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

export default HistoryQuery