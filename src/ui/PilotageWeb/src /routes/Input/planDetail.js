import { PureComponent } from 'react';
import { Layout, Form, Button, Input, Row, Col } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import commonStyle from '../../index.less';
import PilotInfoModal from 'components/pilotInfoModal';
import { push } from 'react-router-redux';
const Content = Layout.Content;
const FormItem = Form.Item;

const fieldLabels = {
  cnName: '中文名称',
  enName: '英文名称',
  chuanxin: '船型',
  huhao: '呼号',
  chuandai: '船代',
  chuanji: '船籍',
  zaizhongdun:'载重吨',
  chuanchang: '船长',
  chuankuan: '船宽',
  chishui: '吃水',
  shangyigang: '上一港',
  mudigang: '目的港',
  xiayigang:　'下一港',
  kaopomatou: '靠泊码头',
  yudishijian: '预抵时间',
  kaobobowei:　'靠泊泊位',
  fangshi: '方式',
  jiaojieshijian: '交接时间',
  diaotoushijian: '调头时间',
  diaotoudidian: '调头地点',
  tuolunleibie: '拖轮类别',
  shijian: '时间',
  fangshi: '方式',
  yuquebao: '预确报',
  weizhi: '位置',
  zhiboshijian: '指泊时间',
  zhibodidian: '指泊地点',
  jiesonggongju: '接送工具',
  Npifu: 'Ｎ批复',
  yinshuiyaoqiu: '引水要求',
  yin: '引',
  jiashi : '驾驶',
  jie: '接',
  yijiweixian: '一级危险',
  wusonglianjian: '吴淞联检',
  lianjianshijian: '联检时间',
  jiesongfangshi: '接送方式',
  shijian: '时间',
  didian: '地点',
  zhongdianchuaan: '重点船',
  tuo: '拖',
  tizao: '提早',
  kangtai: '抗台',
  shuishanggaodu: '水上高度',
  guoqiaoxinxi: '过桥信息',
  boweiyanchi: '泊位延迟',
  hangdaojiaojie: '航道交接',
  jiaojiedidian: '交接地点',
  shikong: '失控',
  fancahoshui: '反潮水',
  beizhu: '备注',
};




