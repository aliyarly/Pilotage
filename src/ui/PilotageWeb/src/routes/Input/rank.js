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
  getAutoInfoModelData = (e) => {
    //发起自动派人的请求，并保存数据


  }
  getManInfoModelData = (e) => {
    //发起手动派人的请求，并保存数据

  }
  //第三个页面的入口
  render() {
    // 从后台获取的自动派人结果数据集合
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
    //自动派人所选择的左侧和右侧数据集合{'planIds':[], 'pilotIds': []}用于获取自动派人结果
    // TODO 如何存储获取选择的数据项
    const autoIds = null;
    return (
      <PageHeaderLayout 
        content="左边选择任务， 右边选择航员"
        extraContent={<div>
            <Button type="primary" onClick={this.echart_page}>运维看板</Button>
            <PilotInfoModal record={autoData} 
              onOk={this._checkManInfo}
              getModelData={this.getManInfoModelData}>
                <Button type="primary" 
                >手动派人</Button>
            </PilotInfoModal>
            <AutoPilotModal record={autoData} 
            onOk={this._checkAutoInfo}
            getModelData={this.getAutoInfoModelData}
            autoIds = {autoIds}
            >
              <Button type="primary">自动派人</Button> 
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