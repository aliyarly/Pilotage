import { PureComponent } from 'react';
import { Layout, Form ,Button, Input} from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import commonStyle from '../../index.less';
import PilotInfoModal from 'components/pilotInfoModal';
import { push } from 'react-router-redux';
const Content = Layout.Content;
const FormItem = Form.Item;

@connect(state => ({
  currentPilotId: state.inputPilotRank.currentPilotId,
  inputPilotDetail: state.inputPilotRank.inputPilotDetail,
}))
@Form.create()
export default class RankPlanDetail extends PureComponent {
  _checkCaoShuiInfo = (e) => {

  }
  _checkShuiShenInfo = (e) => {


  }
  _checkBoWeiInfo = (e) => {


  }
  _checkStatusInfo = (e) => {


  }
  handleSubmit = (e) => {


  }
  cancle = (e) => {
    //切换页面
    this.props.dispatch(push('/input/pilot'))    
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const currentRecord = this.props.detailsPlan || {};
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 7 },
    };
    let record = {}
    return (
      <PageHeaderLayout
        content="进口计划"
        extraContent={<div>
          <PilotInfoModal record={record} onClick={this._checkCaoShuiInfo}>
              <Button type="primary">潮水表</Button>
          </PilotInfoModal>
          <PilotInfoModal record={record} onOk={this._checkShuiShenInfo}>
            <Button type="primary" >航道水深</Button>
          </PilotInfoModal>
          <PilotInfoModal record={record} onOk={this._checkBoWeiInfo}>
              <Button type="primary">泊位查询</Button> 
          </PilotInfoModal>
          <PilotInfoModal record={record} onOk={this._checkStatusInfo}>
              <Button type="primary">船况查询</Button> 
          </PilotInfoModal>          
        </div>}
      >
        <Content className={commonStyle.content}>
          <Form onSubmit={this.handleSubmit}>
              <FormItem
                  {...formItemLayout}
                  label="中文船名"
                  >
                  {getFieldDecorator('vcVesCName', {
                      rules: [ {
                        initialValue:'测试数据',
                        required: true, message: '请输入中文船名',
                      }],
                  })(
                      <Input />
                  )}
              </FormItem>
              <FormItem
              {...formItemLayout}
              label="英文船名"
              >
              {getFieldDecorator('vcVesEName', {
                  rules: [ {
                    initialValue:'测试数据',
                    required: true, message: '请输入英文船名',
                  }],
              })(
                  <Input />
              )}
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 6 }} >
                  <Button onClick={this.cancle}>取消</Button>
                  <Button type="primary" htmlType="submit">保存</Button>
              </FormItem>
          </Form>
        </Content>
      </PageHeaderLayout>
    )
  }
}
