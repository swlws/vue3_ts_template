export default [
  {
    id: "001000000",
    label: "Blog",
  },
  {
    id: "001001000",
    label: "前端",
    pid: "001000000",
  },
  {
    id: "001001001",
    pid: "001001000",
    path: "/blog/fe/vue",
    label: "Vue",
  },
  {
    id: "001002000",
    label: "后台",
    pid: "001000000",
  },
  {
    id: "001002001",
    label: "Java",
    path: "/blog/be/java",
    pid: "001002000",
  },
  {
    id: "002000000",
    label: "技术",
  },
  {
    id: "002001000",
    label: "计算机",
    pid: "002000000",
  },
  {
    id: "002001001",
    label: "软件",
    path: "/tec/com/sw",
    pid: "002001000",
  },
  {
    id: "002001002",
    label: "硬件",
    path: "/tec/com/hw",
    pid: "002001000",
  },
];
