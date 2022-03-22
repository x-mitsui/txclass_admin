import React, { Component } from 'react'

// import './index.scss'
export default class TableBody extends Component {
  render() {
    const { StudentData, updateStudentStatus } = this.props

    return (
      <tbody>
        {StudentData.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img
                  src={`http://tximg.codemongo.com/${item.studentImgKey}`}
                  alt={item.courseName}
                  className="teacher-pic"
                />
              </td>
              <td>{item.studentName}</td>
              <td className="intro">{item.intro}</td>
              <td>
                <a href={item.courseLink} target="_blank" rel="noreferrer" className="courseName">
                  {item.courseName}
                </a>
              </td>

              <td>
                <button
                  className={['boot-btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
                  onClick={() => {
                    updateStudentStatus(index, item.status)
                  }}
                >
                  {item.status ? '下线' : '上线'}
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}
