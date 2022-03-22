import HTTP from 'utils/http'
import { API } from 'config/config'

const { SLIDER } = API
export default class SliderService extends HTTP {
  getSlidersData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: SLIDER.GET_SLIDERS_DATA,
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
