import React, { Component } from "react";

import LoginService from "../../../../services/login";
import { withNavigation } from "components/Wrapper";
import "./index.scss";

const loginService = new LoginService();
class HeaderLogout extends Component {
  render() {
    return (
      <span className="header-logout" onClick={(e) => this.onLogoutClick()}>
        安全退出
      </span>
    );
  }
  async onLogoutClick() {
    const cfm = window.confirm("确认退出登录么？");
    if (cfm) {
      const result = await loginService.logoutAction();
      const errorCode = result.err_code;
      if (errorCode === 0) {
        alert("退出");
        const { navigate } = this.props;
        navigate("/login");
      }
    }
  }
}

export default withNavigation(HeaderLogout);
