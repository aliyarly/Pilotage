import { PureComponent } from 'react';
import { Row, Col ,Layout } from 'antd';
import styles from './LeftRightLayout.less';

const { Sider, Content } = Layout;


export default class LeftRightLayout extends PureComponent {

    render(){
         let children = this.props.children
         let style = {
                        'width': '50%',
                        'background': 'whitesmoke',
                        'flex': '1 1 100%',
                        'max-width': '100%',
                        'margin': '0 0 0 8px'
                    }
        console.log(children, 'coponent children')
        return (
            <div>
            <Layout style={{'flex-direction': 'row'}}>
                <div className='ant-layout-sider' style={style}>
                    <div className='ant-layout-sider-children'>
                         {children ? children[0] : null}
                    </div>
                </div>
                <div className='ant-layout-sider' style={style}>
                    <div className='ant-layout-sider-children'>
                        {children ? children[1] : null}
                    </div>
                </div>
            </Layout>
            </div>
        )
    }


}
