import React, { Component } from 'react'

import './index.scss'

export default class ListTitle extends Component {
  render() {
    const { title, onRefreshData } = this.props
    return (
      <div className="title-wraper">
        <h2 className="name">{title}</h2>
        <button className="refresh-btn" onClick={onRefreshData}>
          <i className="iconfont icon-refresh"></i>
          <span>刷新数据</span>
        </button>
      </div>
    )
  }
}
