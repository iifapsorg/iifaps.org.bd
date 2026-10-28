// Dynamic Nav Items
export const navs = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About CAPS",
    children: [
      {
        id: 21,
        name: "CAPS Defined",
        path: "/about/caps-defined",
      },
      {
        id: 22,
        name: "What We Do",
        path: "/about/what-we-do",
      },
      {
        id: 23,
        name: "Mission & Vision",
        path: "/about/mission-vision",
      },
      {
        id: 24,
        name: "CAPS Team",
        children: [
          {
            id: 241,
            name: "Executive Director",
            path: "/about/team/executive-director",
          },
          {
            id: 242,
            name: "Trustee Board",
            path: "/about/team/trustee-board",
          },
          {
            id: 243,
            name: "Advisory Board",
            path: "/about/team/advisory-board",
          },
          {
            id: 244,
            name: "Distinguished Fellows",
            path: "/about/team/distinguished-fellows",
          },
          {
            id: 245,
            name: "Executive Members",
            path: "/about/team/executive-members",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Blogs",
    path: "/blogs",
  },
  {
    id: 4,
    name: "Categories",
    path: "/categories",
  },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  },
];