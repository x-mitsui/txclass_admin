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
              <td>{item.cid}</td>
              <td>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <img
                    src={`http://tximg.codemongo.com/${item.posterImgKey}`}
                    alt={item.courseName}
                    className="poster-pic"
                  />
                </a>
              </td>
              <td>
                <a href={item.href} target="_blank" rel="noreferrer" className="courseName">
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
