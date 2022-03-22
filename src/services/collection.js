import HTTP from 'utils/http'
import { API } from 'config/config'

const { COLLECTION } = API
export default class CollectionService extends HTTP {
  getCollections() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: COLLECTION.GET_COLLECTION_DATA,
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
