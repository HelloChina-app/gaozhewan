export const site = {
  name: "搞着玩",
  domain: "gaozhewan.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gaozhewan.com",
  title: "搞着玩 - 你想搞什么？",
  description:
    "帮中文用户把全球新奇事物，变成可以立刻开搞的选题、工具、项目和副业灵感。",
  slogan: "你想搞什么？先从全球信号开始",
  email: "hello@gaozhewan.com"
};

export const navItems = [
  { href: "/", label: "你想搞什么" },
  { href: "/post", label: "搞选题" },
  { href: "/tools", label: "搞工具" },
  { href: "/projects", label: "搞项目" },
  { href: "/side-hustles", label: "搞副业" },
  { href: "/pricing", label: "搞选题 Pro" },
  { href: "/subscribe", label: "订阅" }
];

