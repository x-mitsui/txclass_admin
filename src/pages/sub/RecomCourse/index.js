import React, { Component } from 'react'
import ListTitle from 'components/common/ListTitle'
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import RecomCourseService from 'services/recomCourse'
import CommonService from 'services/common'

import { getDatas, confirmText } from 'utils/tools'
import { recom_course_table_title } from 'config/table_config'

const recomCourseService = new RecomCourseService()
const commonService = new CommonService()
const cfmText = confirmText('RECOM_COURSE')

export default class RecomCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '推荐课程管理',
      RecomCourseData: []
    }
  }
  componentDidMount() {
    this.getRecomCourseData()
  }
  onRefreshData() {
    this.getRecomCourseData()
  }
  render() {
    const { title, RecomCourseData } = this.state

    return (
      <div className="list-container">
        <ListTitle title={title} onRefreshData={this.onRefreshData.bind(this)} />
        <table className="list-table">
          <TableHead titles={recom_course_table_title} />
          <TableBody
            RecomCourseData={RecomCourseData}
            updateRecomCourseStatus={(index, status) => {
              this.updateRecomCourseStatus(index, status)
            }}
          />
        </table>
      </div>
    )
  }

  async getRecomCourseData() {
    try {
      const res = await recomCourseService.getRecomCourses()
      const { navigate } = this.props
      // console.log('aaaa:', res)
      const result = await getDatas(res, navigate)

      this.setState({
        RecomCourseData: result.data
      })
      // 使用data
    } catch (error) {
      console.log('getRecomCourseData error:', error)
    }
  }

  async updateRecomCourseStatus(index, status) {
    const cfm = window.confirm(cfmText(status))
    if (!cfm) {
      return
    }
    const copyCourseData = [...this.state.RecomCourseData]
    copyCourseData[index].status = 1 - copyCourseData[index].status

    this.setState(
      {
        courseData: copyCourseData
      },
      async () => {
        // 注意这里故意为之，异步回调的原因是setState是异步执行的，无法同步获取改变的值
        const result = await commonService.updateStatus({
          category: 'recom_course',
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
