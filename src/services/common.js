import HTTP from 'utils/http'
import { API } from 'config/config'

const { COMMON } = API
export default class CommonService extends HTTP {
  updateStatus(data) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: COMMON.UPDATE_ROW_STATUS,
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
