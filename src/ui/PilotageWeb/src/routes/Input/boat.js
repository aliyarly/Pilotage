import { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import commonStyle from '../../index.less';
import LeftRightLayout from 'layouts/LeftRightLayout';
import BoatList from './boatList';
import BoatDetail from './boatDetail';

const Content = Layout.Content;

@connect(state=>({
    data: state.inputBoat.data,
}))
export default class InputBoat extends PureComponent {

    componentWillMount(){
        this.props.dispatch({
            type: 'inputBoat/queryData',
            payload: {
                queryParam: ''
            }
          })
    }

  render() {
    return (
      <PageHeaderLayout>
       <Content className={commonStyle.content}>
           <LeftRightLayout>
              <BoatList />
              <BoatDetail />
            </LeftRightLayout>
        </Content>
      </PageHeaderLayout>
    )
  }
}