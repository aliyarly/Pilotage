import { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card,Button  } from 'antd';


@connect(state=>({
    dataBoatPlan: state.inputBoat.dataBoatPlan,
}))
export default class BoatDetail extends PureComponent {

    componentWillMount(){
        //初始化获取进口计划列表
        this.props.dispatch({
            type: 'inputBoat/queryRightListData',
            payload: {
                queryParam: ''
            }
          })
    }
    componentWillUnmount(){
        console.log('will unmount')
        this.props.dispatch({
            type: 'inputBoat/resetInfo',
            payload: {
                dataBoatPlan: null
            }
            })
    }
    columns = [
        { title: '中文船名', width: 50, dataIndex: 'vcVesCName', 
                            key: 'vcVesCName'},
        { title: '英文船名', width: 100, dataIndex: 'vcVesEName', 
                            key: 'vcVesEName'},
        { title: '船籍', dataIndex: 'chNationCode', 
            key: 'chNationCode', width: 50},
        { title: '船类', dataIndex: 'vestypecode', 
            key: 'vestypecode', width: 50 },
        { title: '船长', dataIndex: 'nmVesLength', 
            key: 'nmVesLength', width: 50 },
        { title: '码头', dataIndex: 'DOCKname', 
            key: 'DOCKname', width: 50 },  
    ];
    queryList = (value) => {
        //通常用于分页请求
        console.log('get table data now', value)
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
      _removeBoat = (e) => {
          
      }
    render(){
        const dataSource = [];
        if (this.props.dataBoatPlan){
            console.log(this.props.dataBoatPlan, "this.props.dataBoatPlan")
            this.props.dataBoatPlan.forEach((data, index) => {
                dataSource.push({
                    key: index,
                    vcVesCName: data.vcVesCName,
                    vcVesEName: data.vcVesEName,
                    chNationCode: data.chNationCode,
                    vestypecode: data.vestypecode,
                    nmVesLength: data.nmVesLength,
                    DOCKname: data.DOCKname,
                  });
              })
        }
        return (
            <Card bordered={false} 
            extra={
            <div>
              <Button type="primary" onClick={this._removeBoat} >删除</Button>
            </div>}
            >  
            <Table  rowSelection={this.rowSelection}
                    columns = {this.columns}
                    dataSource = {dataSource} 
                    scroll={{ x: 350, y: 680 }} 
                    pagination={false}
                    title={() => '进口计划'}
                    size='small'
                    indentSize={8} 
                />
          </Card>
            

        )
    }


}