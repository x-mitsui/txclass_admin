import React, { Component } from "react";

import Board from "./Board";
import "./index.scss";
export default class Container extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="content-container">
        <Board children={children} />
      </div>
    );
  }
}
