import React, { Component } from 'react'
import ListTitle from 'components/common/ListTitle'
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import CourseService from 'services/course'
import CommonService from 'services/common'

import { getDatas } from 'utils/tools'
import { course_table_title } from 'config/table_config'

const courseService = new CourseService()
const commonService = new CommonService()
export default class Course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '课程管理',
      courseData: [],
      fieldsData: []
    }
  }

  render() {
    const { title, courseData, fieldsData } = this.state
    return (
      <div className="list-container">
        <ListTitle title={title} onRefreshData={this.onRefreshData.bind(this)} />
        <table className="list-table">
          <TableHead titles={course_table_title} />
          <TableBody
            courseData={courseData}
            updateCourseStatus={(index, status) => {
              this.updateCourseStatus(index, status)
            }}
            fieldsData={fieldsData}
            updateCourseField={this.updateCourseField.bind(this)}
          />
        </table>
      </div>
    )
  }
  componentDidMount() {
    this.getCourseData()
  }
  onRefreshData() {
    this.getCourseData()
  }
  async getCourseData() {
    try {
      const res = await courseService.getCourses()
      const { navigate } = this.props
      // console.log('aaaa:', res)
      const result = await getDatas(res, navigate)

      this.setState({
        courseData: result.courseData,
        fieldsData: result.fieldData
      })
      // 使用data
    } catch (error) {
      console.log('getCourseData error:', error)
    }
  }
  async updateCourseField(courseId, fieldId) {
    const newCourseData = [...this.state.courseData]

    newCourseData.some((item) => {
      if (item.cid === courseId) {
        item.field = fieldId
        return true
      }
      return false
    })

    this.setState({
      courseData: newCourseData
    })
    // 后台设置
    const result = await courseService.updateCourseField(courseId, fieldId)

    const { err_code } = result
    if (err_code === 0) {
      console.log('修改课程分类成功')
    }
  }

  async updateCourseStatus(index, status) {
    const copyCourseData = [...this.state.courseData]
    copyCourseData[index].status = 1 - copyCourseData[index].status

    this.setState(
      {
        courseData: copyCourseData
      },
      async () => {
        // 注意这里故意为之，异步回调的原因是setState是异步执行的，无法同步获取改变的值
        const result = await commonService.updateStatus({
          category: 'course',
          id: this.state.courseData[index].cid,
          status: this.state.courseData[index].status
        })
        const { err_code } = result
        if (err_code === 0) {
          console.log('修改课程上下架状态成功')
        }
      }
    )
  }
}
