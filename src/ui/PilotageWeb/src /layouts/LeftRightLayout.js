import { PureComponent } from 'react';
import { Row, Col } from 'antd';
import styles from './LeftRightLayout.less';



export default class LeftRightLayout extends PureComponent {

    render(){
         let children = this.props.children
        console.log(children, 'coponent children')
        return (
            <Row>
                <Col span={12}>
                    {children ? children[0] : null}
                </Col>
                <Col span={12}>
                    {children ? children[1] : null}           
                </Col>
          </Row>
        )
    }


}
