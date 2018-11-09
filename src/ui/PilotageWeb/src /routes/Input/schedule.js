import { PureComponent } from 'react';
import { Layout } from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import commonStyle from '../../index.less';
import LeftRightLayout from 'layouts/LeftRightLayout';


const Content = Layout.Content;


export default class Schedule extends PureComponent {

  render() {
    return (
      <PageHeaderLayout>
        <Content className={commonStyle.content}>
            <LeftRightLayout>
              <h2>ZUO</h2>
              <h2>YOU</h2>
            </LeftRightLayout>
        </Content>
      </PageHeaderLayout>
    )
  }
}