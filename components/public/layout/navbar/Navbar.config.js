// Dynamic Nav Items
export const navs = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About IIFAPS",
    children: [
      {
        id: 21,
        name: "IIFAPS Defined",
        path: "/about-iifaps/iifaps-defined",
      },
      {
        id: 22,
        name: "What We Do",
        path: "/about-iifaps/what-we-do",
      },
      {
        id: 23,
        name: "Mission & Vision",
        path: "/about-iifaps/mission-vision",
      },
      {
        id: 24,
        name: "IIFAPS Team",
        children: [
          {
            id: 241,
            name: "Executive Director",
            path: "/about-iifaps/team/executive-director",
          },
          {
            id: 242,
            name: "Trustee Board",
            path: "/about-iifaps/team/trustee-board",
          },
          {
            id: 243,
            name: "Advisory Board",
            path: "/about-iifaps/team/advisory-board",
          },
          {
            id: 244,
            name: "Distinguished Fellows",
            path: "/about-iifaps/team/distinguished-fellows",
          },
          {
            id: 245,
            name: "Executive Members",
            path: "/about-iifaps/team/executive-members",
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