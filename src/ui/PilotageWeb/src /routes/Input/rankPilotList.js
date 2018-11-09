import { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card,Button  } from 'antd';
import PilotInfoModal from 'components/pilotInfoModal';

@connect(state=>({
    dataBoatPlan: state.inputBoat.dataBoatPlan,
}))
export default class RankPilotList extends PureComponent {

    // componentWillMount(){
    //     //初始化获取进口计划列表
    //     this.props.dispatch({
    //         type: 'inputBoat/queryPilotListData',
    //         payload: {
    //             queryParam: ''
    //         }
    //       })
    // }
    // componentWillUnmount(){
    //     console.log('will unmount')
    //     this.props.dispatch({
    //         type: 'inputBoat/resetInfo',
    //         payload: {
    //             dataBoatPlan: null
    //         }
    //         })
    // }
    _ckeckInfo = (e) => {


    }
    columns = [
        { title: '引航员', width: 50, dataIndex: 'VCPILOTNAME', 
                            key: 'VCPILOTNAME'},
        { title: '功能档次', width: 100, dataIndex: 'VCPILOTFUNGRADE', 
                            key: 'VCPILOTFUNGRADE'},
        { title: '到站时间', dataIndex: 'DESTATIONTIME', 
            key: 'DESTATIONTIME', width: 50},
        { title: '结束地', dataIndex: 'VCSTATIONPLACE', 
            key: 'VCSTATIONPLACE', width: 50 },
        { title: '作业泊位', dataIndex: 'VCBERTHCODE', 
            key: 'VCBERTHCODE', width: 50 },
        { title: '作业时间', dataIndex: 'DTBERTHTIME', 
            key: 'DTBERTHTIME', width: 50 }, 
        // TODO open model
        { title: '操作', dataIndex: '', key: 'x', 
        render: (text, record) => (
            <span>
              <PilotInfoModal record={record} onOk={this._ckeckInfo}>
                <a style={{marginRight: 10 }}>信息</a>
              </PilotInfoModal>
            </span>
          )
        }, 
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

    render(){
        const dataSource = [];
        for (let i = 0; i < 10; i++) {
            dataSource.push({
                key: i,
                VCPILOTNAME: '测试',
                VCPILOTFUNGRADE: '测试',
                DESTATIONTIME: '测试',
                VCSTATIONPLACE: '测试',
                VCBERTHCODE: '测试',
                DTBERTHTIME: '测试',
            });
          }
        // if (this.props.dataBoatPlan){
        //     console.log(this.props.dataBoatPlan, "this.props.dataBoatPlan")
        //     this.props.dataBoatPlan.forEach((data, index) => {
        //         dataSource.push({
        //             key: index,
        //             vcVesCName: data.vcVesCName,
        //             vcVesEName: data.vcVesEName,
        //             chNationCode: data.chNationCode,
        //             vestypecode: data.vestypecode,
        //             veslength: data.veslength,
        //             DOCKNAME: data.DOCKNAME,
        //           });
        //       })
        // }
        return (
            <Card bordered={false} bodyStyle={{padding: '0px'}}
            >  
                <Table  rowSelection={this.rowSelection}
                        columns = {this.columns}
                        dataSource = {dataSource} 
                        scroll={{ x: 350, y: 580 }} 
                        pagination={false}
                        title={() => '引航员表'}
                        size='small'
                        indentSize={8} 
                    />
          </Card>
            

        )
    }


}