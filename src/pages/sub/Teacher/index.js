import React, { Component } from 'react'
import ListTitle from 'components/common/ListTitle'
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import TeacherService from 'services/teacher'
import CommonService from 'services/common'

import { getDatas } from 'utils/tools'
import { teacher_table_title } from 'config/table_config'

const teacherService = new TeacherService()
const commonService = new CommonService()

export default class Teacher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '老师管理',
      TeacherData: []
    }
  }
  componentDidMount() {
    this.getTeachersData()
  }
  onRefreshData() {
    this.getTeachersData()
  }
  render() {
    const { title, TeacherData } = this.state

    return (
      <div className="list-container">
        <ListTitle title={title} onRefreshData={this.onRefreshData.bind(this)} />
        <table className="list-table">
          <TableHead titles={teacher_table_title} />
          <TableBody
            TeacherData={TeacherData}
            updateTeacherStatus={(index, status) => {
              this.updateTeacherStatus(index, status)
            }}
            updateTeacherStar={(index, isStar) => {
              this.updateTeacherStar(index, isStar)
            }}
          />
        </table>
      </div>
    )
  }

  async getTeachersData() {
    try {
      const res = await teacherService.getTeachersData()
      const { navigate } = this.props
      console.log('aaaa:', res)
      const result = await getDatas(res, navigate)

      this.setState({
        TeacherData: result.data
      })
      // 使用data
    } catch (error) {
      console.log('getTeachersData error:', error)
    }
  }

  async updateTeacherStatus(index, status) {
    const copyTeacherData = [...this.state.TeacherData]
    copyTeacherData[index].status = 1 - copyTeacherData[index].status

    this.setState(
      {
        TeacherData: copyTeacherData
      },
      async () => {
        // 注意这里故意为之，异步回调的原因是setState是异步执行的，无法同步获取改变的值
        const result = await commonService.updateStatus({
          category: 'teacher',
          id: this.state.TeacherData[index].id,
          status: this.state.TeacherData[index].status
        })
        const { err_code } = result
        if (err_code === 0) {
          console.log('修改老师上下架状态成功')
        } else {
          console.log('修改老师上下架状态失败')
        }
      }
    )
  }

  async updateTeacherStar(index, isStar) {
    const copyTeacherData = [...this.state.TeacherData]
    copyTeacherData[index].isStar = !copyTeacherData[index].isStar

    this.setState(
      {
        TeacherData: copyTeacherData
      },
      async () => {
        // 注意这里故意为之，异步回调的原因是setState是异步执行的，无法同步获取改变的值
        const result = await teacherService.updateTeacherStar({
          id: this.state.TeacherData[index].id,
          isStar: this.state.TeacherData[index].isStar
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
