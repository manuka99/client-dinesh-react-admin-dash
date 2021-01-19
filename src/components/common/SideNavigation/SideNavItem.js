import React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "../../../assets/StyleImports";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { createStyles, makeStyles } from "@material-ui/core/styles";

function SideNavItem({ navItem, ids, handleNestedChildren, spacing, ...rest }) {
  console.log("nav item rendered");

  const styles = makeStyles((theme) =>
    createStyles({
      nested: {
        paddingLeft: theme.spacing(spacing),
      },
    })
  );

  const classes = styles();

  return (
    <React.Fragment>
      <ListItem
        button
        key={navItem.id}
        component={NavLink}
        to={navItem.to}
        className={classes.nested}
        activeClassName={!ids[navItem.id] && "Mui-selected"}
        // {...(navItem.hasChildren
        //   ? {
        //       onClick: (e) => handleNestedChildren(navItem.id, e),
        //     }
        //   : {})}
        onClick={(e) => handleNestedChildren(navItem.id, e, navItem.hasChildren)}
      >
        <ListItemIcon>{navItem.iconFront}</ListItemIcon>
        <ListItemText primary={navItem.name} />
        {navItem.hasChildren &&
          (ids[navItem.id] ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {navItem.hasChildren && (
        <Collapse in={ids[navItem.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {navItem.children.map((childItem) => {
              return (
                <SideNavItem
                  navItem={childItem}
                  ids={ids}
                  handleNestedChildren={handleNestedChildren}
                  spacing={spacing + 2}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );
}

export default React.memo(SideNavItem);
