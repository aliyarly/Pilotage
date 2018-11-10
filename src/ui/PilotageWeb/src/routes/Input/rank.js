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
  //第三个页面的入口
  render() {

    let record = {};
    return (
      <PageHeaderLayout 
        content="左边选择任务， 右边选择航员"
        extraContent={<div>
            <Button type="primary" onClick={this.echart_page}>运维看板</Button>
            <PilotInfoModal record={record} onOk={this._checkManInfo}>
              <Button type="primary" >手动派人</Button>
            </PilotInfoModal>
            <PilotInfoModal record={record} onOk={this._checkAutoInfo}>
              <Button type="primary">自动派人</Button> 
            </PilotInfoModal>         
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