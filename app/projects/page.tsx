import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";

export const metadata: Metadata = {
  title: "搞项目",
  description:
    "搞项目是搞着玩的后续产品线，从全球产品、开源和社区信号里拆出可执行的小项目灵感。"
};

const projectSignals = [
  {
    title: "产品灵感",
    text: "从 Product Hunt、GitHub Trending、Indie Hackers 里筛选值得复刻、改造或本土化的小产品。"
  },
  {
    title: "可做判断",
    text: "不只说新鲜，而是判断技术门槛、冷启动难度、变现路径和适合的第一版。"
  },
  {
    title: "开搞清单",
    text: "把一个想法拆成首屏功能、数据来源、上线渠道和 7 天验证动作。"
  }
];

export default function ProjectsPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">搞项目 · 下一阶段</p>
        <h1>从全球信号里找能开搞的小项目</h1>
        <p>
          这条线暂不急着做成完整产品。先收集想搞项目的人，再用搞选题积累的全球信号反哺产品灵感库。
        </p>
      </div>

      <div className="value-list topic-positioning">
        {projectSignals.map((signal) => (
          <div className="value-row" key={signal.title}>
            <h3>{signal.title}</h3>
            <p>{signal.text}</p>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">内测名单</p>
            <h2>如果你想搞项目，先留下方向</h2>
            <p>当我们把第一批产品灵感卡整理出来，会优先发给选择“搞项目”的用户。</p>
          </div>
          <SubscribeForm source="projects-page" defaultInterest="搞项目" />
        </div>
      </section>
    </section>
  );
}
