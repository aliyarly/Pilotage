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

export default class PilotInfoModal extends Component {

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
    this.props.getModelData(this.props.record.key)
    console.log(this.props.ModelDown)
    const ModelDown = this.props.ModelDown? this.props.ModelDown:{
      dayNum: [1,2,3,4,5],
      timeValue: [10,20,30,15,35],
      timeType: [0, 1,0,1,0]
    }
    this._getData(ModelDown)
    // this.setState({
    //   visible: true,
    // },()=>{
    //   if(ModelDown){
    //     this._getData(ModelDown)
    //   }
    // });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
      showChart: false
    });
  };
  okHandler = () => {
    let key = this.props.record.id;
    const { onOk } = this.props;
    console.log('okHandler::',this.props)
    onOk();
    this.hideModelHandler();
  };
  // 测试数据
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
  _getData = (ModelDown)=>{
    // 从后端获取数据五天的间隔数据集合ModelDown,数据对应
      let res = {
        data: {
          // 横坐标的天数显示    
          dayNum: ModelDown.dayNum,
          //间隔时间
          timeValue: ModelDown.timeValue,
          //0表示百班，　１表示夜班
          timeType: ModelDown.timeType
        }
      }
      if(res){
        console.log('res',res);
        this.setState({
          // pilotInfoOption: {
          //   color:['#0097E0'],
          //   title : {
          //     text: '近期工作情况',
          //     show: true         
          //   },
          //   // tooltip : {
          //   //   trigger: 'item',
          //   //   formatter: "{a} <br/>{b} : {c} ({d}%)"
          //   // },
          //   // legend: {
          //   //   orient: 'vertical',
          //   //   bottom: '20',
          //   //   data: ['白班','夜班'],
          //   //   selectedMode: false
          //   // },
          //   xAxis: {
          //     name: '天数',
          //     type: 'value',
          //     data: res.data.dayNum
          //   },
          //   yAxis: {
          //     name:'休息时间间隔',
          //     type: 'value'
          //   },
          //   series : [
          //     {
          //       name: '近期工作情况',
          //       type: 'line',
          //       data:[
          //         res.data.timeValue
          //       ],              
          //       symbol: 'circle',
          //       symbolSize: 10,
          //       itemStyle: {
          //          color: (obj) => {
          //             console.log(obj, "PILOT INFO CHARTS")
          //             return  'blue'
          //          }
          //       },
          //     }
          //   ]
          // },  
          pilotInfoOption : {
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              height: '200px',
              width: '200px'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        },
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
    // })
  }

	showChart(option,el) {
		let pilotInfo = echarts.init(el);
		pilotInfo.setOption(option);
  }

  componentDidMount(){
    console.log('will mount pilot info ')

	}
  
  render() {
    const { children } = this.props;
    const {key} = this.props.record;
    const {ModelUp} = this.props;
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
    if(this.state.visible && this.props.ModelDown && this.props.ModelDown.length >0){
      console.log(this.props.ModelDown)
      this._getData(this.props.ModelDown)
    }
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
          bodyStyle= {{height: '80%'}}
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
          {this.state.showChart?
          <Row>
            <Col span={24}>
              <div className={styles.chart} id='pilotInfo'></div>
            </Col>
          </Row>:'无数据'}
        </Modal>
      </span>
    );
  }
}
