import React, { Component } from 'react';
import { Modal, Table } from 'antd';

//航道水深的model
export default　class DeepTableModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.props.getModelData()
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
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
        >
        <Table  columns = {columns}
                dataSource = {dataSource} 
                size='small'
                indentSize={8} 
        />
        </Modal>
      </span>
    );
  }
}
