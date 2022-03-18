import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import LoginService from "services/login";
import CourseService from "services/course";
import { withNavigation } from "components/Wrapper";

import Header from "components/Index/Header";
import SideBar from "components/Index/SideBar";
import Container from "components/Index/Container";

import { NAV } from "config/config";

const loginService = new LoginService();
const courseService = new CourseService();

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curIdx: 0,
      field: NAV[0].field,
      title: NAV[0].title,
    };
  }

  componentDidMount() {
    // 异步执行，一旦验证失败就跳转回login页面
    this.loginCheck();
    this.getCourseData();
  }

  render() {
    const { curIdx } = this.state;

    return (
      <div className="container">
        <Header />
        <SideBar curIdx={curIdx} onNavItemClick={this.onNavItemClick.bind(this)} />
        <Container>
          {/* 传递Outlet，再用props获取children */}
          <Outlet />
        </Container>
      </div>
    );
  }

  async loginCheck() {
    const result = await loginService.loginCheck();

    const errorCode = result.err_code,
      { navigate } = this.props;

    if (errorCode === 10006) {
      navigate("/login");
      return;
    }
    navigate("/course");
  }

  onNavItemClick({ field, title }, index) {
    this.setState({
      field,
      title,
      curIdx: index,
    });
  }

  async getCourseData() {
    try {
      const res = await courseService.getCourses();
      const errorCode = res.err_code;
      if (errorCode === 10006) {
        const { navigate } = this.props;
        navigate("/login");
        return;
      }
      if (errorCode === 20001) {
        alert("获取数据失败");
        return;
      }
      console.log(res.data);
    } catch (error) {
      console.log("getCourseData error:", error);
    }
  }
}

export default withNavigation(IndexPage);
