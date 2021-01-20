import { InboxIcon } from "../../../assets/StyleImports";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

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
      name: "Fruits",
      to: "/app/fruits",
      iconFront: <InboxIcon />,
      hasChildren: false,
      isChild: false,
    },
    {
      id: 10,
      name: "Exams",
      to: "/app/quiz",
      iconFront: <InboxIcon />,
      hasChildren: false,
      isChild: false,
    },
  ];
};
