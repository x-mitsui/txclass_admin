import HTTP from 'utils/http'
import { API } from 'config/config'

const RECOM_COURSE = API.RECOM_COURSE
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

  updateRecomCourseStatus({ cid, status }) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: RECOM_COURSE.UPDATE_COURSE_STATUS,
        data: {
          cid,
          status
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
