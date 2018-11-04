import { PureComponent } from 'react';
import { connect } from 'dva';
import TableWithSearchBar from 'components/TableWithSearchBar';
import { Table , Tabs} from 'antd';
const TabPane = Tabs.TabPane;

@connect(state=>({
    data: state.inputBoat.data,
}))
export default class BoatListOne extends PureComponent {

    columns = [
        {
            title: '操作',
            key: 'operation',
            width: 50,
            render: () => <a href="#">添加</a>,
        },
        { title: '预确报时间', width: 100, dataIndex: 'ETA', key: 'ETA'},
        { title: '中文船名', width: 100, dataIndex: 'vcVesCName', key: 'vcVesCName'},
        { title: '英文船名', dataIndex: 'vcVesEName', key: '1', width: 100 },
        { title: '船代', dataIndex: 'chvesagentname', key: '2', width: 60 },
        { title: '船籍', dataIndex: 'chNationCode', key: '3', width: 60 },
        { title: '船类', dataIndex: 'vestypecode', key: '4', width: 60 },
        { title: '船长度', dataIndex: 'veslength', key: '5', width: 60 },
        { title: '预确报位置', dataIndex: 'charriveplacesign', key: '6', width: 100 },
        { title: '码头', dataIndex: 'DOCKNAME', key: '7', width: 60 },
        
    ];
    queryList = (value) => {
        console.log('get table data now')
    }
    render(){
        const dataSource = [];

        // dataSouce will get from server
        for (let i = 0; i < 10; i++) {
        dataSource.push({
            key: i,
            ETA: '00:00',
            vcVesCName: '爱德华',
            vcVesEName: `Edrward ${i}`,
            chvesagentname: '测试数据',
            chNationCode: '美国',
            vestypecode: 'A',
            veslength: '100',
            charriveplacesign: '测试',
            DOCKNAME: `London${i}`,
        });
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