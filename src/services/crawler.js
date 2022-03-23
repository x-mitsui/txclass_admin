import HTTP from 'utils/http'
import { API } from 'config/config'

const { CRAWLER } = API
export default class CrawlService extends HTTP {
  crawlAction(api) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: CRAWLER.CRAWL_ACTION,
        data: { api },
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
