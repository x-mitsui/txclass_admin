import React, { Component } from 'react'

import './index.scss'
export default class TableBody extends Component {
  render() {
    const { SliderData, updateSliderStatus } = this.props

    return (
      <tbody>
        {SliderData.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.cid}</td>
              <td>
                <a
                  href={item.href === 'javascript:;' ? '#!' : item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={`http://tximg.codemongo.com/${item.imgKey}`} alt={item.courseName} />
                </a>
              </td>
              <td>
                <a
                  href={item.href === 'javascript:;' ? '#!' : item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="courseName"
                >
                  {item.title}
                </a>
              </td>

              <td>
                <button
                  className={['boot-btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
                  onClick={() => {
                    updateSliderStatus(index, item.status)
                  }}
                >
                  {item.status ? '下架' : '上架'}
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}
