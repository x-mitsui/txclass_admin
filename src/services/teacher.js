import HTTP from 'utils/http'
import { API } from 'config/config'

const { TEACHER } = API
export default class TeacherService extends HTTP {
  getTeachersData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: TEACHER.GET_TEACHERS_DATA,
        success: (data) => {
          resolve(data)
        },
        error(err) {
          reject(err)
        }
      })
    })
  }

  updateTeacherStar(data) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: TEACHER.UPDATE_TEACHER_STAR,
        data,
        success: (data) => {
          resolve(data)
        },
        error(err) {
          reject(err)
        }
      })
    })
  }
}
