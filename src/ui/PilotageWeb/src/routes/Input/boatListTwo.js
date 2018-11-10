import { PureComponent } from 'react';
import { connect } from 'dva';
import { Table , Tabs} from 'antd';


// 一定进行容器树上的数据绑定
@connect(state=>({
    dataBoatDate: state.inputBoat.dataBoatDate,
}))
export default class BoatListTwo extends PureComponent {
    // 期船listview
    componentWillMount(){
        console.log('will mount')
    }
    componentWillUnmount(){
    console.log('will unmount BoatListTwo')
    this.props.dispatch({
        type: 'inputBoat/resetInfo',
        payload: {
            dataBoatDate: null
        }
        })
    }
    columns = [
        { title: '预确报时间', width: 100, dataIndex: 'ETA', key: 'name'},
        { title: '中文船名', width: 100, dataIndex: 'vcVesCName', key: 'age'},
        { title: '英文船名', dataIndex: 'vcVesEName', key: '1', width: 100 },
        { title: '船代', dataIndex: 'chvesagentname', key: '2', width: 60 },
        { title: '船籍', dataIndex: 'chNationCode', key: '3', width: 60 },
        { title: '船类', dataIndex: 'vestypecode', key: '4', width: 60 },
        { title: '船长度', dataIndex: 'veslength', key: '5', width: 60 },
        { title: '预确报位置', dataIndex: 'charriveplacesign', key: '6', width: 100 },
        { title: '码头', dataIndex: 'DOCKNAME', key: '7', width: 60 },
        { title: '数据来源', dataIndex: 'CHUNITRESERVECN', key: '8', width: 100 },       
    ];
    queryList = (value) => {
        console.log('get table data now')
    }

    render(){
        const dataSource = [];
        //从models->inputBoat中获取数据
        if (this.props.dataBoatDate){
            console.log(this.props.dataBoatDate, "this.props.dataBoatDate")
            this.props.dataBoatDate.forEach((data, index) => {
                dataSource.push({
                    key: index,
                    ETA: data.ETA.substr(8,2)+'/'+data.ETA.substr(11,2)+data.ETA.substr(14,2),//need format XX/XXXX
                    vcVesCName: data.vcVesCName,
                    vcVesEName: data.vcVesEName,
                    chvesagentname: data.chvesagentname,
                    chNationCode: data.chNationCode,
                    vestypecode: data.vestypecode,
                    veslength: data.veslength,//need formata 2 point .XX
                    charriveplacesign: data.charriveplacesign,
                    DOCKNAME: data.DOCKNAME,
                    CHUNITRESERVECN: data.CHUNITRESERVECN
                  });
              })
        }
        return (
            <Table columns = {this.columns}
                        dataSource = {dataSource} 
                        scroll={{ x: 1000, y: 460 }}
                        size='small'
                        indentSize={8} 
            />
        )
    }


}