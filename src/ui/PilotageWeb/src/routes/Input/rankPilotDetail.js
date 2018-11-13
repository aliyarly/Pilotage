import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Input , 
  Row, Col, Avatar, List, Card } from 'antd';
import { DEFAULT_AVATAR } from '../../common/configs';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import * as inputPilotRankService from '../../services/inputPilotRank'
import styles from './rankChart.less';
@connect(state=>({
    ModelUp: state.inputPilotRank.inputPilotUpDetail,
    ModelDown:state.inputPilotRank.inputPilotDownDetail
}))
export default class PilotDetailInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showChart: false,
      pilotInfoOption: {},
    };
  }
  _getData = (pilotId)=>{
    inputPilotRankService.getPilotDownDeatil(pilotId).then((response)=>{
    console.log(response, response.data.results)
    // 从后端获取数据五天的间隔数据集合ModelDown,数据对应
      let res = {
        data: response.data.results
      }
      if(res){
        console.log('res',res);
        this.setState({ 
          pilotInfoOption : {
          title : {
              text: '近期工作情况',
              show: true         
            },
            xAxis: {
               name: '天数',
               type: 'category',
               data:  res.data.dayNum
            },
            yAxis: {
               name:'休息时间间隔',
                type: 'value'
            },
            series: [{
                name: '近期工作情况',
                data: res.data.timeValue,
                type: 'line',
                itemStyle: {
                   color: (obj) => {
                      console.log(obj, "PILOT INFO CHARTS")
                      return  'blue'
                   }
                },
            }]
        },
        showChart: true
        },()=>{
            let pilotInfo = document.querySelector('#pilotInfo');
            console.log(this.state.pilotInfoOption, pilotInfo)
            this.showChart(this.state.pilotInfoOption, pilotInfo);
        })
      }
    })
  }

    showChart(option,el) {
		let pilotInfo = echarts.init(el);
		pilotInfo.setOption(option);
    }

  componentDidMount(){
    console.log('will mount pilot info ')
    this._getData(this.props.match.params.id)
	}
  
  render() {
    const {ModelUp} = this.props;
      //替换成从后端读取的数据属性(请补全)
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
    return (
      <span>
        <Row gutter={10}>
          <Col span={4}>   
            <Avatar shape="square" size={64} icon="user" />   
          </Col>
          <Col span={20}>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={data}
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
          <div className={styles.chartBox}>
            {this.state.showChart?
            <Row>
                <Col span={24}>
                <div className={styles.chart} id='pilotInfo'></div>
                </Col>
            </Row>:'无数据'}
          </div>
      </span>
    );
  }



}