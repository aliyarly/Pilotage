import Exception from 'ant-design-pro/lib/Exception';
import { Button } from 'antd';
import Intl from 'react-intl-universal';

export default ({ history }) => (
  <Exception
    type="404" 
    style={{ minHeight: 500, height: '80%' }} 
    actions={
      <Button type="primary" onClick={() => history.go(-1)}>
        {Intl.get('base.goBack')}
      </Button>
    } 
  />
);
