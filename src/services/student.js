import HTTP from 'utils/http'
import { API } from 'config/config'

const { STUDENT } = API
export default class StudentService extends HTTP {
  getStudentsData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: STUDENT.GET_STUDENTS_DATA,
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
