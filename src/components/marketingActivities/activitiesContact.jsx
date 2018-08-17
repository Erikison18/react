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
    dataIndex: 'id',
    key: 'id'
}, {
    title: '活动名称',
    dataIndex: 'subitemName',
    key: 'subitemName'
}, {
    title: '主题id',
    dataIndex: 'promotionSubjectId',
    key: 'promotionSubjectId'
}, {
    title: '主题名称',
    dataIndex: 'promotionSubjectName',
    key: 'promotionSubjectName'
}, {
    title: '状态',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    render(id){
        if(id==='0'){
            return '待提交'
        }else if(id==='1'){
            return '审核中'
        }else if(id==='2'){
            return '驳回'
        }else if(id==='3'){
            return '通过'
        }
    }
}, {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority'
}, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    // render(id){
    //     if(id===1){
    //         return '接触统计'
    //     }else if(id===2){
    //         return '响应统计'
    //     }else if(id===3){
    //         return '办理统计'
    //     }
    // }
},{
    title: '审核时间',
    dataIndex: 'approveTime',
    key: 'approveTime',
    // render(id){
    //     if(id===1){
    //         return '是'
    //     }else {
    //         return '否'
    //     }
    // }
}, {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime'
}, {
    title: '目标数',
    dataIndex: 'accurateNum',
    key: 'accurateNum'
}, {
    title: '接触量',
    dataIndex: 'contactCount',
    key: 'contactCount'
}, {
    title: '响应量',
    dataIndex: 'responseCount',
    key: 'responseCount'
}, {
    title: '办理量',
    dataIndex: 'handleCount',
    key: 'handleCount'
}];
class ActivitiesContact extends Component {
    state={
        data:[],
        // showTotal:(total)=> `Total ${total} items`,
        defaultCurrent:1,
        total:1,
        paginationLoading:false,
        // checkStatus:'',
        channelId:'',
        id:'',
        // approveStartTime:null,
        // approveEndTime:null,
        // startTime:null,
        // endTime:null,
        queryBtnLoading:false
    }

    componentDidMount() {
        this.setStateData();
    }

    componentWillUnmount() {
        fetch.abort();
    }

    render() {

        let {
            data,
            defaultCurrent,
            total,
            paginationLoading,
            // checkStatus,
            channelId,
            id,
            // approveStartTime,
            // approveEndTime,
            // startTime,
            // endTime,
            queryBtnLoading
        } = this.state;

        return (
            <div>
                <Row gutter={4} className="market-query-condition">
                    <Col span={4}><Input name="channelId" addonBefore="渠道id" value={channelId} onChange={this.inputChangeHandle.bind(this)}/></Col>
                    <Col span={4}><Input name="id" addonBefore="活动id" value={id} onChange={this.inputChangeHandle.bind(this)}/></Col>
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

    approveTimeHandle(value,mode){
        this.setState({
            approveStartTime:mode[0],
            approveEndTime:mode[1]
        });
    }

    subitemTimeHandle(value,mode){
        this.setState({
            startTime:mode[0],
            endTime:mode[1]
        });
    }

    statStatusChange(value,e){
        this.setState({
            checkStatus:value
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

        if(result&&result.list&&result.list instanceof Array)
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
            id,
            // approveStartTime,
            // approveEndTime,
            // startTime,
            // endTime
        } = this.state;

        try {

            this.requestData = fetch('/promotionSubitem/subitemContact',{
                body:qs.stringify({
                    pageNum:page,
                    pageSize:10,
                    // checkStatus,
                    channelId,
                    id,
                    // approveStartTime,
                    // approveEndTime,
                    // startTime,
                    // endTime
                })
            })

            // return fetch('/promotionSubitem/subitemContact',{
            //     body:qs.stringify({
            //         pageNum:page,
            //         pageSize:10,
            //         // checkStatus,
            //         channelId,
            //         id,
            //         // approveStartTime,
            //         // approveEndTime,
            //         // startTime,
            //         // endTime
            //     })
            // })
            //     .then((res)=>{
            //         return res.json();
            //     })
            //     .then(({messageBody,code,message:messageDes})=>{
            //         console.log(messageBody,code,messageDes)
            //         this.setState({
            //             paginationLoading:false,
            //             queryBtnLoading:false
            //         });

            //         if(code==='9000'){
            //             return messageBody;
            //         }else{
            //             message.error(messageDes);
            //         }
            //     })

            let requestData = await this.requestData;

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

export default ActivitiesContact