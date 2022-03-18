import React, { Component } from "react";
import Login from "components/Login";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="container">
        <Login />;
      </div>
    );
  }
}

export default LoginPage;
