import React, { Component } from "react";

import NavItem from "./NavItem";
import { NAV } from "config/config";
import "./index.scss";
export default class SideBar extends Component {
  render() {
    const { curIdx, onNavItemClick } = this.props;
    return (
      <aside className="side-bar">
        {NAV.map((item, index) => (
          <NavItem
            dataItem={item}
            index={index}
            key={index}
            curIdx={curIdx}
            onNavItemClick={onNavItemClick}
          />
        ))}
      </aside>
    );
  }
}
