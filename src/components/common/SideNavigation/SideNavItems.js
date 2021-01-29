import React, { useState, useEffect } from "react";
import SideNavItem from "./SideNavItem";

export function SideNavItems({ navItems, handleDrawerOpen, drawerOpenStatus }) {
  const [ids, setIds] = useState({});

  useEffect(() => {
    !drawerOpenStatus && setIds({});
  }, [drawerOpenStatus]);

  const handleNestedChildren = (id, event = null, hasChildren = false) => {
    if (hasChildren) {
      event.preventDefault();
      setIds({ ...ids, [id]: !ids[id] });
      // setIds({[id]: !ids[id] });
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
