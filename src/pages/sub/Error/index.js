import React, { Component } from "react";

import "./index.scss";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="error-wrap">
        <div className="inner">
          <h1>404</h1>
          <p>页面未找到</p>
        </div>
      </div>
    );
  }
}
