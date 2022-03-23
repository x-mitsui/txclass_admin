import React, { Component } from 'react'
import ListTitle from 'components/common/ListTitle'
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import SliderService from 'services/slider'
import CommonService from 'services/common'

import { getDatas, confirmText } from 'utils/tools'
import { slider_table_title } from 'config/table_config'

const sliderService = new SliderService()
const commonService = new CommonService()
const cfmText = confirmText('SLIDER')
export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '轮播图管理',
      SliderData: []
    }
  }
  componentDidMount() {
    this.getSlidersData()
  }
  onRefreshData() {
    this.getSlidersData()
  }
  render() {
    const { title, SliderData } = this.state

    return (
      <div className="list-container">
        <ListTitle title={title} onRefreshData={this.onRefreshData.bind(this)} />
        <table className="list-table">
          <TableHead titles={slider_table_title} />
          <TableBody
            SliderData={SliderData}
            updateSliderStatus={(index, status) => {
              this.updateSliderStatus(index, status)
            }}
          />
        </table>
      </div>
    )
  }

  async getSlidersData() {
    try {
      const res = await sliderService.getSlidersData()
      const { navigate } = this.props
      console.log('aaaa:', res)
      const result = await getDatas(res, navigate)

      this.setState({
        SliderData: result.data
      })
      // 使用data
    } catch (error) {
      console.log('getSlidersData error:', error)
    }
  }

  async updateSliderStatus(index, status) {
    const cfm = window.confirm(cfmText(status))
    if (!cfm) {
      return
    }
    const copyCourseData = [...this.state.SliderData]
    copyCourseData[index].status = 1 - copyCourseData[index].status

    this.setState(
      {
        courseData: copyCourseData
      },
      async () => {
        // 注意这里故意为之，异步回调的原因是setState是异步执行的，无法同步获取改变的值
        const result = await commonService.updateStatus({
          category: 'slider',
          id: this.state.courseData[index].cid,
          status: this.state.courseData[index].status
        })
        const { err_code } = result
        if (err_code === 0) {
          console.log('修改推荐课程上下架状态成功')
        }
      }
    )
  }
}
