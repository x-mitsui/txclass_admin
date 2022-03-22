import React, { Component } from 'react'
import ListTitle from 'components/common/ListTitle'
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import CollectionService from 'services/collection'
import CommonService from 'services/common'

import { getDatas } from 'utils/tools'
import { collection_table_title } from 'config/table_config'

const collectionService = new CollectionService()
const commonService = new CommonService()

export default class Collection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '课程集合管理',
      CollectionData: []
    }
  }
  componentDidMount() {
    this.getCollectionData()
  }
  onRefreshData() {
    this.getCollectionData()
  }
  render() {
    const { title, CollectionData } = this.state

    return (
      <div className="list-container">
        <ListTitle title={title} onRefreshData={this.onRefreshData.bind(this)} />
        <table className="list-table">
          <TableHead titles={collection_table_title} />
          <TableBody
            CollectionData={CollectionData}
            updateCollectionStatus={(index, status) => {
              this.updateCollectionStatus(index, status)
            }}
          />
        </table>
      </div>
    )
  }

  async getCollectionData() {
    try {
      const res = await collectionService.getCollections()
      const { navigate } = this.props
      // console.log('aaaa:', res)
      const result = await getDatas(res, navigate)

      this.setState({
        CollectionData: result.data
      })
      // 使用data
    } catch (error) {
      console.log('getCollectionData error:', error)
    }
  }

  async updateCollectionStatus(index, status) {
    const copyCollectionData = [...this.state.CollectionData]
    copyCollectionData[index].status = 1 - copyCollectionData[index].status

    this.setState(
      {
        CollectionData: copyCollectionData
      },
      async () => {
        // 注意这里故意为之，异步回调的原因是setState是异步执行的，无法同步获取改变的值
        const result = await commonService.updateStatus({
          category: 'collection',
          id: this.state.CollectionData[index].cid,
          status: this.state.CollectionData[index].status
        })
        console.log('typeof status:', typeof status)
        console.log('result:', result)
        const { err_code } = result
        if (err_code === 0) {
          console.log('修改课程集合上下架状态成功')
        } else {
          console.log('修改课程集合上下架状态失败')
        }
      }
    )
  }
}
