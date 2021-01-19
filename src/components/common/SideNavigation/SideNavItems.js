import React, { useState } from "react";
import SideNavItem from "./SideNavItem";

export function SideNavItems({ navItems, handleDrawerOpen }) {
  const [ids, setIds] = useState({});

  const handleNestedChildren = (id, event) => {
    event.preventDefault();
    setIds({ ...ids, [id]: !ids[id] });
    !ids[id] && handleDrawerOpen();
  };

  return (
    <React.Fragment>
      {navItems.map((navItem) => {
        return (
          <React.Fragment>
            <SideNavItem
              navItem={navItem}
              ids={ids}
              handleNestedChildren={handleNestedChildren}
              spacing={3}
            />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export default React.memo(SideNavItems);
