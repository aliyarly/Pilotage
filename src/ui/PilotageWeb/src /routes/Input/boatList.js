import { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs,  Card,Button} from 'antd';
import BoatListOne from './boatListOne';
import BoatListTwo from './boatListTwo';
import BoatListThree from './boatListThree';
import BoatListFour from './boatListFour';
const TabPane = Tabs.TabPane;

@connect(state=>({
    // dataBoatDate: state.inputBoat.dataBoatDate,
}))
export default class BoatList extends PureComponent {

    componentWillMount(){
        //初始化获取预选船列表
        this.props.dispatch({
            type: 'inputBoat/queryLeftListData',
            payload: {
                queryParam: 'prechoice'
            }
          })
    }
    callback = (e) => {
        console.log('click tab ', e)
        // ask for data for diff type prechoice, boatDate, groupValid, groupUnvalid
        this.props.dispatch({
            type: 'inputBoat/queryLeftListData',
            payload: {
                queryParam: e
            }
          })
    }
    _addBoat = (e) => {
        console.log('click add boat ', e)
    }
    render(){
        // TODO 自行补充BoatListThree BoatListFour, 53,56替换,实现请仿造BoatListOne
        return (
            <Card bordered={false} 
              extra={
              <div>
                <Button type="primary" onClick={this._addBoat}>添加</Button>
              </div>}
               >  
                <Tabs  onChange={this.callback} defaultActiveKey="prechoice">
                    <TabPane tab="预选船" key="prechoice">
                        <BoatListOne />
                    </TabPane>
                    <TabPane tab="船期" key="boatDate">
                        <BoatListTwo />
                    </TabPane>
                    <TabPane tab="集团（识别）" key="groupValid">
                        <BoatListThree />
                    </TabPane>
                    <TabPane tab="集团（未识别）" key="groupUnvalid">
                        <BoatListFour />
                    </TabPane>
                </Tabs>
            </Card>
        )
    }


}