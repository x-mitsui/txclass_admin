import React, { Component } from 'react'
import ListTitle from 'components/common/ListTitle'
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import StudentService from 'services/student'
import CommonService from 'services/common'

import { getDatas } from 'utils/tools'
import { student_table_title } from 'config/table_config'

const studentService = new StudentService()
const commonService = new CommonService()

export default class Student extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '学生管理',
      StudentData: []
    }
  }
  componentDidMount() {
    this.getStudentsData()
  }
  onRefreshData() {
    this.getStudentsData()
  }
  render() {
    const { title, StudentData } = this.state

    return (
      <div className="list-container">
        <ListTitle title={title} onRefreshData={this.onRefreshData.bind(this)} />
        <table className="list-table">
          <TableHead titles={student_table_title} />
          <TableBody
            StudentData={StudentData}
            updateStudentStatus={(index, status) => {
              this.updateStudentStatus(index, status)
            }}
            updateStudentStar={(index, isStar) => {
              this.updateStudentStar(index, isStar)
            }}
          />
        </table>
      </div>
    )
  }

  async getStudentsData() {
    try {
      const res = await studentService.getStudentsData()
      const { navigate } = this.props
      console.log('aaaa:', res)
      const result = await getDatas(res, navigate)

      this.setState({
        StudentData: result.data
      })
      // 使用data
    } catch (error) {
      console.log('getStudentsData error:', error)
    }
  }

  async updateStudentStatus(index, status) {
    const copyStudentData = [...this.state.StudentData]
    copyStudentData[index].status = 1 - copyStudentData[index].status

    this.setState(
      {
        StudentData: copyStudentData
      },
      async () => {
        // 注意这里故意为之，异步回调的原因是setState是异步执行的，无法同步获取改变的值
        const result = await commonService.updateStatus({
          category: 'student',
          id: this.state.StudentData[index].sid,
          status: this.state.StudentData[index].status
        })
        const { err_code } = result
        if (err_code === 0) {
          console.log('修改学生上下架状态成功')
        } else {
          console.log('修改学生上下架状态失败')
        }
      }
    )
  }

  async updateStudentStar(index, isStar) {
    const copyStudentData = [...this.state.StudentData]
    copyStudentData[index].isStar = !copyStudentData[index].isStar

    this.setState(
      {
        StudentData: copyStudentData
      },
      async () => {
        // 注意这里故意为之，异步回调的原因是setState是异步执行的，无法同步获取改变的值
        const result = await studentService.updateStudentStar({
          id: this.state.StudentData[index].id,
          isStar: this.state.StudentData[index].isStar
        })
        const { err_code } = result
        if (err_code === 0) {
          console.log('修改老师是否为明星成功')
        } else {
          console.log('修改老师是否为明星失败')
        }
      }
    )
  }
}
