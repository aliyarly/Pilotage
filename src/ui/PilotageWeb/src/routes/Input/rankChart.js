import React, { Component } from 'react';
import { Layout } from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import commonStyle from '../../index.less';
import {  Menu, Icon, Breadcrumb, Row, Col, Card  } from 'antd';
import styles from './rankChart.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
const Content = Layout.Content;


export default class HelpText extends Component {
  constructor(props) {
		super(props);
		this.state = {
      showChart: false,
      userNumOption: {},
      pilotInfoOption: {}
		}
  }
  _getData = ()=>{
    // get data from server
    // rankInputService.queryStatistics().then((res)=>{
      let res = {
        data: {
          register: 100,
          realNameCertified: 60
        }
      }
      if(res){
        console.log('res',res);
        this.setState({
          userNumOption: {
            color:['#0097E0','#FF9FAA',],
            title : {
              text: '用户数 | USERS',
              show: false         
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              bottom: '20',
              data: ['注册用户数','实名认证数'],
              selectedMode: false
            },
            series : [
              {
                name: '用户数',
                type: 'pie',
                radius : '55%',
                center: ['50%', '35%'],
                label: {
                    normal: {
                        position: 'inner',
                        formatter: '{d}%'
                    }
                },
                data:[
                  {value:res.data.register, name:'注册用户数'},
                  {value:res.data.realNameCertified, name:'实名认证数'},
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          },
          // 双折线图实例
          pilotInfoOption:{
            title : {
              text: '近期工作情况',
              show: true         
            },
            color:['#0097E0','#FF9FAA',],
            legend: {
              data: ['白班','夜班'],
            },
            xAxis: {
                name: '天数',
                type: 'category',
                data: [1,2,3,4,5],
            },
            yAxis: {
              name:'休息时间间隔',
                type: 'value'
            },
            series: [{
                data: [10,15,0,35,0],
                type: 'line',
                name: '白班'
            },
          {
            data: [20,0,30, 0, 0],
                type: 'line',
                name: '夜班'
          }]
        },
          showChart: true
        },()=>{
          let userNum = document.querySelector('#userNum');
          this.showChart(this.state.userNumOption, userNum);
          let pilotInfo = document.querySelector('#pilotInfo');
          console.log(this.state.pilotInfoOption, pilotInfo)
          this.showChart(this.state.pilotInfoOption, pilotInfo);
        })
      }
    // })
  }
	componentDidMount(){
    this._getData();
	}
	showChart(option,el) {
		let userNum = echarts.init(el);
		userNum.setOption(option);
	}
  render() {
    return (
      <PageHeaderLayout>
        <Content className={commonStyle.content}>
          <div className={styles.chartBox}>
          {this.state.showChart?
            <Row gutter={8}>
              <Col className="gutter-row" lg={24} md={24}>
                <Card title={this.state.userNumOption.title.text}>
                  <div className={styles.chart} id='userNum'></div>
                </Card>
              </Col>
              <Col className="gutter-row" lg={24} md={24}>
                    <div className={styles.chart} id='pilotInfo'></div>
              </Col>
            </Row>
            :'未获取到数据'
          }
			</div>
        </Content>
      </PageHeaderLayout>
    )
  }
}
