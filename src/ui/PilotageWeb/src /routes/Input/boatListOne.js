import { PureComponent } from 'react';
import { connect } from 'dva';
import TableWithSearchBar from 'components/TableWithSearchBar';
import { Table , Tabs} from 'antd';
const TabPane = Tabs.TabPane;

@connect(state=>({
    dataBoatPreChoice: state.inputBoat.dataBoatPreChoice,
}))
export default class BoatListOne extends PureComponent {
    
    componentWillUnmount(){
        console.log('will unmount')
        this.props.dispatch({
            type: 'inputBoat/resetInfo',
            payload: {
                dataBoatPreChoice: null
            }
            })
    }
    columns = [
        { title: '预确报时间', width: 100, dataIndex: 'ETA', key: 'ETA'},
        { title: '中文船名', width: 100, dataIndex: 'vcVesCName', key: 'vcVesCName'},
        { title: '英文船名', dataIndex: 'vcVesEName', key: '1', width: 100 },
        { title: '船代', dataIndex: 'chvesagentname', key: '2', width: 60 },
        { title: '船籍', dataIndex: 'chNationCode', key: '3', width: 60 },
        { title: '船类', dataIndex: 'vestypecode', key: '4', width: 60 },
        { title: '船长度', dataIndex: 'veslength', key: '5', width: 60 },
        { title: '预确报位置', dataIndex: 'charriveplacesign', key: '6', width: 100 },
        { title: '码头', dataIndex: 'DOCKNAME', key: '7', width: 60 },
        
    ];
    queryList = (value) => {
        console.log('get table data now')
    }
    rowSelection = {
        // 写入数据至state
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.vcVesCName === 'Disabled User', // Column configuration not to be checked
          name: record.vcVesCName,
        }),
      };
    render(){
        // TODO add pagenation handle
        const dataSource = [];
        if (this.props.dataBoatPreChoice){
            console.log(this.props.dataBoatPreChoice, "this.props.dataBoatPreChoice")
            this.props.dataBoatPreChoice.forEach((data, index) => {
                dataSource.push({
                    key: index,
                    ETA: data.ETA.substr(8,2)+'/'+data.ETA.substr(11,2)+data.ETA.substr(14,2),//need format XX/XXXX
                    vcVesCName: data.vcVesCName,
                    vcVesEName: data.vcVesEName,
                    chvesagentname: data.chvesagentname,
                    chNationCode: data.chNationCode,
                    vestypecode: data.vestypecode,
                    veslength: data.veslength,
                    charriveplacesign: data.charriveplacesign,
                    DOCKNAME: data.DOCKNAME,
                  });
              })
        }
        return (
            <Table 
            rowSelection={this.rowSelection}
            columns = {this.columns}
            dataSource = {dataSource} 
            scroll={{ x: 1000, y: 460 }}
            size='small'
            indentSize={8} 
            />
        )
    }


}