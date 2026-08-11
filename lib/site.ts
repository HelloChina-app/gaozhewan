export const site = {
  name: "搞着玩",
  domain: "gaozhewan.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gaozhewan.com",
  title: "搞着玩 · 免费信号、公开实验与创意共建",
  description:
    "免费整理全球新奇信号、AI 工具和具身智能 DIY；也在搞着玩实验室接收真实创意，用固定范围服务帮用户做出第一版。",
  slogan: "先免费搞明白，再一起把东西做出来",
  email: "hello@gaozhewan.com"
};

export const navItems = [
  { href: "/", label: "首页" },
  { href: "/post", label: "搞选题" },
  { href: "/tools", label: "搞工具" },
  { href: "/lab", label: "实验室" },
  { href: "/pricing", label: "服务与定价" },
  { href: "/subscribe", label: "订阅" }
];

