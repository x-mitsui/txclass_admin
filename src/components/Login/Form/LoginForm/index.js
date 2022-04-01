import { Component } from 'react'

import LoginService from 'services/login'
import { trimSpace } from 'utils/tools'
import { withNavigation } from 'components/Wrapper'
import './index.scss'

const loginService = new LoginService()

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.loginCheck()
  }

  render() {
    return (
      <div className="login-form-wrapper">
        <div className="input-wrapper name-input">
          <label htmlFor="username" className="iconfont icon-user"></label>
          <input
            id="username"
            className="info-input"
            type="text"
            placeholder="管理员用户名"
            onChange={(e) => this.onInputTyping(e)}
          />
        </div>
        <div className="input-wrapper password-input">
          <label htmlFor="password" className="iconfont icon-lock"></label>
          <input
            id="password"
            className="info-input"
            type="password"
            placeholder="管理员密码"
            onChange={(e) => this.onInputTyping(e)}
            onKeyUp={(e) => {
              this.onKeyUp(e)
            }}
          />
        </div>
        <div className="input-wrapper check">
          <button
            className="boot-btn btn-primary"
            onClick={() => {
              this.onLoginSubmit()
            }}
          >
            登录后台
          </button>
        </div>
      </div>
    )
  }

  async loginCheck() {
    const result = await loginService.loginCheck()

    const errorCode = result.err_code

    // 登录页验证是否处于登录状态
    if (errorCode === 10007) {
      const { navigate } = this.props
      navigate('/')
    }
  }

  onInputTyping(e) {
    const target = e.target
    const id = target.id
    // if (id === "username") {
    //   this.setState({
    //     username: target.value,
    //   });
    // } else {
    //   this.setState({
    //     password: target.value,
    //   });
    // }

    this.setState(
      {
        [id]: target.value
      },
      () => {
        // console.log("username:" + this.state.username);
        // console.log("password:" + this.state.password);
      }
    )
  }

  async onLoginSubmit() {
    const { username, password } = this.state
    if (trimSpace(username) <= 0) {
      alert('用户名长度不正确！')
      return
    }
    if (trimSpace(password) <= 0) {
      alert('密码长度不正确！')
      return
    }

    try {
      const result = await loginService.loginAction({
        username: trimSpace(username),
        password: trimSpace(password)
      })
      if (result.err_code !== 0) {
        alert(`[${result.err_code}]:${result.err_msg}`)
        return
      }
      alert('登陆成功')
      const { navigate } = this.props
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }
  async onKeyUp(e) {
    if (e.keyCode === 13) {
      await this.onLoginSubmit()
    }
  }
}

export default withNavigation(LoginForm)
