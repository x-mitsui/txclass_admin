import React, { Component } from "react";
import Title from "./Title";
import LoginForm from "./LoginForm";
import "./index.scss";

export default class Form extends Component {
  render() {
    return (
      <div className="form-wrapper">
        <Title />
        <LoginForm />
      </div>
    );
  }
}
