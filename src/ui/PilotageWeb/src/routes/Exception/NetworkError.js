import Exception from 'ant-design-pro/lib/Exception';
import Intl from 'react-intl-universal';
import { Button } from 'antd';

export default ({ history }) => (
  <Exception 
  title="Network Error" 
  desc={Intl.get('base.networkErr')} 
  style={{ minHeight: 500, height: '80%' }} 
  actions={
    <Button type="primary" onClick={() => history.go(-1)}>
      {Intl.get('base.goBack')}
    </Button>
  }  
  />
);
