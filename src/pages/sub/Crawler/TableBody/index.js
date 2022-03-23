import React, { Component } from 'react'

import './index.scss'
export default class TableBody extends Component {
  render() {
    const { CrawlerData, getCrawlerData } = this.props
    console.log('typeof CrawlerData:', typeof CrawlerData)
    return (
      <tbody>
        {CrawlerData.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <span className="tips">操作注意</span>：{item.description}
              </td>
              <td>
                <button
                  className="boot-btn btn-info"
                  disabled={item.loading ? 'disabled' : ''}
                  onClick={() => {
                    getCrawlerData(index)
                  }}
                >
                  {item.loading ? '抓取中' : item.title}
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}
