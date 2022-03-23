import React, { Component } from 'react'

import './index.scss'
export default class TableBody extends Component {
  render() {
    const { CollectionData, updateCollectionStatus } = this.props

    return (
      <tbody>
        {CollectionData.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img
                  src={`http://tximg.codemongo.com/${item.posterImgKey}`}
                  alt={item.courseName}
                  className="poster-pic"
                />
              </td>
              <td>
                <a href={item.QQLink} target="_blank" rel="noreferrer" className="courseName">
                  {item.title}
                </a>
              </td>
              <td>{item.info}</td>

              <td>
                <button
                  className={['boot-btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
                  onClick={() => {
                    updateCollectionStatus(index, item.status)
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
