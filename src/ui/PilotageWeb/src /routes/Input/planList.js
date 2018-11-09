import { PureComponent } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';


@connect(state=>({
    inputPlanData: state.inputPlan.inputPlanData,
}))
export default class PlanList extends PureComponent {
    // 期船listview
    componentWillMount(){
        console.log('will mount plan list')
        this.props.dispatch({
            type: 'inputPlan/queryListData',
            payload: {
                inputPlanData: null
            }
          })
    }
    componentWillUnmount(){
        console.log('will unmount')
            this.props.dispatch({
                type: 'inputPlan/resetInfo',
                payload: {
                    inputPlanData: null
                }
              })
    }
    columns = [
        { title: ' 序', width: 100, dataIndex: 'inno1', key: 'inno1'},
        { title: '中文船名', width: 140, dataIndex: 'vcVesCName', key: 'vcVesCName',
            render: text => <a href="javascript:;">{text}</a>,},
        { title: '英文船名', dataIndex: 'vcVesEName', key: 'vcVesEName', width: 100 },
        { title: '船长', width: 100, dataIndex: 'veslength', key: 'veslength'},
        { title: '前吃水', dataIndex: 'nmFrontGuage', key: 'nmFrontGuage', width: 60 },
        { title: '后吃水', dataIndex: 'nmBackGuage', key: 'nmBackGuage', width: 60 },
        { title: '靠泊泊位', dataIndex: 'chBerthSignName', key: 'chBerthSignName', width: 60 },
        { title: '靠泊方式', dataIndex: 'berthway', key: 'berthway', width: 60 },
        { title: '靠泊时间', dataIndex: 'sdBerthTimePilotage', key: 'sdBerthTimePilotage', width: 60 },
        { title: '指泊时间', dataIndex: 'dtAppointTime', key: 'dtAppointTime', width: 100 },
        { title: '指泊', dataIndex: 'CHAPPOINTPLACENAME', key: 'CHAPPOINTPLACENAME', width: 60 },
        { title: '拖轮', dataIndex: 'chDragVesClass', key: 'chDragVesClass', width: 60 },
        { title: '代理申请', dataIndex: 'VCDLTL', key: 'VCDLTL', width: 100 },  
        { title: '船代', dataIndex: 'DL', key: 'DL', width: 100 },   
        { title: '船型', dataIndex: 'chVesType', key: 'chVesType', width: 60 },
        { title: '船宽', dataIndex: 'NMVESWIDTH', key: 'NMVESWIDTH', width: 60 },
        { title: '船籍', dataIndex: 'chNation', key: 'chNation', width: 60 },
        { title: '危', dataIndex: 'CHONESTAKEFLAG', key: 'CHONESTAKEFLAG', width: 100 },
        { title: '调头地点', dataIndex: 'chturnplace', key: 'chturnplace', width: 60 },
        { title: '备注', dataIndex: 'VCMEMO', key: 'VCMEMO', width: 60 },
        { title: '重点船', dataIndex: 'CHKEYVESFLAG', key: 'CHKEYVESFLAG', width: 100 },  
        { title: '预确报', dataIndex: 'yqbsj ', key: 'yqbsj ', width: 100 },  
    ];
    queryList = (value) => {
        console.log('get table data now')
    }
    _rowClick = (record) => {
        return {
          onClick: () => {
               //进入详情页面
            console.log(record, 'row click', record.key, this.props)
            let href = `/input/plan/detail/${record.key}`;
            this.props.dispatch({
              type: 'inputPlan/routePlanDetail',
              payload:{
                href: href.trim(),
                planId: record.key || 1,
              }
            });
          }
        }
      }
    render(){
        const dataSource = [];
        //从models->inputBoat中获取数据
        if (this.props.inputPlanData){
            console.log(this.props.inputPlanData, "this.props.dataBoatGroupUnValid")
            this.props.inputPlanData.forEach((data, index) => {
                dataSource.push({
                    key: data.chDynPlanID,
                    inno1: data.inno1,
                    vcVesCName: data.vcVesCName,
                    vcVesEName: data.vcVesEName,
                    veslength: data.veslength,
                    nmFrontGuage: data.nmFrontGuage,
                    nmBackGuage: data.nmBackGuage,
                    chBerthSignName: data.chBerthSignName,
                    berthway: data.berthway,
                    sdBerthTimePilotage: data.sdBerthTimePilotage,
                    dtAppointTime: data.dtAppointTime,
                    CHAPPOINTPLACENAME: data.CHAPPOINTPLACENAME,
                    chDragVesClass: data.chDragVesClass,
                    VCDLTL: data.VCDLTL,
                    DL: data.DL,
                    chVesType: data.chVesType,
                    NMVESWIDTH: data.NMVESWIDTH,
                    chNation: data.chNation,
                    CHONESTAKEFLAG: data.CHONESTAKEFLAG,
                    chturnplace: data.chturnplace,
                    VCMEMO: data.VCMEMO,
                    CHKEYVESFLAG: data.CHKEYVESFLAG,
                    yqbsj: data.yqbsj,
                  });
              })
        }
        return (
            <Table columns = {this.columns}
                        dataSource = {dataSource} 
                        scroll={{ x: 1300, y: 460 }}
                        size='small'
                        indentSize={8} 
                        onRow={this._rowClick}
            />
        )
    }


}
