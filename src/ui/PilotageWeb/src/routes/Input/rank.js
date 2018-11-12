import { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout, Button, Row, Col } from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import commonStyle from '../../index.less';
import LeftRightLayout from 'layouts/LeftRightLayout';
import RankPlanList from './rankPlanList';
import RankPilotList from './rankPilotList';
import { push } from 'react-router-redux';
import PilotInfoModal from 'components/pilotInfoModal';
import AutoPilotModal from 'components/AutoPilotModal';

const Content = Layout.Content;
@connect(state=>({
  planIds: state.inputPilotRank.planIds,
  pilotIds:state.inputPilotRank.pilotIds
}))
export default class InputPlan extends PureComponent {

  echart_page = (e) => {
    //进入运维面板页面
    this.props.dispatch(push('/input/pilot/echart/'))
  }

  open_model_manual = (e) =>{

  }
  open_model_auto = (e) => {

  }
  _checkManInfo = (e) => {

  }
  _checkAutoInfo = (e) => {

  }
  getAutoInfoModelData = (autoIds) => {
    //TODO想后端发起自动派人的请求，并保存数据
    console.log(autoIds, 'get auto data with plan ids and pilot ids')

  }
  getManInfoModelData = (e) => {
    //发起手动派人的请求，并保存数据,暂时不处理

  }
  //第三个页面的入口
  render() {
    
    let autoData = {
      title: '自动派人结果',
      columns:[
        {
          title: '序号',
          dataIndex: 'planId',
          key: 'planId',
        },
        {
          title: '中文船名',
          dataIndex: 'vescName',
          key: 'vescName',
        },
        {
          title: '船厂',
          dataIndex: 'vesLength',
          key: 'vesLength',
        },
        // TODO 添加其它与后台返回的同类型数据

    ]}
    // 从后台获取的自动派人结果数据集合 this.props.autoData,一旦处理返回重新渲染
    autoData.data = this.props.autoData? this.props.autoData: 
      //测试数据
      [
        {
          key: 'planId',
          planId:  '测试数据',
          vescName: '测试数据',
          vesLength: '测试数据'
        },{
          key: 'vescName',
          planId:  '测试数据',
          vescName: '测试数据',
          vesLength: '测试数据'
        },{
          key: 'vesLength',
          planId:  '测试数据',
          vescName: '测试数据',
          vesLength: '测试数据'
        }
      ]
    //自动派人所选择的左侧和右侧数据集合{planIds:[], pilotIds: []}用于获取自动派人结果
    let autoIds = {
      planIds: this.props.planIds,
      pilotIds: this.props.pilotIds
    }
    //当同时选择了左侧和右侧的数据之后，按钮才处于有效状态,默认不可用
    let hasSelected = false;
    if(autoIds.planIds && autoIds.pilotIds){
      hasSelected = autoIds.planIds.length > 0 && autoIds.pilotIds.length > 0
    }
    return (
      <PageHeaderLayout 
        content="左边选择任务， 右边选择航员"
        extraContent={<div>
            <Button type="primary" 
            onClick={this.echart_page}
            >运维看板
            </Button>
            <PilotInfoModal record={autoData} 
              onOk={this._checkManInfo}
              getModelData={this.getManInfoModelData}>
                <Button type="primary" 
                disabled={!hasSelected}
                >手动派人</Button>
            </PilotInfoModal>
            <AutoPilotModal record={autoData} 
            onOk={this._checkAutoInfo}
            getModelData={this.getAutoInfoModelData}
            autoIds = {autoIds}
            >
              <Button type="primary"
              disabled={!hasSelected}
              >自动派人</Button> 
            </AutoPilotModal>         
            </div>}
      >
       <Content className={commonStyle.content}>
           <LeftRightLayout>
              <RankPlanList />
              <RankPilotList />
            </LeftRightLayout>
        </Content>
      </PageHeaderLayout>
    )
  }
}