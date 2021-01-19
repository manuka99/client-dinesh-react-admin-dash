import React, { useState } from "react";
import SideNavItem from "./SideNavItem";

export function SideNavItems({ navItems, handleDrawerOpen }) {
  const [ids, setIds] = useState({});

  const handleNestedChildren = (id, event = null, hasChildren = false) => {
    if (hasChildren) {
      event.preventDefault();
      setIds({ ...ids, [id]: !ids[id] });
    }
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
              spacing={2.5}
            />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export default React.memo(SideNavItems);
