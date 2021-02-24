import { InboxIcon } from "../../../assets/StyleImports";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import ListIcon from "@material-ui/icons/List";
import CreateIcon from "@material-ui/icons/Create";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import ExtensionIcon from "@material-ui/icons/Extension";
// shipping
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import ClassIcon from "@material-ui/icons/Class";
import RoomIcon from "@material-ui/icons/Room";

export const NavItems1 = () => {
  return [
    {
      id: 1,
      name: "Reports",
      to: "/app/reports",
      iconFront: <InboxIcon />,
      hasChildren: true,
      isChild: false,
      children: [
        {
          id: 2,
          name: "Dashboard",
          to: "/app/reports/dashboard",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 3,
          name: "Statistics",
          to: "/app/reports/statistics",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 4,
          name: "Statistics-data",
          to: "/app/reports/statistics-data",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
      ],
    },
    {
      id: 5,
      name: "Users",
      to: "/app/fruits",
      iconFront: <InboxIcon />,
      hasChildren: true,
      isChild: false,
      children: [
        {
          id: 6,
          name: "Admin",
          to: "/app/fruits/fruit",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 7,
          name: "Member",
          to: "/app/users/member",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
      ],
    },
    {
      id: 8,
      name: "Profile",
      to: "/app/profile",
      iconFront: <AccountBoxIcon />,
      hasChildren: false,
      isChild: false,
    },
    {
      id: 9,
      name: "Products",
      to: "/app/products",
      iconFront: <LocalDiningIcon />,
      hasChildren: true,
      isChild: false,
      children: [
        {
          id: 10,
          name: "All products",
          to: "/app/products/all",
          iconFront: <ListIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 11,
          name: "Add new",
          to: "/app/products/new",
          iconFront: <CreateIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 12,
          name: "Categories",
          to: "/app/products/categories",
          iconFront: <AcUnitIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 13,
          name: "Extras",
          to: "/app/products/extras",
          iconFront: <ExtensionIcon />,
          hasChildren: false,
          isChild: true,
        },
      ],
    },
    {
      id: 14,
      name: "Shipping",
      to: "/app/shipping",
      iconFront: <LocalShippingIcon />,
      hasChildren: true,
      isChild: false,
      children: [
        {
          id: 15,
          name: "Store management",
          to: "/app/shipping/stores",
          iconFront: <StoreMallDirectoryIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 16,
          name: "Delivery classes",
          to: "/app/shipping/classes",
          iconFront: <ClassIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 17,
          name: "Delivery areas",
          to: "/app/shipping/areas",
          iconFront: <RoomIcon />,
          hasChildren: false,
          isChild: true,
        },
      ],
    },
  ];
};
export const NavItems2 = () => {
  return [
    {
      id: 1,
      name: "Reports",
      to: "/data/reports",
      iconFront: <InboxIcon />,
      hasChildren: true,
      isChild: false,
      children: [
        {
          id: 2,
          name: "Dashboard",
          to: "/data/reports/dashboard",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 3,
          name: "Statistics",
          to: "/data/reports/statistics",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 4,
          name: "Statistics-data",
          to: "/data/reports/statistics-data",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
      ],
    },
    {
      id: 5,
      name: "Users",
      to: "/data/fruits",
      iconFront: <InboxIcon />,
      hasChildren: true,
      isChild: false,
      children: [
        {
          id: 6,
          name: "Admin",
          to: "/data/fruits/fruit",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 7,
          name: "Member",
          to: "/data/users/member",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
      ],
    },
    {
      id: 8,
      name: "Profile",
      to: "/data/profile",
      iconFront: <AccountBoxIcon />,
      hasChildren: false,
      isChild: false,
    },
    {
      id: 9,
      name: "Fruits",
      to: "/data/fruits",
      iconFront: <InboxIcon />,
      hasChildren: false,
      isChild: false,
    },
    {
      id: 10,
      name: "Exams",
      to: "/data/quiz",
      iconFront: <InboxIcon />,
      hasChildren: false,
      isChild: false,
    },
  ];
};
