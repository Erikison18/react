import React, {
    Component
} from 'react';

import { Table ,DatePicker ,message} from 'antd';

import qs from 'querystring';
import moment from 'moment';

const columns = [{
    title: '渠道',
    dataIndex: 'channelName',
    key: 'channelName'
}, {
    title: '渠道id',
    dataIndex: 'channelId',
    key: 'channelId'
},{
    title: '运营位',
    dataIndex: 'oppositeName',
    key: 'oppositeName'
},{
    title: '运营位id',
    dataIndex: 'opposite',
    key: 'opposite'
},{
    title: '接触次数',
    dataIndex: 'count',
    key: 'count'
}];


class Contend extends Component {
    state={
        paginationLoading:false,
        data:[],
        timeStr:moment().format('YYYY-MM-DD')
    }
    componentDidMount() {
        this.setStateData();
    }

    render() {

        let {data,paginationLoading,timeStr} = this.state;

        return (
            <div className="market-contend-content">
                <DatePicker className='condition' value={moment(timeStr, 'YYYY-MM-DD')} onChange={this.timeChange.bind(this)}/>
                <Table
                    loading={paginationLoading}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        );
    }

    timeChange(e,mode){

        this.setState({
            timeStr:mode
        },()=>{
            this.setStateData();
        });


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

            let requestData = await fetch('/userHistoryDetail/activityCompetition',{
                    body:qs.stringify({
                        timeStr:this.state.timeStr
                    })
                });
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

export default Contend