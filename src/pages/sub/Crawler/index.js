import React, { Component } from 'react'
import ListTitle from 'components/common/ListTitle'
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import CrawlerService from 'services/crawler'
import CommonService from 'services/common'

import { getDatas } from 'utils/tools'
import { crawler_table_title } from 'config/table_config'
import crawler_config from 'config/crawler_config'

const crawlerService = new CrawlerService()
const commonService = new CommonService()

export default class Crawler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '数据爬虫管理',
      CrawlerData: crawler_config
    }
  }
  componentDidMount() {
    // this.getCrawlerData()
  }

  render() {
    const { title, CrawlerData } = this.state

    return (
      <div className="list-container">
        <ListTitle title={title} isFreshShow={false} />
        <table className="list-table">
          <TableHead titles={crawler_table_title} />
          <TableBody
            CrawlerData={CrawlerData}
            getCrawlerData={(index) => {
              this.getCrawlerData(index)
            }}
          />
        </table>
      </div>
    )
  }

  async getCrawlerData(index) {
    try {
      const { CrawlerData } = this.state
      console.log('CrawlerData:', CrawlerData)
      const copyCrawlerData = [...CrawlerData]
      copyCrawlerData[index].loading = true
      this.setState(
        {
          CrawlerData: copyCrawlerData
        },
        async () => {
          console.log('index:', index)
          const { err_code } = await crawlerService.crawlAction(CrawlerData[index].api)
          if (err_code === 0) {
            alert('抓取数据成功')
          } else {
            alert('抓取数据失败')
          }
          copyCrawlerData[index].loading = false
          this.setState({
            CrawlerData: copyCrawlerData
          })
        }
      )

      // const { navigate } = this.props
      // console.log('aaaa:', res)
      // const result = await getDatas(res, navigate)

      // this.setState({
      //   CrawlerData: result.data
      // })
    } catch (error) {
      console.log('getCrawlerData error:', error)
    }
  }
}
