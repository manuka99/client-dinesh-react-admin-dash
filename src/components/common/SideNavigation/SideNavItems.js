import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MainDashStyles } from "../../../assets/StyleImports";
import Collapse from "@material-ui/core/Collapse";
import SideNavItem from "./SideNavItem";

export function SideNavItems({ navItems }) {
  const [ids, setIds] = useState({});

  const handleNestedChildren = (id, event) => {
    event.preventDefault();
    setIds({ ...ids, [id]: !ids[id] });
  };

  return (
    <React.Fragment>
      {navItems.map((navItem, index) => {
        return (
          <React.Fragment>
            <SideNavItem
              navItem={navItem}
              index={index}
              ids={ids}
              handleNestedChildren={handleNestedChildren}
            />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export default SideNavItems;
