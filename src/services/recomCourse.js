import HTTP from 'utils/http'
import { API } from 'config/config'

const { RECOM_COURSE } = API
export default class CourseService extends HTTP {
  getRecomCourses() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: RECOM_COURSE.GET_COURSES_DATA,
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
