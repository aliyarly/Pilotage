/**
 * 搜索表单组件
 * @props {Object} className 最外容器class样式
 * @props {Array | required } searchItems 搜索内容
 * @props {function} search 搜索回调
 *        @params {Object} search 搜索回调的参数, 删除了为undefined的key
 * @props {function} reset 重置表单回调
 *
 * searchItems模板：
 * searchItems = [
    {
      label:表单label,
      key:字段,
      rules: form校验规则,
      tag: 表单控件DOM，默认<Input/>，
      spanLayouts： 每列占比, 默认{xs: 24, sm: 12, md: 8, lg: 8, },三等份
      formItemLayout： 表单label和wrapper占比，默认{ labelCol: { xs: { span: 24 }, sm: { span: 8 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, }, },
    }
  ]
 */
import React from 'react';
import PropTypes from 'prop-types';
import Intl from 'react-intl-universal';
import { Form, Button, Row, Col, Input, } from 'antd';
import { sliceArray, delUndefinedKey } from 'utils/utils';
import styles from './index.less';

const FormItem = Form.Item;
const spanLayouts = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 8,
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
@Form.create()
export default class SearchBar extends React.PureComponent {
  state = {

  }

  _resetForm = () => {
    this.props.form.resetFields()
    if ('reset' in this.props && typeof this.props.reset === 'function') {
      this.props.reset();
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const parsedValues = delUndefinedKey(values);
        if ('search' in this.props && typeof this.props.search === 'function') {
          this.props.search(parsedValues);
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { className, searchItems } = this.props;
    return (
      <Form onSubmit={this._handleSubmit} className={className}>
        {
          sliceArray(searchItems, 3).map((rowItem, key) =>
            <Row key={key}>
              {
                rowItem.map((item, key) =>
                  <Col {...spanLayouts} {...item.spanLayouts} key={key}>
                    <FormItem {...formItemLayout} {...item.formItemLayout} label={item.label}>
                      {getFieldDecorator(item.key, {
                        rules: item.rules || []
                      })(
                        item.tag ? item.tag : <Input autoComplete='off' placeholder={Intl.get('base.pleaseInput')} />
                      )}
                    </FormItem>
                  </Col>
                )
              }
              <Col {...spanLayouts} className={styles.btn}>
                <Button type="danger" onClick={this._resetForm}>{Intl.get('base.reset')}</Button>
                <Button type="primary" htmlType="submit" >{Intl.get('base.search')}</Button>
              </Col>
            </Row>
          )
        }
      </Form>
    )
  }
}
SearchBar.propTypes = {
  searchItems: PropTypes.array.isRequired,
  search: PropTypes.func,
  reset: PropTypes.func,
  className: PropTypes.string,
};
