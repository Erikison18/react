import React, {
    Component
} from 'react';

import { Table ,message} from 'antd';


const columns = [{
    title: '总量',
    dataIndex: 'count',
    key: 'count'
}, {
    title: '天',
    dataIndex: 'data',
    key: 'data',
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
}, {
    title: '渠道',
    dataIndex: 'channelName',
    key: 'channelName'
}, {
    title: '渠道id',
    dataIndex: 'channelId',
    key: 'channelId'
}];

class Statistics extends Component {

    state={
        paginationLoading:false,
        data:[]
    }
    componentDidMount() {
        this.setStateData();
    }

    render() {

        let {data,paginationLoading} = this.state;

        return (
            <Table
                loading={paginationLoading}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        );
    }

    async setStateData(){

        this.setState({
            paginationLoading:true
        });

        let data = await this.formatData();

        this.setState({
            data
        });

    }

    async formatData(){

        let result = await this.requestData();

        result.forEach((item,index)=>{
            item.key=index;
        });

        return result

    }

    async requestData(){

        try {

            let requestData = await fetch('/userHistoryDetail/getCountList');
            let {messageBody,code,message:messageDes} = await requestData.json();

            if(code==='9000'){

                this.setState({
                    paginationLoading:false
                });

                return messageBody;

            }else{
                message.error(messageDes);
            }

        } catch (e) {
            message.error(e.toString());
        }

    }

}

export default Statistics