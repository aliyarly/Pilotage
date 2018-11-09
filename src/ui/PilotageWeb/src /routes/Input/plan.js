import { PureComponent } from 'react';
import { Layout } from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import commonStyle from '../../index.less';
import PlanList from './planList'

const Content = Layout.Content;


export default class Plan extends PureComponent {

  render() {
    return (
      <PageHeaderLayout>
        <Content className={commonStyle.content}>
          <PlanList/>
        </Content>
      </PageHeaderLayout>
    )
  }
}