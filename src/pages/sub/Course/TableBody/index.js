import React, { Component } from 'react'
import TableSelect from 'components/common/TableSelect'
import './index.scss'
export default class TableBody extends Component {
  render() {
    const { courseData, fieldsData, updateCourseField } = this.props

    return (
      <tbody>
        {courseData.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.cid}</td>
              <td>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <img src={`http://tximg.codemongo.com/${item.posterKey}`} alt={item.courseName} />
                </a>
              </td>
              <td>
                <a href={item.href} target="_blank" rel="noreferrer" className="courseName">
                  {item.courseName}
                </a>
              </td>
              <td>
                <span className={item.price === '0' ? 'free' : 'price'}>
                  {item.price == '0' ? '免费' : `￥${item.price}`}
                </span>
              </td>
              <td>{item.studentCount}</td>
              <td>
                <TableSelect
                  cid={item.cid}
                  fieldsData={fieldsData}
                  field={item.field}
                  updateCourseField={updateCourseField}
                  defaultValue={
                    item.field === 0
                      ? '无分类'
                      : fieldsData.filter((fitem) => fitem.id === item.field)[0].title
                  }
                />
              </td>
              <td>
                <button
                  className={['boot-btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
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
