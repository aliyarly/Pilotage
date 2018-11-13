import React, { Component } from 'react';
import { Modal, Input , 
  Row, Col, Avatar, List, Card } from 'antd';
import { DEFAULT_AVATAR } from '../../common/configs';
import styles from './pilotInfoModal.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import * as inputPilotRankService from '../../services/inputPilotRank'

export default class PilotInfoModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showChart: false,
      pilotInfoOption: {},
      flag: false
    };
  }
  
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.props.getModelData(this.props.record.key)
    this._getData(this.props.record.key)
  };

  hideModelHandler = () => {
    console.log('okHandler:: cancel modal now', this.props)
    this.setState({
      visible: false,
      showChart: false
    });
    this.props.onCancel()
  };

  okHandler = () => {
    let key = this.props.record.id;
    const { onOk } = this.props;
    console.log('okHandler::',this.props)
    onOk();
    this.hideModelHandler();
  };

  _getData = (pilotId)=>{
    //同步阻塞获取引航员详情的下半部分数据
    inputPilotRankService.getPilotDownDeatil(pilotId).then((response)=>{
    console.log(response, response.data.results)
    // 从后端获取数据五天的间隔数据集合,数据对应
      let res = {
        data: response.data.results
      }
      const timeType = res.data.timeType
      const pilotInfoOption = {
        title : {
            left: 'center',
            text: '近期工作情况',
            show: true , 
            subtext:  "蓝点：白班\n 红点：夜班",
            subtextStyle:{
              color: "#242b33",
              fontSize: 12,
              fontFamily:'hangzhou'   
            } 
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
             name: '天数',
             nameLocation: 'end',
             type: 'category',
             data:  res.data.dayNum
          },
          yAxis: {
             name:'休息时间间隔',
             nameLocation: 'end',
             padding: [10, 10],
             type: 'value'
          },
          series: [{
              name: '近期工作情况',
              data: res.data.timeValue,
              type: 'line',
              symbol: 'circle',
              symbolSize: 10,
              itemStyle: {
                 color: (obj) => {
                    console.log(timeType[obj.dataIndex],"PILOT INFO")
                    if(timeType[obj.dataIndex] === 0){
                      // 白班
                      return '#1325ec'
                    } else{
                      return '#ec1334'
                    }                 
                 }
              },
          }]
      }
      if(res){
        console.log('res',res);
        this.setState({
          pilotInfoOption: pilotInfoOption,
          visible: true,
          showChart: true
        },()=>{
          setTimeout(()=>{
            let pilotInfo = document.querySelector('#pilotInfo');
            console.log(this.state.pilotInfoOption, pilotInfo)
            this.showChart(this.state.pilotInfoOption, pilotInfo);
          },1000)

        })
      }
    })
  }

	showChart(option,el) {
		let pilotInfo = echarts.init(el);
		pilotInfo.setOption(option);
  }

  componentWillUnmount(){
    console.log('will unmount pilot info ')
  }
  
  render() {
    const { children } = this.props;
    const {key} = this.props.record;
    const {ModelUp} = this.props;
    console.log('render pilot info modal now', this.props)
      //TODO替换成从后端读取的数据属性
    let data = [
      {
        title: '工号',
        value: ModelUp && ModelUp.gonghao?ModelUp.gonghao:"暂无"
      },
      {
        title: '档次',
        value:  ModelUp && ModelUp.dangci?ModelUp.dangci:"暂无"
      },
      {
        title: '姓名',
        value:  ModelUp && ModelUp.xinmin?ModelUp.xinmin:"暂无"
      },
      {
        title: '功能档次',
        value:  ModelUp && ModelUp.gongnengdangci?ModelUp.gongnengdangci:"暂无"
      },
      {
        title: '类别',
        value: '暂无'
      },
      {
        title: '升档日期',
        value: '暂无'
      },
      {
        title: '工作地点',
        value: '暂无'
      },
      {
        title: '工作住本地',
        value: '暂无'
      },
      {
        title: '归属',
        value: '暂无'
      },
      {
        title: '工作时间',
        value: '暂无'
      },
      {
        title: '手机号码',
        value: '暂无'
      },
      {
        title: '到站时间',
        value: '暂无'
      },
    ]
    // 测试数据
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
          footer={null}
          destroyOnClose={true}
          width='650px'
        >
        <Row gutter={10}>
          <Col span={6}>
          <div className={styles.avatarHolder}>
              <img alt="" src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' />
          </div>
          </Col>
          <Col span={18}>
            <List
              grid={{ gutter: 8, column: 2 }}
              dataSource={data}
              split={false}
              size={'small'}
              renderItem={item => (
                <List.Item>
                  <span style={{margin: '0 12px 0 0'}}>{item.title}:</span>
                  <span>{item.value}</span>
                </List.Item>
              )}
              />
          </Col>
          </Row>
          <div className={styles.chartBox}>
            {this.state.showChart?
            <Row>
                <Col span={24}>
                <div className={styles.chart} id='pilotInfo'></div>
                </Col>
            </Row>:'无数据'}
          </div>
          </Modal>
      </span>
    );
  }
}
