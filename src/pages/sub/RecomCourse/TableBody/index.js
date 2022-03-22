import React, { Component } from 'react'

import './index.scss'
export default class TableBody extends Component {
  render() {
    const { RecomCourseData, updateRecomCourseStatus } = this.props

    return (
      <tbody>
        {RecomCourseData.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.cid}</td>
              <td>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <img src={`http://tximg.codemongo.com/${item.imgKey}`} alt={item.courseName} />
                </a>
              </td>
              <td>
                <a href={item.href} target="_blank" rel="noreferrer" className="courseName">
                  {item.title}
                </a>
              </td>
              <td>{item.teacherName}</td>
              <td>
                <span className={item.price === '0' ? 'free' : 'price'}>
                  {item.price === 0 ? '免费' : `￥${item.price}`}
                </span>
              </td>
              <td>{item.buyCount}</td>

              <td>
                <button
                  className={['boot-btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
                  onClick={() => {
                    updateRecomCourseStatus(index, item.status)
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
