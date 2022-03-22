import React, { Component } from 'react'

import './index.scss'
export default class TableBody extends Component {
  render() {
    const { TeacherData, updateTeacherStatus, updateTeacherStar } = this.props

    return (
      <tbody>
        {TeacherData.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>
                <a href={item.href} target="_blank" rel="noreferrer" className="courseName">
                  <img
                    src={`http://tximg.codemongo.com/${item.profilePicKey}`}
                    alt={item.name}
                    className="teacher-pic"
                  />
                </a>
              </td>
              <td>
                <a href={item.href} target="_blank" rel="noreferrer" className="courseName">
                  {item.name}
                </a>
              </td>
              <td>{item.courseNum}</td>
              <td>{item.studentsNum}</td>
              <td className="intro">{item.introduction}</td>

              <td>
                <button
                  className={['boot-btn', item.isStar ? 'btn-danger' : 'btn-success'].join(' ')}
                  onClick={() => {
                    updateTeacherStar(index, item.isStar)
                  }}
                >
                  {item.isStar ? '取消明星' : '选为明星'}
                </button>
              </td>

              <td>
                <button
                  className={['boot-btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
                  onClick={() => {
                    updateTeacherStatus(index, item.status)
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
