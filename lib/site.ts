export const site = {
  name: "搞着玩",
  domain: "gaozhewan.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gaozhewan.com",
  title: "搞着玩 · 把全球信号变成你的选题",
  description:
    "每天从 Hacker News、GitHub 等全球信号里挑出值得写的选题，附写作角度、标题模板和工具实测，帮中文创作者更快从「发现」到「开写」。",
  slogan: "搞着玩，先从全球信号开始",
  email: "hello@gaozhewan.com"
};

export const navItems = [
  { href: "/", label: "首页" },
  { href: "/post", label: "搞选题" },
  { href: "/tools", label: "搞工具" },
  { href: "/projects", label: "搞项目" },
  { href: "/side-hustles", label: "搞副业" },
  { href: "/pricing", label: "搞选题 Pro" },
  { href: "/subscribe", label: "订阅" }
];

