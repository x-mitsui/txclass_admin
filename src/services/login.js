import HTTP from "utils/http";
import { API } from "config/config";

const LOGIN = API.LOGIN;
export default class LoginService extends HTTP {
  loginAction(userInfo) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: LOGIN.LOGIN_ACTION,
        data: userInfo,
        success: (data) => {
          resolve(data);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }

  loginCheck() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: LOGIN.LOGIN_CHECK,
        success(data) {
          resolve(data);
        },
        error(err) {
          alert("网络请求失败:", err);
          // window.location.reload();
        },
      });
    });
  }

  logoutAction() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.LOGOUT_ACTION,
        success(data) {
          resolve(data);
        },
        error(err) {
          alert("登录信息清除失败:", err);
        },
      });
    });
  }
}
