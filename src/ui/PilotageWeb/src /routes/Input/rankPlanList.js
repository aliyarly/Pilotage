import { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs,  Card,Button, Table, Divider} from 'antd';
const TabPane = Tabs.TabPane;

@connect(state=>({
    // dataBoatDate: state.inputBoat.dataBoatDate,
}))
export default class RankPlanList extends PureComponent {

    componentWillMount(){
        //初始化获取计划列表
        // this.props.dispatch({
        //     type: 'inputBoat/queryLeftListData',
        //     payload: {
        //         queryParam: 'prechoice'
        //     }
        //   })
    }

    columns = [
        { title: '序', width: 100, dataIndex: 'NOt', key: '   NOt'},
        { title: '中文船名', width: 100, dataIndex: 'vcVesCName', key: 'vcVesCName'
        },
        { title: '船长', dataIndex: 'veslength', key: '1', width: 100 },
        { title: '后吃水', dataIndex: 'nmBackGuage', key: '2', width: 60 },
        { title: '靠泊泊位', dataIndex: 'CHBERTHSIGN', key: '3', width: 60 },
        { title: '靠泊时间', dataIndex: 'SDBERTHTIMEPILOTAGE', key: '4', width: 60 },
        { title: '指泊时间', dataIndex: 'DTAPPOINTTIME', key: '5', width: 60 },
        { title: '指泊', dataIndex: 'CHAPPOINTPLACECODE', key: '6', width: 100 },
        { title: '危险品', dataIndex: 'CHONESTAKEFLAG', key: '7', width: 60 },
        { title: '艏驾驶', width: 100, dataIndex: 'CHDRIVERPLACEFLAG', key: 'CHPORTPILOTFLAG'},
        { title: '接送', width: 100, dataIndex: 'CHPORTPILOTFLAG', key: 'chVesType'},
        { title: '船类', dataIndex: 'chVesType', key: '1', width: 100 },
        { title: '引水1', dataIndex: 'VCPILOTREQUIRE1', key: '2', width: 60 },
        { title: '引水2', dataIndex: 'VCPILOTREQUIRE2', key: '3', width: 60 },
        { title: '拖轮', dataIndex: 'chDragVesClass', key: '4', width: 60 },
        { title: '引航员要求', dataIndex: 'VCPILOTREQUIRE', key: '5', width: 60 },
        { title: '船籍', dataIndex: 'CHNATIONCODE', key: '6', width: 100 },
        {
            title: '操作',
            key: 'action',
            width: 160,
            render: (text, record) => (
              <span>
                <a onClick={this.clickYinShui}>引水</a>
                <Divider type="vertical" />
                <a onClick={this.clickDetail}>详情</a>
              </span>
            ),
          }
    ];

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
      clickYinShui = (e) => {
          //open model
      }
      clickDetail = (record) => {
        return {
          onClick: () => {
               //进入详情页面
            console.log(record, 'row click', record.key, this.props)
            let href = `/input/pilot/${record.key}`;
            this.props.dispatch({
              type: 'inputPilotRank/routePilotDetail',
              payload:{
                href: href.trim(),
                planId: record.key || 1,
              }
            });
          }
        }
      }

    render(){
        const dataSource = [];
        for (let i = 0; i < 10; i++) {
            dataSource.push({
                key: i,
                NOt: '测试',
                vcVesCName: '测试',
                veslength: '测试',
                nmBackGuage: '测试',
                CHBERTHSIGN: '测试',
                SDBERTHTIMEPILOTAGE: '测试',
                DTAPPOINTTIME: '测试',
                CHAPPOINTPLACECODE: '测试',
                CHONESTAKEFLAG: '测试',
                CHDRIVERPLACEFLAG: '测试',
                CHPORTPILOTFLAG: '测试',
                chVesType: '测试',
                VCPILOTREQUIRE1: '测试',
                VCPILOTREQUIRE2: '测试',
                chDragVesClass: '测试',
                VCPILOTREQUIRE: '测试',
                CHNATIONCODE: '测试',
            });
          }
          
        return (
            <Card bordered={true} bodyStyle={{padding: '0px'}}
               >  
                <Tabs defaultActiveKey="sh">
                    <TabPane tab="上海" key="sh">
                        <Table 
                            rowSelection={this.rowSelection}
                            columns = {this.columns}
                            dataSource = {dataSource} 
                            scroll={{ x: 1300, y: 460 }}
                            size='small'
                            indentSize={8}
                            rowKey={record => record.id}
                            // onRow={this._rowClick}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        )
    }


}