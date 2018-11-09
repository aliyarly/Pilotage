/**
 * 传统的列表带搜索组件
 * @feature Table列表自适应高度，前提是组建的父标签必须具有高度
 * @props {function｜isRequired} queryList 搜索列表方法，必须是一个返回Promise对象的方法
 * @props {array｜isRequired} searchItems SearchBar搜索项目
 * @props {array｜isRequired} columns Table组件的columns
 * @props {array｜isRequired} dataSource Table组件的dataSource
 * @props {number｜isRequired} total Pagination组件的total
 * @props {number｜isRequired} pageSize Pagination组件的pageSize
 * @props {boolean} fetching Table组件的loading
 * @props {string} searchBarClass SearchBar组件的class
 * @props {function} onPageChange Pagination组件的onChange（页码改变回调）
 * @props {function} getReloadAction 获取刷新当前列表函数，供外部调用
 * @props {boolean} ifAutoHeight 是否需要自适应高度，默认为是
 * @props {Object} pagination 额外定义分页规则，有默认规则
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import SearchBar from 'components/SearchBar';
import styles from './index.less'

export default class TableWithSearchBar extends PureComponent {
  state = {
    currentPage: 1,
    querys: {},
  }

  componentWillMount() {
    this.props.queryList({ page: this.state.currentPage, pageSize: this.props.pageSize, });
  }

  componentDidMount() {
    if ('getReloadAction' in this.props) {
      this.props.getReloadAction(this._reload)
    }
    if (this.props.ifAutoHeight) {
      let wrapHeight = this.refs.wrap.offsetHeight;
      let tableTopHeight = 0;
      try{
        tableTopHeight = this.refs.tableHeader.offsetHeight;
      } catch(err){
        console.log(err)
      } 
      //120为table标题的高度
      let maxTableHeight = wrapHeight - tableTopHeight - 120;
      this.setState({ tableHeight: maxTableHeight })
    }
  }

  _reload = () => {
    return this.props.queryList({
      ...this.state.querys,
      page: this.state.currentPage,
      pageSize: this.props.pageSize,
    });
  }

  _search = (values) => {
    this.setState({ querys: values, currentPage: 1 })
    this.props.queryList({ ...values, page: 1, pageSize: this.props.pageSize, });
  }

  _reset = () => {
    this.setState({ querys: {}, currentPage: 1 })
    this.props.queryList({ page: 1, pageSize: this.props.pageSize, });
  }

  async _pageChange(page, pageSize) {
    const { data } = await this.props.queryList({ page, pageSize, ...this.state.querys })
    if (data) {
      this.setState({ currentPage: page })
      if ('onPageChange' in this.props) {
        this.props.onPageChange(page, pageSize);
      }
    }
  }
  _rowClick = (record) => {
    return {
      onClick: () => this.props.rowClick(record)
    }
  }

  
  render() {
    const { searchItems, total, pageSize, fetching, children, 
      columns, dataSource, searchBarClass, pagination , rowClick,
      rowMouse, noSearch} = this.props;
    const { currentPage, } = this.state;
    let paginationConfig = {}
    if(pagination && Object.keys(pagination).length === 0){
      paginationConfig = false
    } else{
      paginationConfig = {
      showQuickJumper: true,
      size: 'small',
      ...pagination,
      current: currentPage,
      total,
      pageSize,
      onChange: (...arg) => this._pageChange(...arg),
    }
  }
    const tableProps = this.state.tableHeight ? { scroll: { y: this.state.tableHeight } } : {}
    if(noSearch){
      return ( 
        <div className={styles.wrap} ref="wrap">
        <Table className={styles.table}
          ref={node => this.tableNode = node}
          loading={fetching}
          pagination={paginationConfig}
          dataSource={dataSource}
          columns={columns}
          {...tableProps}
          rowKey={record => record.id} 
          onRow={this._rowClick}/>
          </div>
      ) 
    }else{
    return (
      <div className={styles.wrap} ref="wrap">
        <div ref="tableHeader">
          <SearchBar className={searchBarClass} searchItems={searchItems} search={this._search} reset={this._reset} />
          {children}
        </div>
        <Table className={styles.table}
          ref={node => this.tableNode = node}
          loading={fetching}
          pagination={paginationConfig}
          dataSource={dataSource}
          columns={columns}
          {...tableProps}
          rowKey={record => record.id} 
          onRow={this._rowClick}/>
      </div>
    )
  }
  }
}

TableWithSearchBar.propTypes = {
  queryList: PropTypes.func.isRequired,
  searchItems: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  fetching: PropTypes.bool,
  searchBarClass: PropTypes.string,
  onPageChange: PropTypes.func,
  getReloadAction: PropTypes.func,
  ifAutoHeight: PropTypes.bool,
  pagination: PropTypes.object,
  rowClick: PropTypes.func,
  noSearch: PropTypes.bool 
}
