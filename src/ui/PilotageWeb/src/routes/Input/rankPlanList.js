import { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs,  Card,Button, Table, Divider} from 'antd';
const TabPane = Tabs.TabPane;

@connect(state=>({
    inputPlanLeftData: state.inputPilotRank.inputPlanLeftData,
}))
export default class RankPlanList extends PureComponent {

    componentWillMount(){
        // 初始化获取计划列表
        this.props.dispatch({
            type: 'inputPilotRank/queryLeftData',
          })
    }
    state = {
        selectedRowKeys: [],
      };

    columns = [
        { title: '序', width: 100, dataIndex: 'INNO', key: '   INNO'},
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: 60,
            render: (text, record) => {
                return (
                <span>
                  {text.map((item, index) => 
                  <span>
                  <a onClick={() => this._action(record, item, index)}>{item}</a> <Divider type="vertical" />
                  </span>
                )}
                </span>
                )
                }
        },
        { title: '中文船名', width: 100, dataIndex: 'vcVesCName', key: 'vcVesCName'
        },
        { title: '船长', dataIndex: 'nmVesLength', key: 'nmVesLength', width: 100 },
        { title: '后吃水', dataIndex: 'NMBACKGUAGE', key: 'NMBACKGUAGE', width:100 },
        { title: '靠泊泊位', dataIndex: 'chberthsign', key: 'chberthsign', width: 100 },
        { title: '靠泊时间', dataIndex: 'sdBerthTimePilotage', key: 'sdBerthTimePilotage', width: 100 },
        { title: '指泊时间', dataIndex: 'dtAppointTime', key: 'dtAppointTime', width: 100 },
        { title: '指泊', dataIndex: 'chappointplacecode', key: 'chappointplacecode', width: 100 },
        { title: '危险品', dataIndex: 'CHONESTAKEFLAG', key: 'CHONESTAKEFLAG', width: 80 },
        { title: '艏驾驶', width: 100, dataIndex: 'CHDRIVERPLACEFLAG', key: 'CHDRIVERPLACEFLAG'},
        { title: '接送', width: 100, dataIndex: 'chPortPilotFlag', key: 'chPortPilotFlag'},
        { title: '船类', dataIndex: 'chVesType', key: 'chVesType', width: 100 },
        { title: '引水1', dataIndex: 'vcpilotrequire1', key: 'vcpilotrequire1', width: 60 },
        { title: '引水2', dataIndex: 'vcpilotrequire2', key: 'vcpilotrequire2', width: 60 },
        { title: '拖轮', dataIndex: 'chDragVesClass', key: 'chDragVesClass', width: 60 },
        { title: '引航员要求', dataIndex: 'vcPilotRequire', key: 'vcPilotRequire', width: 200 },
        { title: '船籍', dataIndex: 'CHNATIONCODE', key: 'CHNATIONCODE', width: 100 },
        
    ];
    _action = (record, text, index) => {
        console.log(record, text, index);    
        if(index === 0){
            console.log('click　引水')
            this.clickYinShui(record, text, index)
        } else if(index === 1){
            console.log('click　详情')
            this.clickDetail(record, text, index)
        } else{
            console.log('click invalid row action')
        }
    }

    clickYinShui = (e) => {
        //open model
    }

    clickDetail = (record, item) => {
        //进入详情页面
        console.log(record, item, 'row click')
        this.props.dispatch({
            type: 'inputPilotRank/routePilotDetail',
            payload:{
            pilotId: record.key || 1,
            }
        });
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        //存储左边表中选择的数据至store
        this.props.dispatch({
            type: 'inputPilotRank/storePlanids',
            payload:{
                planIds: selectedRowKeys
            }  
        })
    }

    render(){
        const dataSource = [];
        for (let i = 0; i < 11; i++) {
            dataSource.push({
                key: i,
                INNO: '测试',
                vcVesCName: '测试',
                nmVesLength: '测试',
                NMBACKGUAGE: '测试',
                chberthsign: '测试',
                sdBerthTimePilotage: '测试',
                dtAppointTime: '测试',
                chappointplacecode: '测试',
                CHONESTAKEFLAG: '测试',
                CHDRIVERPLACEFLAG: '测试',
                chPortPilotFlag: '测试',
                chVesType: '测试',
                vcpilotrequire1: '测试',
                vcpilotrequire2: '测试',
                chDragVesClass: '测试',
                vcPilotRequire: '测试',
                CHNATIONCODE: '测试',
                action: ['引水']
            });
          }
        // 真实数据
        if (this.props.inputPlanLeftData){
            console.log(this.props.inputPlanLeftData, "this.props.inputPlanLeftData")
            this.props.inputPlanLeftData.forEach((data, index) => {
                dataSource.push({
                    key: index,
                    INNO: data.INNO,
                    vcVesCName: data.vcVesCName,
                    nmVesLength: data.nmVesLength,
                    NMBACKGUAGE: data.NMBACKGUAGE,
                    chberthsign: data.chberthsign,
                    sdBerthTimePilotage: data.sdBerthTimePilotage,
                    dtAppointTime: data.dtAppointTime,
                    chappointplacecode: data.chappointplacecode,
                    CHONESTAKEFLAG: data.CHONESTAKEFLAG,
                    CHDRIVERPLACEFLAG: data.CHDRIVERPLACEFLAG,
                    chPortPilotFlag: data.chPortPilotFlag,
                    chVesType: data.chVesType,
                    vcpilotrequire1: data.vcpilotrequire1,
                    vcpilotrequire2: data.vcpilotrequire2,
                    chDragVesClass: data.chDragVesClass,
                    vcPilotRequire: data.vcPilotRequire,
                    CHNATIONCODE: data.CHNATIONCODE,
                    action: ['引水']
                  });
              })
        }
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return (
            <Card bordered={true} bodyStyle={{padding: '0px'}}
               >  
                <Tabs defaultActiveKey="sh">
                    <TabPane tab="上海" key="sh">
                        <Table rowSelection={rowSelection}
                            columns = {this.columns}
                            dataSource = {dataSource} 
                            scroll={{ x: 1300, y: 460 }}
                            size='small'
                            indentSize={8}
                            rowKey={record => record.id}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        )
    }


}