import { MenuItem } from "@material-ui/core";
import React from "react";

const CategoryMenuItem = (category, spacing) => {
  return [
    <MenuItem
      key={category.id}
      style={{ paddingLeft: `${spacing}px` }}
      value={category.id}
    >
      {category.name}
    </MenuItem>,
    category.children &&
      category.children.map((x) => CategoryMenuItem(x, spacing + 14)),
  ];
};

export default CategoryMenuItem;
