import React, {
    Component
} from 'react';

import { Table ,message} from 'antd';

const columns = [{
    title: '接触总量',
    dataIndex: 'CONTACTCOUNT',
    key: 'CONTACTCOUNT'
}, {
    title: '响应总量',
    dataIndex: 'RESPONSECOUNT',
    key: 'RESPONSECOUNT'
},{
    title: '办理总量',
    dataIndex: 'HANDLECOUNT',
    key: 'HANDLECOUNT'
}];


class Detection extends Component {
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
            <div className="market-detection-body">
                <div className="market-detection-table">
                    <h3>最近5分钟</h3>
                    <Table
                        loading={paginationLoading}
                        columns={columns}
                        dataSource={data.fiveM}
                        pagination={false}
                    />
                </div>
                <div className="market-detection-table">
                    <h3>1个小时</h3>
                    <Table
                        loading={paginationLoading}
                        columns={columns}
                        dataSource={data.oneH}
                        pagination={false}
                    />
                </div>
                <div className="market-detection-table">
                    <h3>6个小时接触</h3>
                    <Table
                        loading={paginationLoading}
                        columns={columns}
                        dataSource={data.sixH}
                        pagination={false}
                    />
                </div>
            </div>
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

        result.fiveM.key='fiveM';
        result.oneH.key='oneH';
        result.sixH.key='sixH';

        result.fiveM = [result.fiveM]
        result.oneH = [result.oneH]
        result.sixH = [result.sixH]

        return result

    }

    async requestData(){

        try {

            let requestData = await fetch('/userHistoryDetail/getJcListByStatic');
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

export default Detection