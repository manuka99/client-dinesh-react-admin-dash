import React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MainDashStyles,
} from "../../../assets/StyleImports";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

function SideNavItem({ navItem, index, ids, handleNestedChildren, ...rest }) {
    const classes = MainDashStyles();
  return (
    <React.Fragment>
      <ListItem
        key={navItem.id}
        component={NavLink}
        to={navItem.to}
        className={rest.nested}
        activeClassName={!ids[navItem.id] && "Mui-selected"}
        {...(navItem.hasChildren ? {
          onClick: (e) => handleNestedChildren(navItem.id, e),
        }: {})}
      >
        <ListItemIcon>{navItem.iconFront}</ListItemIcon>
        <ListItemText primary={navItem.name} />
        {navItem.hasChildren && (ids[navItem.id] ? (
          <ExpandLess />
        ) : (
          <ExpandMore />
        ))}
      </ListItem>
      {navItem.hasChildren && (
        <Collapse in={ids[navItem.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {navItem.children.map((childItem, index2) => {
              return (
                <SideNavItem
                  navItem={childItem}
                  index={index2}
                  ids={ids}
                  handleNestedChildren={handleNestedChildren}
                  nested={classes.nested}
                />
              );
            })}
          </List>
        </Collapse>
      ) }
    </React.Fragment>
  );
}

export default React.memo(SideNavItem);
