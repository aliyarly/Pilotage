import { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card,Button,Select,} from 'antd';
import PilotInfoModal from 'components/pilotInfoModal';
import SearchBar from 'components/SearchBar';
import TableWithSearchBar from 'components/TableWithSearchBar';

const Option = Select.Option;

@connect(state=>({
    inputPilotList: state.inputPilotRank.inputPilotList,
    pilotStatus: state.inputPilotRank.pilotStatus,
    inputPilotUpDetail: state.inputPilotRank.inputPilotUpDetail,
    inputPilotDownDetail:state.inputPilotRank.inputPilotDownDetail
}))
export default class RankPilotList extends PureComponent {
    state = {
        pilotId: null
    }
    componentWillMount(){
        //初始化获取进口计划列表
        this.props.dispatch({
            type: 'inputPilotRank/queryRightData',
            payload: {
                queryParam: ''
            }
          })
          this.props.dispatch({
            type: 'inputPilotRank/queryPilotStatus',
            payload: {
                queryParam: ''
            }
          })
          
    }
    _ckeckInfo = (e) => {


    }
    getPilotInfoModelData = (pilotId) => {
        //获取引航员详情的上半部分数据
        this.props.dispatch({
            type: 'inputPilotRank/queryPilotUpDeatil',
            payload: {
                id: pilotId ? pilotId : 1
            }
          })
        //获取引航员详情的下半部分数据
          this.props.dispatch({
            type: 'inputPilotRank/queryPilotDownDeatil',
            payload: {
                id: pilotId ? pilotId : 1
            }
          })


    }
    columns = [
        { title: '操作', dataIndex: '', key: 'x',  width: 60,
        render: (text, record) => {
            console.log(text, record, "PILOT")
            return (
            <span>
              <PilotInfoModal record={record} 
              onOk={this._ckeckInfo}
              getModelData={this.getPilotInfoModelData}
              ModelUp={this.props.inputPilotUpDetail}
              ModelDown={this.props.inputPilotDownDetail}>
                <a style={{marginRight: 10 }}>信息</a>
              </PilotInfoModal>
            </span>)
        }
        }, 
        { title: '引航员', width: 80, dataIndex: 'vcpilotname', 
                            key: 'vcpilotname'},
        { title: '功能档次', width: 100, dataIndex: 'chpilotgrade', 
                            key: 'chpilotgrade'},
        { title: '到站时间', dataIndex: 'dtinstationtime', 
            key: 'dtinstationtime', width: 80},
        { title: '结束地', dataIndex: 'vcstationplace', 
            key: 'vcstationplace', width: 80 },
        { title: '作业泊位', dataIndex: 'vcberthcode', 
            key: 'vcberthcode', width: 80 },
        { title: '作业时间', dataIndex: 'dtberthtime', 
            key: 'dtberthtime', width: 80 }, 
    ];
    queryList = (value) => {
        //通常用于分页请求
        console.log('get table data now', value)
    }
    rowSelection = {
        // 选择行数据
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
    search = e => {
         //获取选择的引航员状态，
         //发送事件去远端get数据，更新state.inputPilotRank.inputPilotDetail,自动触发渲染
    }
    reset = e => {
        //返回修改前的值，什么都不处理
    }

    render(){
        const pilotStatusOption = []
        if(this.props.pilotStatus){
            this.props.pilotStatus.forEach((data, index) => {
                pilotStatusOption.push(
                    <Option value={data.NMSORT} key={data.NMSORT}>
                        {data.VCSYSDESC}
                    </Option>
                )
            })
        }
        const searchItems = [
            {
              label: '引航员',
              //查询状态的属性值？？不确定是否该属性值，请自行校验补充
              key: 'NMDORT',
              spanLayouts: {
                xs: 24,
                sm: 12,
                md: 16,
                lg: 16,
              },
              formItemLayout: {
                labelCol: {
                  xs: { span: 24 },
                  sm: { span: 4 },
                },
                wrapperCol: {
                  xs: { span: 24 },
                  sm: { span: 20 },
                },
              },
              tag: (<Select 
                        initialValue={this.props.pilotStatus?
                            this.props.pilotStatus[0].NMSORT:
                            ''} 
                        >
                        {pilotStatusOption}
                    </Select>)
            },
           
          ]
        const dataSource = [];
        // 测试数据
        for (let i = 0; i < 10; i++) {
            dataSource.push({
                key: i,
                vcpilotname: '测试',
                chpilotgrade: '测试',
                dtinstationtime: '测试',
                vcstationplace: '测试',
                vcberthcode: '测试',
                dtberthtime: '测试',
            });
          }
        // 真实数据
        if (this.props.inputPilotList){
            console.log(this.props.inputPilotList, "this.props.inputPilotList")
            this.props.inputPilotList.forEach((data, index) => {
                dataSource.push({
                    // 改写成pilotid的值传递至引航员model中，即key: data.****
                    key: index,
                    vcpilotname: data.vcpilotname,
                    chpilotgrade: data.chpilotgrade,
                    dtinstationtime: data.dtinstationtime,
                    vcstationplace: data.vcstationplace,
                    vcberthcode: data.vcberthcode,
                    dtberthtime: data.dtberthtime,
                  });
              })
        }
        return (
            <Card bordered={false} bodyStyle={{padding: '0px', heught: '460px' }}
            >  
                <SearchBar  
                    searchItems={searchItems} 
                    search={this.search} 
                    reset={this.reset} 
                />
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