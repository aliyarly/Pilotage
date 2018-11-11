import React, { Component } from 'react';
import { Modal, Form, Input , 
  Row, Col, Avatar, List, Card } from 'antd';
import { DEFAULT_AVATAR } from '../../common/configs'
const FormItem = Form.Item;

class PilotInfoModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    //通过pilotId来获取引航员详细信息
    this.props.getModelData(this.props.record.key)
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    let key = this.props.record.id;
    const { onOk } = this.props;
    console.log('okHandler::',this.props)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.id = key;
        onOk(values);
        this.hideModelHandler();
      }
    });
  };
  data = [
    {
      title: '工号',
      value: '测试'
    },
    {
      title: '档次',
      value: '测试'
    },
    {
      title: '姓名',
      value: '测试'
    },
    {
      title: '功能档次',
      value: '测试'
    },
    {
      title: '类别',
      value: '测试'
    },
    {
      title: '升档日期',
      value: '测试'
    },
    {
      title: '工作地点',
      value: '测试'
    },
    {
      title: '工作住本地',
      value: '测试'
    },
    {
      title: '归属',
      value: '测试'
    },
    {
      title: '工作时间',
      value: '测试'
    },
    {
      title: '手机号码',
      value: '测试'
    },
    {
      title: '到站时间',
      value: '测试'
    },
  ];
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {key} = this.props.record;
    const {ModelUp, ModelDown} = this.props
    if(ModelUp){
      //TODO替换成从后端读取的数据属性
      this.data = [
        {
          title: '工号',
          value: ModelUp.gonghao
        },
        {
          title: '档次',
          value: ModelUp.dangci
        },
        {
          title: '姓名',
          value: ModelUp.xinmin
        },
        {
          title: '功能档次',
          value: ModelUp.gongnengdangci
        },
        {
          title: '类别',
          value: '测试'
        },
        {
          title: '升档日期',
          value: '测试'
        },
        {
          title: '工作地点',
          value: '测试'
        },
        {
          title: '工作住本地',
          value: '测试'
        },
        {
          title: '归属',
          value: '测试'
        },
        {
          title: '工作时间',
          value: '测试'
        },
        {
          title: '手机号码',
          value: '测试'
        },
        {
          title: '到站时间',
          value: '测试'
        },
      ]
    }
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="引航员信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
        <Row gutter={10}>
          <Col span={4}>   
            <Avatar shape="square" size={64} icon="user" />   
          </Col>
          <Col span={20}>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={this.data}
              split={false}
              size={'small'}
              renderItem={item => (
                <List.Item>
                  <span style={{margin: '0 24px 0 0'}}>{item.title}:</span>
                  <span>{item.value}</span>
                </List.Item>
              )}
              />
          </Col>
          </Row>
          <Row>
          <Col span={24}>折线图</Col>
          </Row>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PilotInfoModal);