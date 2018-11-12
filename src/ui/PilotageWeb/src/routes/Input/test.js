import React, { Component } from 'react';
import { Modal, Form, Input , 
  Row, Col, Avatar, List, Card } from 'antd';
import { DEFAULT_AVATAR } from '../../common/configs';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
const FormItem = Form.Item;

class PilotInfoModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showChart: false,
			pilotInfoOption: {},
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
      showChart: true,
    });
  };

  hideModelHandler = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
      showChart: false
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
    },
    {
      title: '档次',
    },
    {
      title: '姓名',
    },
    {
      title: '功能档次',
    },
    {
      title: '类别',
    },
    {
      title: '升档日期',
    },
    {
      title: '工作地点',
    },
    {
      title: '工作住本地',
    },
    {
      title: '归属',
    },
    {
      title: '工作时间',
    },
    {
      title: '手机号码',
    },
    {
      title: '到站时间',
    },
  ];
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {id, name, email, website } = this.props.record;

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
                  <span>测试数据</span>
                </List.Item>
              )}
              />
          </Col>
          </Row>
          <Row>
          <Col span={24}>
            
          </Col>
          </Row>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PilotInfoModal);