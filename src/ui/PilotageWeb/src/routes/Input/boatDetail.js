import { PureComponent } from 'react';
import { connect } from 'dva';
import TableWithSearchBar from 'components/TableWithSearchBar';
import { Table } from 'antd';
@connect(state=>({
    data: state.inputBoat.data,
}))
export default class BoatDetail extends PureComponent {

    columns = [
        { title: '中文船名', width: 50, dataIndex: 'vcVesCName', 
                            key: 'vcVesCName'},
        { title: '英文船名', width: 100, dataIndex: 'vcVesEName', 
                            key: 'vcVesEName'},
        { title: '船籍', dataIndex: 'chNationCode', 
            key: 'chNationCode', width: 50},
        { title: '船类', dataIndex: 'vestypecode', 
            key: 'vestypecode', width: 50 },
        { title: '船长', dataIndex: 'veslength', 
            key: 'veslength', width: 50 },
        { title: '码头', dataIndex: 'DOCKNAME', 
            key: 'DOCKNAME', width: 50 },
        {
            title: '操作',
            key: 'operation',
            width: 30,
            render: () => <a href="#">删除</a>,
        },    
    ];
    queryList = (value) => {
        console.log('get table data now')
    }
    render(){
        const dataSource = [];
        for (let i = 0; i < 10; i++) {
        dataSource.push({
            key: i,
            vcVesCName: '爱德华',
            vcVesEName: `Edrward ${i}`,
            chNationCode: '美国',
            vestypecode: 'A',
            veslength: '100',
            DOCKNAME: `London${i}`,
        });
        }
        return (
            <Table columns = {this.columns}
                dataSource = {dataSource} 
                scroll={{ x: 350, y: 480 }} 
                pagination={false}
                title={() => '进口计划'}
                size='small'
                indentSize={8} 
            />

        )
    }


}