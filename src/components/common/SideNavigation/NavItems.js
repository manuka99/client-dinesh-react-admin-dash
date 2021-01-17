import { InboxIcon } from "../../../assets/StyleImports";

export const NavItems1 = () => {
  return [
    {
      id: 1,
      name: "Reports",
      to: "/app/reports",
      iconFront: <InboxIcon />,
      hasChildren: true,
      children: [
        {
          id: 2,
          name: "Dashboard",
          to: "/app/reports/dashboard",
          iconFront: <InboxIcon />,
          hasChildren: false,
        },
        {
          id: 3,
          name: "Statistics",
          to: "/app/reports/statistics",
          iconFront: <InboxIcon />,
          hasChildren: false,
        },
        {
          id: 4,
          name: "Statistics-data",
          to: "/app/reports/statistics-data",
          iconFront: <InboxIcon />,
          hasChildren: false,
        },
      ],
    },
    {
      id: 5,
      name: "Users",
      to: "/app/fruits",
      iconFront: <InboxIcon />,
      hasChildren: true,
      children: [
        {
          id: 6,
          name: "Admin",
          to: "/app/fruits/fruit",
          iconFront: <InboxIcon />,
          hasChildren: false,
        },
        {
          id: 7,
          name: "Member",
          to: "/app/users/member",
          iconFront: <InboxIcon />,
          hasChildren: false,
        },
      ],
    },
    {
      id: 8,
      name: "Support",
      to: "/app/support",
      iconFront: <InboxIcon />,
      hasChildren: false,
    },
    {
      id: 9,
      name: "Fruits",
      to: "/app/fruits",
      iconFront: <InboxIcon />,
      hasChildren: false,
    },
    {
      id: 10,
      name: "Exams",
      to: "/app/quiz",
      iconFront: <InboxIcon />,
      hasChildren: false,
    },
  ];
};
