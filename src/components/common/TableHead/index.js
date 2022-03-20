import React, { Component } from 'react'

import './index.scss'

export default class TableTh extends Component {
  render() {
    const { titles } = this.props
    return (
      <thead>
        <tr className="table-tr">
          {titles.map((title, index) => {
            return (
              <th key={index} className="table-th">
                {title}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
}
