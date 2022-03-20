import React, { Component } from 'react'
import ListTitle from 'components/common/ListTitle'
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import CourseService from 'services/course'

import { getDatas } from 'utils/tools'
import { table_title } from 'config/table_config'

const courseService = new CourseService()
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
    const { title, courseData } = this.state
    return (
      <div className="list-container">
        <ListTitle title={title} onRefreshData={this.onRefreshData.bind(this)} />
        <table className="list-table">
          <TableHead titles={table_title} />
          <TableBody courseData={courseData} />
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
}
