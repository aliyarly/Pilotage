import { PureComponent } from 'react';
import { connect } from 'dva';
import TableWithSearchBar from 'components/TableWithSearchBar';
import { Table , Tabs} from 'antd';
import BoatListOne from './boatListOne';
import BoatListTwo from './boatListTwo';
const TabPane = Tabs.TabPane;


@connect(state=>({
    data: state.inputBoat.data,
}))
export default class BoatList extends PureComponent {

    render(){
        return (
            <div className="card-container">
                <Tabs type="card" tabBarStyle={{'margin': '0 0 0 0'}}>
                    <TabPane tab="预选船" key="1">
                        <BoatListOne />
                    </TabPane>
                    <TabPane tab="船期" key="2">
                        <BoatListTwo />
                    </TabPane>
                    <TabPane tab="集团（识别）" key="3">
                        <BoatListOne />
                    </TabPane>
                    <TabPane tab="集团（未识别）" key="4">
                        <BoatListOne />
                    </TabPane>
                </Tabs>
            </div>
           

        )
    }


}