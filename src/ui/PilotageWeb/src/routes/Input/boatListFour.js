import { PureComponent } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';


// 一定进行容器树上的数据绑定
@connect(state=>({
    dataBoatGroupUnValid: state.inputBoat.dataBoatGroupUnValid,
}))
export default class BoatListTwo extends PureComponent {
    // 期船listview
    componentWillMount(){
        console.log('will mount')
    }
    componentWillUnmount(){
        console.log('will unmount')
            this.props.dispatch({
                type: 'inputBoat/resetInfo',
                payload: {
                    dataBoatGroupUnValid: null
                }
              })
    }
    columns = [
        { title: '失败原因', width: 300, dataIndex: 'ERR', key: 'ERR'},
        { title: '预确报时间', width: 140, dataIndex: 'ETA', key: 'name'},
        { title: '中文船名', width: 120, dataIndex: 'vcVesCName', key: 'age'},
        { title: '英文船名', dataIndex: 'vcVesEName', key: 'vcVesEName', width: 200 },
        { title: '泊位', dataIndex: 'chberthsignname', key: 'chberthsignname', width: 60 },
        { title: '码头', dataIndex: 'DOCKname', key: 'DOCKname', width: 60 },
        { title: '计划时间', dataIndex: 'SDBERTHTIMECONFIRMED', key: 'SDBERTHTIMECONFIRMED', width: 100 },
        { title: '船类', dataIndex: 'vestypecode', key: 'vestypecode', width: 60 },
        { title: '船长度', dataIndex: 'veslength', key: 'veslength', width: 80 },
        { title: '预确报位置', dataIndex: 'charriveplacesign', key: 'charriveplacesign', width: 120 },
        { title: '船代', dataIndex: 'chvesagentname', key: 'chvesagentname', width: 60 },
        { title: '船籍', dataIndex: 'chNationCode', key: 'chNationCode', width: 60 },
        { title: '数据来源', dataIndex: 'CHUNITRESERVECN', key: 'CHUNITRESERVECN', width: 100 },  
        { title: '计划确认标志', dataIndex: 'chConfirmFlag', key: 'chConfirmFlag', width: 160 },    
    ];
    queryList = (value) => {
        console.log('get table data now')
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
    }
    render(){
        const dataSource = [];
        //从models->inputBoat中获取数据
        if (this.props.dataBoatGroupUnValid){
            console.log(this.props.dataBoatGroupUnValid, "this.props.dataBoatGroupUnValid")
            this.props.dataBoatGroupUnValid.forEach((data, index) => {
                dataSource.push({
                    key: index,
                    ERR: data.ERR,
                    ETA: data.ETA?data.ETA.substr(8,2)+'/'+
                    data.ETA.substr(11,2)+
                    data.ETA.substr(14,2): "暂无",
                    vcVesCName: data.vcVesCName,
                    vcVesEName: data.vcVesEName,
                    chvesagentname: data.chvesagentname,
                    chNationCode: data.chNationCode,
                    vestypecode: data.vestypecode,
                    veslength: data.veslength,//need formata 2 point .XX
                    charriveplacesign: data.charriveplacesign,
                    DOCKname: data.DOCKname,
                    CHUNITRESERVECN: data.CHUNITRESERVECN,
                    chberthsignname: data.chberthsignname,
                    SDBERTHTIMECONFIRMED: data.SDBERTHTIMECONFIRMED,
                    chConfirmFlag: data.chConfirmFlag
                  });
              })
        }
        return (
            <Table  rowSelection={this.rowSelection}
                    columns = {this.columns}
                    dataSource = {dataSource} 
                    scroll={{ x: 1600, y: 460 }}
                    size='small'
                    indentSize={8} 
            />
        )
    }


}
