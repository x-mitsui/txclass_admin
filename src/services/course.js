import HTTP from 'utils/http'
import { API } from 'config/config'

const COURSE = API.COURSE
export default class CourseService extends HTTP {
  getCourses() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: COURSE.GET_COURSES_DATA,
        success: (data) => {
          resolve(data)
        },
        error(err) {
          reject(err)
        }
      })
    })
  }
  updateCourseField(cid, field) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: COURSE.UPDATE_COURSE_FIELD,
        params: {
          cid,
          field
        },
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
