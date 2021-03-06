import React, { Component } from 'react';
import { Modal, Table } from 'antd';

//自动派人的Modal
export default　class AutoPilotModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.props.getModelData(this.props.autoIds)
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
    this.props.onCancel()
  };

  okHandler = () => {
    console.log('okHandler::',this.props)
    this.props.onOk();
    this.hideModelHandler();
  };

  render() {
    const { children } = this.props;
    const dataSource = this.props.record.data;
    const columns = this.props.record.columns
    const title = this.props.record.title;
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          footer={null}
          destroyOnClose={true}
        >
        <Table  columns = {columns}
                dataSource = {dataSource} 
                size='small'
                indentSize={8} 
                pagination={false}
        />
        </Modal>
      </span>
    );
  }
}