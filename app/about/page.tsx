import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: "搞着玩的品牌定位、内容原则和联系信息。"
};

const principles = [
  {
    title: "买家优先",
    text: "产品为付费创作者设计，免费读者是流量池。"
  },
  {
    title: "快过全",
    text: "24-48 小时内捕捉全球互联网热议，比写得全更重要。"
  },
  {
    title: "可改写",
    text: "每条付费内容必须能直接变成账号稿件。"
  },
  {
    title: "轻松包装",
    text: "品牌可以好玩，但付费理由必须严肃：省时间、赚流量。"
  }
];

export default function AboutPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">关于搞着玩</p>
        <h1>全球新奇信号，搞着玩</h1>
        <p>{site.description}</p>
      </div>

      <div className="value-list">
        {principles.map((principle) => (
          <div className="value-row" key={principle.title}>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </div>
        ))}
        <div className="value-row">
          <h3>联系</h3>
          <p>
            商务合作、工具推荐、早鸟用户反馈：{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

