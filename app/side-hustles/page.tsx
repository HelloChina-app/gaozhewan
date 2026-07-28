import type { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";

export const metadata: Metadata = {
  title: "搞副业",
  description:
    "搞副业帮你把全球工具、流量玩法和小生意案例，拆成能小成本验证的副业方案。"
};

const sideHustleSignals = [
  {
    title: "小生意案例",
    text: "观察全球独立开发、AI 工具、内容产品和微型服务，筛出普通人可理解的变现路径。"
  },
  {
    title: "工具组合",
    text: "把一个副业想法拆成获客渠道、交付工具、自动化流程和最低成本验证方式。"
  },
  {
    title: "风险边界",
    text: "不包装暴富故事，优先写清楚投入、周期、合规风险和不适合谁。"
  }
];

export default function SideHustlesPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">实验室 · 自己玩</p>
        <h1>先用最低成本验证一个副业方向</h1>
        <p>
          这里提供免费案例、工具和验证思路，由你自己执行。先证明有人需要，再决定要不要投入更多时间和钱。
        </p>
        <div className="hero-actions">
          <Link className="button" href="/tools">
            先看工具
          </Link>
          <Link className="text-button" href="/lab">
            已有想法，和实验室一起玩
          </Link>
        </div>
      </div>

      <div className="value-list topic-positioning">
        {sideHustleSignals.map((signal) => (
          <div className="value-row" key={signal.title}>
            <h3>{signal.title}</h3>
            <p>{signal.text}</p>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">免费订阅</p>
            <h2>把适合自己验证的方案发给你</h2>
            <p>
              我们会优先发送副业案例拆解、工具组合和低成本验证方法，不出售收入保证。
            </p>
          </div>
          <SubscribeForm source="side-hustles-page" defaultInterest="自己玩 DIY" />
        </div>
      </section>
    </section>
  );
}
