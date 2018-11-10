import { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import commonStyle from '../../index.less';
import LeftRightLayout from 'layouts/LeftRightLayout';
import BoatList from './boatList';
import BoatDetail from './boatDetail';

const Content = Layout.Content;

export default class InputBoat extends PureComponent {
  //第一个页面的入口
  render() {
    return (
      <PageHeaderLayout 
      content='在左侧选择,点击添加进行添加;右侧选择后,点击删除进行删除'
      >
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