@connect(state => ({
  currentPlanId: state.inputPlan.currentPlanId,
  detailsPlan: state.inputPlan.detailsPlan,
}))
@Form.create()
export default class PlanDetail extends PureComponent {
    // 进口计划详情页面
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
    this.props.dispatch(push('/input/plan'))    
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
        <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.cnName}
                    >
                    {getFieldDecorator('vcVesCName', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.chuanxin}>
                  {getFieldDecorator('vestypecode', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.huhao}>
                  {getFieldDecorator('number', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                  {...formItemLayout}
                  label={fieldLabels.enName}
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
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <FormItem
                  {...formItemLayout}
                  label={fieldLabels.chuandai}
                  >
                  {getFieldDecorator('DL', {
                      rules: [ {
                        initialValue:'测试数据',
                        required: true, message: '请输入',
                      }],
                  })(
                      <Input />
                  )}
                  </FormItem>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <FormItem
                  {...formItemLayout}
                  label={fieldLabels.chuanji}
                  >
                  {getFieldDecorator('chNationCode', {
                      rules: [ {
                        initialValue:'测试数据',
                        required: true, message: '请输入',
                      }],
                  })(
                      <Input />
                  )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                  {...formItemLayout}
                  label={fieldLabels.zaizhongdun}
                  >
                  {getFieldDecorator('zaizhongdun', {
                      rules: [ {
                        initialValue:'测试数据',
                        required: true, message: '请输入英文船名',
                      }],
                  })(
                    <Input />
                  )}
                  </FormItem>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <FormItem
                  {...formItemLayout}
                  label={fieldLabels.chuanchang}
                  >
                  {getFieldDecorator('nmVesLength', {
                      rules: [ {
                        initialValue:'测试数据',
                        required: true, message: '请输入',
                      }],
                  })(
                      <Input />
                  )}
                  </FormItem>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <FormItem
                  {...formItemLayout}
                  label={fieldLabels.chuankuan}
                  >
                  {getFieldDecorator('chuankuan', {
                      rules: [ {
                        initialValue:'测试数据',
                        required: true, message: '请输入',
                      }],
                  })(
                      <Input />
                  )}
                  </FormItem>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <FormItem
                  {...formItemLayout}
                  label={fieldLabels.chishui}
                  >
                  {getFieldDecorator('qianchishui', {
                      rules: [ {
                        initialValue:'测试数据',
                        required: true, message: '请输入',
                      }],
                  })(
                      <Input />
                  )}
                  </FormItem>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <FormItem
                  {...formItemLayout}
                  label={fieldLabels.chishui}
                  >
                  {getFieldDecorator('houchuankuan', {
                      rules: [ {
                        initialValue:'测试数据',
                        required: true, message: '请输入',
                      }],
                  })(
                      <Input />
                  )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.shangyigang}
                    >
                    {getFieldDecorator('shangyigang', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.xiayigang}>
                  {getFieldDecorator('xiayigang', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.mudigang}>
                  {getFieldDecorator('mudigang', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.kaobomatou}
                    >
                    {getFieldDecorator('kaopomatou', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.yudishijian}>
                  {getFieldDecorator('yudishijian', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.kaobobowei}
                    >
                    {getFieldDecorator('kaobobowei', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.fangshi}>
                  {getFieldDecorator('fangshi', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.jiaojieshijian}>
                  {getFieldDecorator('number', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.diaotoushijian}
                    >
                    {getFieldDecorator('diaotoushijian', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.diaotoushijian}>
                  {getFieldDecorator('diaotoushijian', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.diaotoudidian}>
                  {getFieldDecorator('diaotoudidian', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.tuolunleibie}
                    >
                    {getFieldDecorator('tuolunleibie', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.shijian}>
                  {getFieldDecorator('shijian', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.fangshi}>
                  {getFieldDecorator('fangshi', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.yuquebao}
                    >
                    {getFieldDecorator('yuquebao', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.weizhi}>
                  {getFieldDecorator('weizhi', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.zhiboshijian}
                    >
                    {getFieldDecorator('zhiboshijian', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.zhibodidian}>
                  {getFieldDecorator('zhibodidian', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.jiesonggongju}>
                  {getFieldDecorator('jiesonggongju', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.Npifu}
                    >
                    {getFieldDecorator('Npifu', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.yinshuiyaoqiu}>
                  {getFieldDecorator('yinshuiyaoqiu', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.yin}>
                  {getFieldDecorator('yin', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.jiashi}>
                  {getFieldDecorator('jiashi', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.jie}
                    >
                    {getFieldDecorator('jie', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.yijiweixian}>
                  {getFieldDecorator('yijiweixian', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.wusonglianjian}>
                  {getFieldDecorator('wusonglianjian', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.lianjianshijian}>
                  {getFieldDecorator('lianjianshijian', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.jiesongfangshi}
                    >
                    {getFieldDecorator('jiesongfangshi', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.shijian}>
                  {getFieldDecorator('shijian', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.didian}>
                  {getFieldDecorator('didian', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.zhongdianchuaan}
                    >
                    {getFieldDecorator('zhongdianchuaan', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.tuo}>
                  {getFieldDecorator('tuo', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.tizao}>
                  {getFieldDecorator('tizao', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.kangtai}>
                  {getFieldDecorator('kangtai', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.shuishanggaodu}
                    >
                    {getFieldDecorator('shuishanggaodu', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.guoqiaoxinxi}>
                  {getFieldDecorator('guoqiaoxinxi', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.boweiyanchi}>
                  {getFieldDecorator('boweiyanchi', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.hangdaojiaojie}
                    >
                    {getFieldDecorator('hangdaojiaojie', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.jiaojiedidian}>
                  {getFieldDecorator('jiaojiedidian', {
                     initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.shikong}>
                  {getFieldDecorator('shikong', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.fancahoshui}>
                  {getFieldDecorator('shikong', {
                    initialValue:'测试数据',
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                    {...formItemLayout}
                    label={fieldLabels.beizhu}
                    >
                    {getFieldDecorator('beizhu', {
                        rules: [ {
                          initialValue:'测试数据',
                          required: true, message: '请输入中文船名',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
              </Col>
             </Row>
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