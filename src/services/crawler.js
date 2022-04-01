import HTTP from 'utils/http'
import { API } from 'config/config'

const { CRAWLER } = API
export default class CrawlService extends HTTP {
  crawlAction(apiName) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: CRAWLER.CRAWL_ACTION + apiName,
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
