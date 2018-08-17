import React, {
    Component
} from 'react';
import { Table ,message} from 'antd';
import qs from 'querystring';

const columns = [{
    title: 'db日志',
    dataIndex: 'des',
    key: 'des',
    render(id,{createTime,ip,instanceId,content}){
        return `${createTime}   ${ip}   :   ${instanceId}   ${content}`
    }
}];


class Log extends Component {

    state={
        paginationLoading:false,
        data:[],
        defaultCurrent:1,
        total:1
    }

    componentDidMount() {
        this.setStateData();
    }

    render() {

        let {data,paginationLoading,defaultCurrent,total} = this.state;

        return (
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
        );
    }

    pageChange(page, pageSize){
        this.setStateData(page);
    }

    async setStateData(){

        this.setState({
            paginationLoading:true
        });

        let {list,currentPage,totalPage} = await this.formatData();

        this.setState({
            data:list,
            defaultCurrent:currentPage,
            total:totalPage
        });

    }

    async formatData(){

        let result = await this.requestData();
        if(result&&result.list instanceof Array){
            result.list.forEach((item,index)=>{
                item.key=index;
            });
        }else{
            result={
                list:[]
            }
        }
        return result

    }

    async requestData(){

        try {

            let requestData = await fetch('/businessDiary/getList',{
                    body:qs.stringify({
                        businessNumber:'test'
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

export default Log