import React, { Component } from 'react'

import './index.scss'

export default class TableSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectShow: false,
      selectField: 0,
      selectTitle: this.props.defaultValue
    }
  }
  onClickOptionItem(state) {
    this.setState({
      selectShow: state === 'blur' ? false : !this.state.selectShow
    })
  }
  onListOptionClick(cid, id, title) {
    this.onClickOptionItem()

    // 重复点击不做操作
    if (id === this.state.selectField) {
      return
    }

    this.setState({
      selectField: id,
      selectTitle: title
    })

    const { updateCourseField } = this.props
    updateCourseField(cid, id)
  }
  render() {
    const { fieldsData, cid, defaultValue } = this.props

    const { selectShow, selectTitle } = this.state
    return (
      <div className="table-select-container">
        <div
          className="value-show"
          tabIndex="0"
          outline="0"
          onClick={this.onClickOptionItem.bind(this)}
          onBlur={this.onClickOptionItem.bind(this, 'blur')}
        >
          <span className="field-value">
            {/* {selectField === 0
              ? defaultValue
              : fieldsData.filter((item) => item.id === selectField)[0].title} */}
            {selectTitle}
          </span>
          <i className="iconfont icon-arrow-down"></i>
          <ul className={['option-list', selectShow ? 'show' : ''].join(' ')}>
            <li
              className="options-item"
              onClick={() => {
                this.onListOptionClick(cid, 0, defaultValue)
              }}
            >
              {defaultValue}
            </li>
            {fieldsData.map((item, index) => {
              return (
                <li
                  className="options-item"
                  key={item.id}
                  onClick={() => {
                    this.onListOptionClick(cid, item.id, item.title)
                  }}
                >
                  {item.title}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
